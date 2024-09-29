import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase/supabase";
import Navbar from "../layouts/Navbar";

const ApplyJobs = ({ token }) => {
  const [jobs, setJobs] = useState([]);
  const { id } = useParams();

  const getJobswithId = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id);
      if (error) throw error;
      setJobs(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const applyJob = async (resumeFile) => {
    try {
      const { data: existingApplications, error: existingError } =
        await supabase
          .from("job_applications")
          .select("*")
          .eq("job_id", id)
          .eq("user_id", token.user.id);
      if (existingError) throw existingError;

      if (existingApplications.length > 0) {
        alert("You have already applied for this job.");
        window.location.reload();
        return;
      }

      const { data: fileData, error: fileError } = await supabase.storage
        .from("resumes")
        .upload(
          `/resumes/${id}/${token.user.id}-${id}-${resumeFile.name}`,
          resumeFile
        );

      const { data, error } = await supabase.from("job_applications").insert([
        {
          job_id: id,
          user_id: token.user.id,
        },
      ]);
      if (error) throw error;

      alert("Applied");
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getJobswithId();
  }, []);

  return (
    <>
      <Navbar token={token} />

      {jobs.map((job) => (
        <div class="min-h-screen w-screen ">
          <div class="w-screen bg-white pt-20">
            <div class="px-10 md:max-w-screen-md mx-auto">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-semibold leading-7 text-gray-900">
                  Job Information
                </h3>
                <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  job details and requirements.
                </p>
              </div>
              <div class="mt-6 border-t border-gray-100">
                <dl class="divide-y divide-gray-100">
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">
                      Company name
                    </dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {job.company_name}
                    </dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">
                      Role
                    </dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {job.designation}
                    </dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">
                      Skills
                    </dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {job.skills}
                    </dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">
                      Experience
                    </dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {job.experience} years
                    </dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">
                      Location
                    </dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {job.location}
                    </dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">
                      Salary expectation
                    </dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {job.salary}
                    </dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">
                      Job Description
                    </dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {job.description}
                    </dd>
                  </div>
                  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">
                      Apply
                    </dt>
                    <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <div class="mt-4">
                        <label
                          htmlFor="resume-upload"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Upload Your Resume
                        </label>
                        <input
                          id="resume-upload"
                          type="file"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          onChange={(e) => applyJob(e.target.files[0])}
                        />
                        <p className="mt-2 text-sm text-gray-500">
                          <span className="font-semibold">Note:</span>
                          By uploading your resume, you are applying for the
                          job.
                        </p>
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ApplyJobs;
