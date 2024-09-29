import React, { useEffect, useState } from "react";
import supabase from "../supabase/supabase";

const Shortlistresumes = ({ token, jobId }) => {
  const [rankedResumes, setRankedResumes] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [userScores, setUserScores] = useState([]);
  const [skills, setSkills] = useState([]);

  const handleDateChange = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);
  
    try {
      // Check if test_end_date is already set for this job_id in the jobs table
      const { data: job, error: fetchError } = await supabase
        .from('jobs')
        .select('test_end_date')
        .eq('id', jobId) // Use 'id' if that is the primary key
        .single();
  
      if (fetchError) {
        console.error("Error fetching job:", fetchError.message);
        alert("Error fetching job!");
        return;
      }
  
      if (job.test_end_date) {
        alert("End date for this job test already exists!");
        return;
      }
  
      const { error } = await supabase
        .from('jobs')
        .update({ test_end_date: date })
        .eq('id', jobId); 
  
      if (error) {
        alert("Error updating end date for this job test!");
        return;
      }
  
      alert(`End date for this job test is ${date}`);
    } catch (error) {
      console.error("Error updating job:", error.message);
    }
  };
  
  
  
  const fetchUserScoreByJobId = async () => {
    try {
      const { data: userScores, error: scoresError } = await supabase
        .from("job_applications")
        .select("*")
        .eq("job_id", jobId)
        .eq("test_attempted", true);

      if (scoresError) {
        console.error("Error fetching user scores:", scoresError.message);
        return [];
      }

      if (userScores.length === 0) {
        alert("No candidates have taken the test yet");
        return;
      }

      userScores.sort((a, b) => b.test_score - a.test_score);

      const highestScoreUser = userScores[0];

      if (!highestScoreUser) {
        console.error("No user with the highest score found");
        return [];
      }

      const { data: user, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", highestScoreUser.user_id)
        .single();

      if (userError) {
        console.error("Error fetching user:", userError.message);
        return [];
      }

      const combinedData = {
        user_id: highestScoreUser.user_id,
        job_id: highestScoreUser.job_id,
        score: highestScoreUser.test_score,
        user_name: user.fullname,
        user_email: user.email,
      };

      setUserScores([combinedData]);
      return [combinedData];
    } catch (error) {
      console.error("Error fetching user scores:", error.message);
      return [];
    }
  };

  const handleDownloadAndShortlist = async () => {
    alert("shortlisting candidates....");
    try {
      const downloadResponse = await fetch(
        `http://localhost:3000/download/${jobId}`,
        {
          method: "GET",
        }
      );

      if (!downloadResponse.ok) {
        throw new Error(
          `HTTP error during file download! Status: ${downloadResponse.status}`
        );
      }

      console.log("Files downloaded and saved successfully.");

      const shortlistResponse = await fetch("http://localhost:3000/rank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          requiredSkills: skills.split(",").map((skill) => skill.trim()), // Split skills string into an array
        }),
      });

      if (!shortlistResponse.ok) {
        throw new Error(
          `HTTP error during shortlisting! Status: ${shortlistResponse.status}`
        );
      }

      const shortlistData = await shortlistResponse.json();
      if (!shortlistData) {
        throw new Error("Empty response from shortlisting!");
      }

      setRankedResumes(shortlistData.rankedResumes);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendTestLink = async (user_id) => {
    console.log(user_id, jobId);
    alert("Sending test link");
    try {
      const response = await fetch(
        `http://localhost:3000/mail/${user_id}/${jobId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        alert(`HTTP error! status: ${response.status}`);
      }
      alert("Test link sent successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendOfferLetter = async (user_id) => {
    addSelectedCandidates(user_id);
    alert("Sending offer letter");
    try {
      const response = await fetch(
        `http://localhost:3000/offer/${user_id}/${jobId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        alert(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addSelectedCandidates = async (user_id) => {
    try {
      const { data, error } = await supabase
        .from("job_applications")
        .update({ selected: true })
        .eq("job_id", jobId)
        .eq("user_id", user_id);

      if (error) throw error;

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getSkills = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("skills")
        .eq("id", jobId)
        .single();
      if (error) throw error;
      setSkills(data.skills);
      console.log(skills.split(",").map((skill) => skill.trim()));
    } catch (error) {
      console.error("Error fetching job skills:", error.message);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <button
          onClick={handleDownloadAndShortlist}
          className="m-2 mt-10 inline-flex items-center justify-center rounded-xl border border-transparent bg-purple-900 px-5 py-3 font-medium text-white hover:bg-purple-800"
        >
          Shortlist Resume
        </button>
        <button
          onClick={fetchUserScoreByJobId}
          className="m-2 mt-10 inline-flex items-center justify-center rounded-xl border-2 border-purple-900 transition  bg-white px-5 py-3 font-medium text-purple-900 hover:bg-purple-900 hover:text-white"
        >
          Get Test Score
        </button>
      </div>

      <div className="w-screen">
        <div className="mx-auto mt-8 max-w-screen-lg px-2">
          <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row"></div>

          {rankedResumes.length > 0 && (
            <div>
              <div className="flex justify-center mt-10">
                <div className="w-full max-w-xs">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select an End Date for Test
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <p className="flex-1 text-base font-bold text-gray-900">
                Shortlisted Candidates
              </p>
              <div className="mt-6 overflow-hidden rounded-xl border shadow">
                <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
                  <thead className="border-b lg:table-header-group">
                    <tr>
                      <td
                        width="50%"
                        className="whitespace-normal py-4 text-sm font-medium  text-gray-500 sm:px-6"
                      >
                        Name
                      </td>
                      <td className="whitespace-normal py-4 text-sm font-medium  text-gray-500 sm:px-6">
                        Email
                      </td>
                      <td className="whitespace-normal py-4 text-sm font-medium  text-gray-500 sm:px-6">
                        JobId
                      </td>
                      <td className="whitespace-normal py-4 text-sm font-medium  text-gray-500 sm:px-6">
                        Score
                      </td>
                      <td className="whitespace-normal py-4 text-sm font-medium  text-gray-500 sm:px-6">
                        Test Link
                      </td>
                    </tr>
                  </thead>
                  <tbody className="lg:border-gray-300">
                    {rankedResumes
                      .filter((resume) => resume.normalizedScore > 0)
                      .map((resume) => (
                        <tr key={resume.email}>
                          <td
                            width="50%"
                            className="whitespace-no-wrap py-4 text-sm  text-gray-900 sm:px-6"
                          >
                            {resume.fullname}
                          </td>
                          <td className="whitespace-no-wrap py-4 text-sm  text-gray-900 sm:px-6">
                            {resume.email}
                          </td>
                          <td className="whitespace-no-wrap py-4 text-sm  text-gray-900 sm:px-6">
                            {jobId}
                          </td>
                          <td className="whitespace-no-wrap py-4 text-sm  text-gray-900 sm:px-6">
                            {resume.normalizedScore}
                          </td>
                          <td className="whitespace-no-wrap py-4 text-sm  text-gray-900 sm:px-6">
                            <button
                              onClick={() => sendTestLink(resume.user_id)}
                              className="inline-flex items-center rounded-full bg-purple-800 py-2 px-3 text-xs text-white"
                            >
                              Send 
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {userScores.length > 0 && (
            <div>
              <div>
                <div>
                  <h1 className="text-md font-semibold mt-4">
                    Candidate with highest score
                  </h1>
                </div>
                <div className="mt-6 overflow-hidden rounded-xl border shadow">
                  <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
                    <thead className="border-b lg:table-header-group">
                      <tr>
                        <td
                          width="50%"
                          className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
                        >
                          Name
                        </td>
                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                          Email
                        </td>
                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                          JobId
                        </td>
                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                          Score
                        </td>
                        <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                          Offer Letter
                        </td>
                      </tr>
                    </thead>
                    <tbody className="lg:border-gray-300">
                      {userScores.map((score) => (
                        <tr key={score.user_email}>
                          <td
                            width="50%"
                            className="whitespace-no-wrap py-4 text-sm  text-gray-900 sm:px-6"
                          >
                            {score.user_name}
                          </td>
                          <td className="whitespace-no-wrap py-4 text-sm  text-gray-900 sm:px-6">
                            {score.user_email}
                          </td>
                          <td className="whitespace-no-wrap py-4 text-sm  text-gray-900 sm:px-6">
                            {score.job_id}
                          </td>
                          <td className="whitespace-no-wrap py-4 text-sm  text-gray-900 sm:px-6">
                            {score.score}
                          </td>
                          <td className="whitespace-no-wrap py-4 text-sm  text-gray-900 sm:px-6">
                            <button
                              onClick={() => sendOfferLetter(score.user_id)}
                              className="inline-flex items-center rounded-full bg-purple-800 py-2 px-3 text-xs text-white"
                            >
                              Send
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shortlistresumes;
