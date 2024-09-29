import supabase from "../supabase/supabase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShortlistCandidates from "./ShortlistCandidates";
import Navbar from "../layouts/Navbar";

const AppliedCandidates = ({ token }) => {
  let { id } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);

  const getCandidates = async () => {
    try {
      const { data: applications, error: applicationsError } = await supabase
        .from("job_applications")
        .select("user_id")
        .eq("job_id", id);

      if (applicationsError) throw applicationsError;

      const userIds = applications.map((app) => app.user_id);
      const { data: usersData, error: usersError } = await supabase
        .from("users")
        .select("id, fullname, email")
        .in("id", userIds);

      if (usersError) throw usersError;

      const candidates = usersData.map((user) => ({
        id: user.id,
        name: user.fullname,
        email: user.email,
      }));
      setCandidates(candidates);
    } catch (error) {
      alert(error.message);
    }
  };

  const getJobDetails = async () => {
    try {
      const { data: job, error: jobError } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();

      if (jobError) throw jobError;
      console.log(job);
     setJobs(job);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCandidates();
    getJobDetails();
  }, []);

  return (
    <>
     <Navbar token={token} />

     <div class="min-h-screen w-screen">
  <div class="w-screen bg-white pt-20">
    <div class="px-10 md:max-w-screen-md mx-auto">
      <div class="px-4 sm:px-0">
        <h3 class="text-lg font-semibold leading-7 text-gray-900">Job Information</h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Job details and requirements.</p>
      </div>
      <div class="mt-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Company name</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobs.company_name}</dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Role</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobs.designation}</dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Skills</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobs.skills}</dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Experience</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobs.experience} years</dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Location</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobs.location}</dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Salary expectation</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{jobs.salary}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>

  <div class="w-screen mt-10">
    <div class="mx-auto max-w-screen-lg px-2">
      <div class="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
        <p class="flex-1 text-base font-bold text-gray-900">Candidates list</p>
      </div>
      {
        candidates.length === 0 ? (
          <div className="mt-6 bg-white border border-gray-300 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">No candidates have applied for this job yet.</p>
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-xl border shadow">
            <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
              <thead className="border-b lg:table-header-group">
                <tr>
                  <td width="50%" className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Name</td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Email</td>
                  {/* <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Phone No</td> */}
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">JobId</td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Status</td>
                </tr>
              </thead>
              <tbody className="lg:border-gray-300">
                {candidates.map((candidate) => (
                  <tr key={candidate.email}>
                    <td width="50%" className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                      {candidate.name}
                      <div className="mt-1 lg:hidden">
                        <p className="font-normal text-gray-500">{candidate.email}</p>
                      </div>
                    </td>
                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                      {candidate.email}
                    </td>
                    <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                      {id}
                      <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-blue-600 py-2 px-3 text-left text-xs font-medium text-white lg:hidden">
                        {id}
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
        )
      }
    </div>
  </div>
</div>


      <ShortlistCandidates token={token} jobId={id} />
    </>
  );
};

export default AppliedCandidates;