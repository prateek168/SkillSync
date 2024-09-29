import { useState, useEffect } from "react";
import supabase from "../supabase/supabase";
import { useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";

const JobsAppliedByCandidates = ({ token }) => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const getUserApplications = async () => {
    try {
      const { data, error } = await supabase
        .from("job_applications")
        .select("job_id")
        .eq("user_id", token.user.id);

      if (error) throw error;

      const jobIds = data.map((application) => application.job_id);
      return jobIds;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

  const getJobDetails = async (jobIds) => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .in("id", jobIds);

      if (error) throw error;

      return data;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

  const getJobs = async () => {
    try {
      const jobIds = await getUserApplications();

      if (jobIds.length === 0) {
        alert("You have not applied for any jobs yet.");
        navigate("/userdashboard");
        return;
      }

      const jobDetails = await getJobDetails(jobIds);

      setJobs(jobDetails);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <>
      <Navbar token={token} />
      <div className="container mx-auto px-4">
        <div className="mt-6">
          {jobs.length === 0 ? (
            <div className="mt-6 bg-white border border-gray-300 rounded-xl p-4 text-center">
              <p className="text-md font-bold text-gray-500">
                You have not applied for any jobs yet.
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-md font-bold">Jobs You Have Applied For</h1>
              <div className="mt-6 overflow-hidden rounded-xl border shadow">
                <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
                  <thead className="border-b lg:table-header-group">
                    <tr>
                      <td
                        width="50%"
                        className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
                      >
                        Job Title
                      </td>
                      <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                        Company
                      </td>
                      <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                        Location
                      </td>
                      <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                        Status
                      </td>
                    </tr>
                  </thead>
                  <tbody className="lg:border-gray-300">
                    {jobs.map((job) => (
                      <tr key={job.id}>
                        <td
                          width="50%"
                          className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6"
                        >
                          {job.designation}
                          <div className="mt-1 lg:hidden">
                            <p className="font-normal text-gray-500">
                              {job.company_name}
                            </p>
                          </div>
                        </td>
                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                          {job.company_name}
                        </td>
                        <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                          {job.location}
                          <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-blue-600 py-2 px-3 text-left text-xs font-medium text-white lg:hidden">
                            {job.location}
                          </div>
                        </td>
                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                          <div className="inline-flex items-center rounded-full bg-purple-800 py-2 px-3 text-xs text-white">
                            Applied
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default JobsAppliedByCandidates;
