import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = ({token}) => {
  let navigate = useNavigate();
  const Logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

    return (
        <div>
          
      <header class="text-slate-700 container relative mx-auto flex flex-col overflow-hidden px-4 py-4 lg:flex-row lg:items-center">
        <a class="flex items-center whitespace-nowrap text-2xl font-black">
          <span class="mr-2 w-8">
            <img src="/images/JOJj79gp_Djhwdp_ZOKLL.png" alt="" />
          </span>
          SkillSync
        </a>
        <input type="checkbox" class="peer hidden" id="navbar-open" />
        <label class="absolute top-5 right-5 cursor-pointer lg:hidden" for="navbar-open">
          <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
        <nav aria-label="Header Navigation" class="peer-checked:pt-8 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row">
          <ul class="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0">
           
           {
              token.user.user_metadata.userType === "hr" ? (
                <button class="lg:mr-12"><a class="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" onClick={()=> navigate('/dashboard')}>Home</a></button>
              ) : (
                <button class="lg:mr-12"><a class="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" onClick={()=> navigate('/userdashboard')}>Home</a></button>
              )
           }

            {/* <li class="lg:mr-12"><a class="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" href="#">Home</a></li> */}

          {
            token.user.user_metadata.userType === "hr" ? (
              <button  class="lg:mr-12"><Link to='/allJobsAppliedCandidates' class="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" >Applied Candidates</Link></button>
            ) : (
              <li class="lg:mr-12"><Link to='/jobAppliedbyUser' class="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" >Jobs Applied</Link></li>
            )
          }

            
            <li class="lg:mr-12"><Link to='/contactUs' class="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" href="#">Contact</Link></li>
            <li class="lg:mr-12"><Link to='/faq' class="rounded text-gray-700 transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2" >FAQ</Link></li>
          </ul>
          <hr class="mt-4 w-full lg:hidden" />
          <div class="my-4 flex items-center space-x-6 space-y-2 lg:my-0 lg:ml-auto lg:space-x-8 lg:space-y-0">
            <button onClick={()=> {navigate('/profile')}} class="whitespace-nowrap rounded font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2 hover:text-opacity-50" > Profile </button>
            <button onClick={Logout} class="whitespace-nowrap rounded-xl bg-purple-800 px-5 py-3 font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 hover:bg-purple-900">Logout</button>
          </div>
        </nav>
      </header>
    </div>
    );
  }
  
  export default Navbar;
  