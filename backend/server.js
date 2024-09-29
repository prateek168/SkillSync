const express = require("express");
const app = express();
const port = 3000;
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
const nodemailer = require("nodemailer");
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("SUPABASE_URL and SUPABASE_KEY are required.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function downloadFilesAndCreateFolder(jobId) {
  try {
    const folderPath = path.join(__dirname, jobId);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    const { data, error } = await supabase.storage
      .from("resumes")
      .list(`resumes/${jobId}`);

    if (error) {
      throw error;
    }

    for (const file of data) {
      const { data: fileData, error: fileError } = await supabase.storage
        .from("resumes")
        .download(`/resumes/${jobId}/${file.name}`);

      if (fileError) {
        throw fileError;
      }

      const buffer = Buffer.from(await fileData.arrayBuffer());
      fs.writeFileSync(path.join(folderPath, file.name), buffer);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function extractTextFromPdf(pdfFile) {
  const dataBuffer = fs.readFileSync(pdfFile);
  const pdfText = await pdf(dataBuffer);
  return pdfText.text;
}

function extractSkillsFromText(text, requiredSkills) {
  const textLower = text.toLowerCase();
  return requiredSkills.filter((skill) => textLower.includes(skill.toLowerCase()));
}

function calculateScore(resumeText, requiredSkills) {
  const resumeSkills = extractSkillsFromText(resumeText, requiredSkills);
  return resumeSkills.length;
}

async function rankResumes(resumes, requiredSkills) {
  const rankedResumes = [];
  let maxScore = 0;

  for (const resume of resumes) {
    const resumeText = await extractTextFromPdf(resume);
    const score = calculateScore(resumeText, requiredSkills);
    maxScore = Math.max(maxScore, score);
  }

  for (const resume of resumes) {
    const resumeText = await extractTextFromPdf(resume);
    const score = calculateScore(resumeText, requiredSkills);
    const normalizedScore = maxScore > 0 ? score / maxScore : 0;
    rankedResumes.push({ resume, normalizedScore });
  }

  rankedResumes.sort((a, b) => b.normalizedScore - a.normalizedScore);
  return rankedResumes;
}

function listPdfFiles(directory) {
  return fs
    .readdirSync(directory)
    .filter((filename) => filename.endsWith(".pdf"))
    .map((filename) => path.join(directory, filename));
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/download/:jobId", async (req, res) => {
  const { jobId } = req.params;
  try {
    await downloadFilesAndCreateFolder(jobId);
    res.status(200).send("Files downloaded and saved successfully.");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("An error occurred while downloading files.");
  }
});

app.post("/rank", async (req, res) => {
  try {
    const { jobId, requiredSkills } = req.body;
    const resumesDirectory = `./${jobId}`;
    const resumes = listPdfFiles(resumesDirectory);

    const rankedResumes = await rankResumes(resumes, requiredSkills);

    for (let i = 0; i < rankedResumes.length; i++) {
      const userId = rankedResumes[i].resume.match(/(\w+-\w+-\w+-\w+-\w+)/)[0];

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("email, fullname")
        .eq("id", userId)
        .single();

      if (userError) {
        throw userError;
      }

      rankedResumes[i].email = userData.email;
      rankedResumes[i].fullname = userData.fullname;
      rankedResumes[i].user_id = userId;
    }

    res.status(200).json({ rankedResumes });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

app.get("/mail/:id/:jobId", async (req, res) => {
  const { id, jobId } = req.params;
  const testLink = `http://localhost:5173/python?id=${id}&jobId=${jobId}`;

  // Fetch job data including the test_end_date
  const { data: jobData, error: jobError } = await supabase
    .from("jobs")
    .select("designation, company_name, test_end_date")
    .eq("id", jobId)
    .single();

  if (jobError) {
    console.error("Error:", jobError);
    return res.status(500).send("Failed to fetch job data");
  }

  // Fetch user data
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("email, fullname")
    .eq("id", id)
    .single();

  if (userError) {
    console.error("Error:", userError);
    return res.status(500).send("Failed to fetch user data");
  }

  // Format the test_end_date
  const endDate = new Date(jobData.test_end_date).toLocaleDateString();

  const mailOptions = {
    from: "chinmaysankolekar@gmail.com",
    to: userData.email,
    subject: `Invitation for Job Test - Role: ${jobData.designation}`,
    text: `Dear ${userData.fullname},\n\nWe are pleased to invite you to take the job test for the role ${jobData.designation} as part of our hiring process.\n\nYou can access the test using the following link: ${testLink}\n\nPlease note that the test must be completed by ${endDate}.\n\nThank you for your interest in joining our team. We look forward to your participation.\n\nPlease note the following instructions:\n- Once submitted, your answers cannot be changed.\n- If you reload the page during the test, you will be disqualified.\n- Changing tabs during the test will result in disqualification.\n- After completing the test, your scores will be calculated, and you will be notified via email regarding your selection status.\n\nBest regards,\n${jobData.company_name}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error occurs for text email", err);
      res.status(500).send("Failed to send test email");
    } else {
      console.log("Text Email sent!!!");
      res.status(200).send("Test email sent successfully");
    }
  });
});


app.get("/offer/:id/:jobId", async (req, res) => {
  const { id, jobId } = req.params;

  const { data: jobData, error: jobError } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", jobId)
    .single();

  if (jobError) {
    console.error("Error:", jobError);
    return res.status(500).send("Failed to fetch job data");
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("email, fullname")
    .eq("id", id)
    .single();

  if (userError) {
    console.error("Error:", userError);
    return res.status(500).send("Failed to fetch user data");
  }

  const offerLetterMailOptions = {
    from: "chinmaysankolekar@gmail.com",
    to: userData.email,
    subject: `Job Offer - Role: ${jobData.designation}`,
    text: `Dear ${userData.fullname},\n\nCongratulations!\n\nWe are delighted to offer you the position of ${jobData.designation} at ${jobData.company_name}. Your skills and experience are a great match for our team.\n\nWe look forward to welcoming you to our company. Please let us know your acceptance of this offer by replying to us.\n\nThank you for your interest in joining our team. If you have any questions, please do not hesitate to reach out.\n\nBest regards,\n${jobData.company_name}`,
  };

  transporter.sendMail(offerLetterMailOptions, (err, info) => {
    if (err) {
      console.log("Error occurs for offer letter email", err);
      res.status(500).send("Failed to send offer letter email");
    } else {
      console.log("Offer Letter Email sent!!!");
      res.status(200).send("Offer letter email sent successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
