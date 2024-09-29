import Navbar from "../layouts/Navbar";
import { Link } from "react-router-dom";

const FAQ = ({token}) => {
    return ( 
        <>
        <Navbar token={token}/>
            <div class="relative mx-auto w-full py-16 px-5 font-sans text-gray-800 sm:px-20 md:max-w-screen-lg lg:py-24">
  <h2 class="mb-5 text-center font-sans text-4xl sm:text-5xl font-bold">Frequently asked Questions</h2>
  <p class="mb-12 text-center text-lg text-gray-600">We have written down answers to some of the frequently asked questions.</p>
  <ul class="space-y-4">
 

    <li class="text-left">
      <label for="accordion-2" class="relative flex flex-col rounded-md border border-gray-100 shadow-md">
        <input class="peer hidden" type="checkbox" id="accordion-2" />
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <div class="relative ml-4 cursor-pointer select-none items-center py-4 pr-12">
          <h3 class="text-sm text-gray-600 lg:text-base">How does Skillsync work for HR?</h3>
        </div>
        <div class="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
          <div class="p-5">
            <p class="text-sm">HR can create job listings on Skillsync and shortlist candidates based on their skills. Shortlisted candidates will undergo testing, and the top scorers will be selected for the job.</p>
          </div>
        </div>
      </label>
    </li>
    <li class="text-left">
      <label for="accordion-2" class="relative flex flex-col rounded-md border border-gray-100 shadow-md">
        <input class="peer hidden" type="checkbox" id="accordion-2" />
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <div class="relative ml-4 cursor-pointer select-none items-center py-4 pr-12">
          <h3 class="text-sm text-gray-600 lg:text-base">How can I apply for jobs on Skillsync?</h3>
        </div>
        <div class="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
          <div class="p-5">
            <p class="text-sm">You can apply for jobs on Skillsync by creating a user account, browsing job listings, and submitting your resume through the platform. Your application will be reviewed by the HR, and if shortlisted, you will undergo testing.</p>
          </div>
        </div>
      </label>
    </li>

    <li class="text-left">
      <label for="accordion-3" class="relative flex flex-col rounded-md border border-gray-100 shadow-md">
        <input class="peer hidden" type="checkbox" id="accordion-3" />
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <div class="relative ml-4 cursor-pointer select-none items-center py-4 pr-12">
          <h3 class="text-sm text-gray-600 lg:text-base">How does the testing process work?</h3>
        </div>
        <div class="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
          <div class="p-5">
            <p class="text-sm">Candidates shortlisted by HR will undergo testing on Skillsync. The testing process includes technical assessments depending on the job requirements.</p>
          </div>
        </div>
      </label>
    </li>

    <li class="text-left">
      <label for="accordion-4" class="relative flex flex-col rounded-md border border-gray-100 shadow-md">
        <input class="peer hidden" type="checkbox" id="accordion-4" />
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <div class="relative ml-4 cursor-pointer select-none items-center py-4 pr-12">
          <h3 class="text-sm text-gray-600 lg:text-base">How are candidates selected for job offers?</h3>
        </div>
        <div class="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
          <div class="p-5">
            <p class="text-sm">Candidates who perform well in the testing process and meet the job requirements are selected for job offers. HR consider factors such as test scores making their final selection.</p>
          </div>
        </div>
      </label>
    </li>

    <li class="text-left">
      <label for="accordion-5" class="relative flex flex-col rounded-md border border-gray-100 shadow-md">
        <input class="peer hidden" type="checkbox" id="accordion-5" />
        <svg xmlns="http://www.w3.org/2000/svg" class="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-500 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <div class="relative ml-4 cursor-pointer select-none items-center py-4 pr-12">
          <h3 class="text-sm text-gray-600 lg:text-base">Is there a fee for using Skillsync as a job seeker?</h3>
        </div>
        <div class="max-h-0 overflow-hidden transition-all duration-500 peer-checked:max-h-96">
          <div class="p-5">
            <p class="text-sm">No, there is no fee for job seekers to use Skillsync. The platform is free to use for both HR and job seekers.</p>
          </div>
        </div>
      </label>
    </li>
  </ul>
  <div class="mt-20 flex justify-center">
  {token.user.user_metadata.userType === "hr" ? <Link to='/dashboard' class="inline-flex cursor-pointer rounded-lg bg-purple-900 py-3 px-5 text-lg text-white">Back</Link> : <Link to='/userdashboard' class="inline-flex cursor-pointer rounded-lg bg-purple-900 py-3 px-5 text-lg text-white">Back</Link>}
    
  </div>
</div>

        </>
     );
}
 
export default FAQ;