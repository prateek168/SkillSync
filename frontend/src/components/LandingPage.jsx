import React from "react";
import Navbar from "../layouts/Navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../layouts/Footer";

const LandingPage = () => {
  let navigate = useNavigate();
  return (
    <>
      <div class="relative bg-purple-50 text-gray-900">
        <header class="text-slate-700 container relative mx-auto flex flex-col overflow-hidden px-4 py-4 lg:flex-row lg:items-center">
          <a class="flex items-center whitespace-nowrap text-2xl font-black">
            SkillSync
          </a>
          <input type="checkbox" class="peer hidden" id="navbar-open" />
          <label
            class="absolute top-5 right-5 cursor-pointer lg:hidden"
            for="navbar-open"
          >
            <svg
              class="h-7 w-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
          <nav
            aria-label="Header Navigation"
            class="peer-checked:pt-8 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row"
          >
            <ul class="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0">
              <li class="lg:mr-12">
                <a
                  class="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2"
                  onClick={() => navigate("/login")}
                >
                  Add Job
                </a>
              </li>

              <li class="lg:mr-12">
                <Link
                  to="/login"
                  class="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2"
                >
                  Apply Now
                </Link>
              </li>

              <li class="lg:mr-12">
                <Link
                  to="/login"
                  class="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2"
                >
                  Contact
                </Link>
              </li>

              <li class="lg:mr-12">
                <Link
                  to="/login"
                  class="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2"
                >
                  FAQ
                </Link>
              </li>
            </ul>
            <hr class="mt-4 w-full lg:hidden" />
            <div class="my-4 flex items-center space-x-6 space-y-2 lg:my-0 lg:ml-auto lg:space-x-8 lg:space-y-0">
              <button
                onClick={() => {
                  navigate("/login");
                }}
                class="whitespace-nowrap rounded font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2 hover:text-opacity-50 text-purple-900"
              >
                {" "}
                Apply Now{" "}
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                }}
                class="whitespace-nowrap rounded-xl bg-purple-800 px-5 py-3 font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 hover:bg-purple-900"
              >
                Login
              </button>
            </div>
          </nav>
        </header>

        <div class="relative py-12 sm:py-16 lg:py-20 lg:pb-36">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="mx-auto grid max-w-lg grid-cols-1 gap-y-12 lg:max-w-full lg:grid-cols-2 lg:items-center lg:gap-x-8">
              <div>
                <div class="text-center lg:text-left">
                  <h1 class="max-w-md text-4xl font-bold leading-snug sm:text-5xl sm:leading-snug">
                    Streamlined hiring <br class="block sm:hidden" />
                    <br class="hidden sm:block" />
                    with{" "}
                    <span class="rounded-xl bg-purple-800 px-2 pb-2 text-white">
                      SkillSync
                    </span>
                  </h1>
                  <p class="mt-2 text-lg text-gray-600 sm:mt-8">
                    HR adds jobs, users apply with resumes, get shortlisted by
                    skills, tested, and top scorers receive offer letters via
                    email.
                  </p>
                  <div class="mt-8 flex flex-col items-center justify-center sm:flex-row sm:space-x-4 lg:justify-start">
                    <button
                      onClick={() => {
                        navigate("/login");
                      }}
                      class="relative mt-4 rounded-lg border-2 border-purple-600 bg-purple-600 px-6 py-2 font-medium text-white transition hover:translate-y-1"
                    >
                      <div class="-scale-x-100 absolute left-0 -bottom-10 hidden h-10 w-10 -rotate-12 text-purple-600 md:inline-flex">
                        <svg
                          viewBox="0 0 82 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0 21.3963C0.189514 19.1422 0.475057 16.717 0.554355 14.2852C0.582363 13.435 0.32301 12.6326 1.24839 12.1517C1.43863 12.053 1.7169 11.8956 1.85767 11.9661C4.2446 13.1626 6.90906 13.1934 9.41312 13.8814C11.09 14.3423 12.6519 15.089 13.7134 16.5797C13.9251 16.8774 13.9105 17.3427 14 17.7305C13.6228 17.8077 13.2227 18.01 12.8727 17.9421C10.3283 17.4477 7.78825 16.9245 5.25946 16.353C4.46612 16.1737 4.32244 16.4862 4.22859 17.1961C4.0118 18.8342 3.66769 20.4541 3.43198 22.0899C3.33086 22.7891 3.36905 23.509 3.35123 24.2197C3.34977 24.2791 3.44107 24.3474 3.43052 24.3989C3.32213 24.9318 3.2712 25.8796 3.07114 25.9142C2.49387 26.0144 1.77655 25.8915 1.25603 25.5961C-0.352473 24.6832 0.143681 23.0129 0 21.3963Z"
                            fill="currentColor"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M33.9279 29.9296C33.9687 30.0252 34.0103 30.1211 34.0512 30.2167L36.776 28.708C36.7189 28.6018 36.6613 28.4961 36.6041 28.3903C35.7123 28.9033 34.8197 29.4166 33.9279 29.9296ZM55.213 27.9357C55.2513 28.0076 55.2895 28.0795 55.3278 28.1513C56.8382 27.5018 58.3486 26.8518 59.8593 26.2019C59.8129 26.092 59.7661 25.9821 59.7197 25.8726C58.2175 26.5602 56.7153 27.2481 55.213 27.9357ZM40.7384 18.9565C40.5279 17.8215 40.3393 16.6815 40.0998 15.5525C39.952 14.8551 39.5106 14.6711 38.8099 14.825C36.6153 15.3082 34.9909 17.2686 34.7963 19.6189C34.584 22.1806 36.0472 23.7605 37.8517 25.1395C37.9927 25.2475 38.5155 25.0604 38.6986 24.8591C40.2045 23.1998 40.6396 21.163 40.7384 18.9565ZM47.8846 27.7513C53.9169 27.9699 58.9887 25.6539 63.5351 21.8258C68.7108 17.4677 72.7252 12.1435 76.2413 6.39113C77.3061 4.64903 78.3271 2.87833 79.4328 1.16371C79.7291 0.70344 80.2137 0.234515 80.706 0.0824723C81.0457 -0.0225277 81.5473 0.410268 81.9765 0.603333C81.8444 0.859247 81.7237 1.12306 81.5774 1.37032C81.1827 2.03645 80.7194 2.66758 80.3867 3.36306C79.3033 5.6264 78.3041 7.93113 77.1981 10.1824C76.4525 11.6998 75.639 13.1905 74.7457 14.6225C74.1814 15.5269 73.3694 16.269 72.7471 17.1414C71.7606 18.5237 70.9604 20.0611 69.8622 21.3395C68.1531 23.33 66.4111 25.3434 64.4139 27.0174C59.9989 30.718 54.9038 32.5263 49.0801 32.1605C46.3701 31.9904 43.6835 31.9283 41.122 30.8655C40.842 30.7492 40.3185 30.9333 40.0448 31.1527C37.2899 33.3656 34.1239 34.5277 30.6632 34.7456C28.0734 34.909 25.4198 35.1171 22.8828 34.7219C20.7546 34.3908 18.675 33.3742 16.7198 32.3694C14.9819 31.4756 13.3686 30.2773 11.8348 29.0418C9.65017 27.2812 8.09522 24.9795 7.06601 22.3556C6.91824 21.9789 7.17257 21.2819 7.46774 20.9267C7.79559 20.5315 8.26675 20.7212 8.80326 20.9647C10.4826 21.7271 11.1635 23.3172 12.0776 24.6916C13.809 27.2959 16.297 28.8333 19.144 29.6515C24.0015 31.0477 28.8342 30.4606 33.5239 28.7422C36.0572 27.8134 36.0323 27.708 34.1863 25.8643C31.7566 23.438 30.4122 20.5417 30.5982 17.0518C30.8143 13.0012 34.1347 10.1538 38.1338 10.4515C39.3892 10.5452 40.2439 11.3239 41.0648 12.1255C42.9294 13.9466 43.9712 16.2194 44.3347 18.7977C44.7112 21.4648 44.7806 24.1113 43.5286 26.6189C43.2264 27.2244 43.5171 27.489 44.1483 27.5187C45.3947 27.5778 46.6393 27.6719 47.8846 27.7513Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      Apply Now
                    </button>
                    <button
                      onClick={() => {
                        navigate("/login");
                      }}
                      class="mt-4 flex items-center rounded-lg border-2 border-purple-600 px-6 py-2 font-medium text-purple-600 transition hover:translate-y-1 hover:bg-white"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>

              <div class="relative bg-violet-100 lg:bg-transparent">
                <div class="absolute right-0 bottom-0 hidden overflow-hidden lg:inset-y-0 lg:block">
                  <img src="src\assets\company-list.svg" alt="job_logo" />
                </div>
                <iframe
                  class="h-[350px] lg:h-[500px] relative"
                  src=""
                  frameborder="0"
                  width="100%"
                  height="500px"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="pb-10 bg-purple-50">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="mb-10 lg:mb-16 flex justify-center items-center flex-col gap-x-0 gap-y-6 lg:gap-y-0 lg:flex-row lg:justify-between max-md:max-w-lg max-md:mx-auto">
            <div class="relative w-full text-center lg:text-left lg:w-2/4">
              <h2 class="text-4xl font-bold text-gray-900 leading-[3.25rem] lg:mb-6 mx-auto max-w-max lg:max-w-md lg:mx-0">
                Experience seamless hiring with SkillSync.
              </h2>
            </div>
            <div class="relative w-full text-center  lg:text-left lg:w-2/4">
              <p class="text-lg font-normal text-gray-500 mb-5">
                We simplify all your hiring processes with seamless features and
                no extra requirements.
              </p>
              <Link
                to="/login"
                class="flex flex-row items-center justify-center gap-2 text-base font-semibold text-purple-800 lg:justify-start hover:text-purple-900 "
              >
                Login
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
                    stroke="#4F46E5"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
          <div class="flex justify-center items-center  gap-x-5 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
            <div class="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-purple-800">
              <div class="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                <img
                  width={30}
                  height={30}
                  src="src\assets\file-new-dual-tone-icon.svg"
                  alt=""
                />
              </div>
              <h4 class="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
                Job Posting & Apply
              </h4>
              <p class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                HR can effortlessly post job listings for open positions and
                applicants can apply by uploading there resumes.
              </p>
            </div>
            <div class="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-purple-800">
              <div class="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                <img
                  width={30}
                  height={30}
                  src="src\assets\file-search-dual-tone-icon.svg"
                  alt=""
                />
              </div>
              <h4 class="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
                Skill-Based Shortlisting
              </h4>
              <p class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                Candidates are shortlisted based on the required skills for the
                job. Required Skills are matched with the skills in candidates
                resume.
              </p>
            </div>
            <div class="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-purple-800">
              <div class="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0067 10V15.6652C15.0067 16.0358 15.1712 16.3873 15.4556 16.6248L18.75 19.375M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                    stroke="#4F46E5"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
              <h4 class="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
                Skill Tests{" "}
              </h4>
              <p class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                Tests are conducted to evaluate the skills of shortlisted
                candidates.Tests are based on the skills required for the job.
              </p>
            </div>
            <div class="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 md:h-64 xl:p-7 xl:w-1/4 hover:bg-purple-800">
              <div class="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                    stroke="#4F46E5"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
              <h4 class="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
                Job Offers
              </h4>
              <p class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
                Top scorer of the test conducted based on the skills is selected
                .The selected candidate receives an offer letter via email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <footer class="w-full py-14 bg-gray-100">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="max-w-3xl mx-auto">
            <a href="https://pagedone.io/" class="flex justify-center ">
              <h1 className="font-bold text-3xl text-purple-800">SkillSync</h1>
            </a>
            <ul class="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-16 mb-10 border-b border-gray-200">
              <li>
                <Link
                  to="/add-job"
                  className="text-gray-800 hover:text-gray-900"
                >
                  Add Job
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-800 hover:text-gray-900">
                  Apply Now
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-800 hover:text-gray-900">
                  Contact us
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-800 hover:text-gray-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-gray-800 hover:text-gray-900"
                >
                  Signup
                </Link>
              </li>
            </ul>
            <div class="flex space-x-10 justify-center items-center mb-14">
              <ul class="flex space-x-4 sm:mt-0">
                <li>
                  <a
                    href="mailto:chinmayankolekar@proton.me"
                    class="text-gray-500 hover:text-gray-900"
                  >
                    <span class="[&>svg]:h-5 [&>svg]:w-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 488 512"
                      >
                        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                      </svg>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/chinmay-ankolekar-334177229/"
                    class="text-gray-500 hover:text-gray-900 "
                  >
                    <span class="[&>svg]:h-5 [&>svg]:w-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 448 512"
                      >
                        <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                      </svg>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Chinmay-Ankolekar"
                    class="text-gray-500 hover:text-gray-900 "
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/chinmay.ankolekar/"
                    class="text-gray-500 hover:text-gray-900 "
                  >
                    <span class="[&>svg]:h-5 [&>svg]:w-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 448 512"
                      >
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                      </svg>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <span class="text-lg text-gray-500 text-center block">
              ©<a href="https://pagedone.io/">SkillSync</a> 2024, All rights
              reserved.
            </span>
          </div>
        </div>
      </footer> */}
    </>
  );
};

export default LandingPage;
