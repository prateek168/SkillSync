import { useState } from "react";
import supabase from "../supabase/supabase";
import { useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";

const AddJob = ({ token }) => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [company_name, setCompany_name] = useState(""); 
  const [designation, setDesignation] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  const addJob = async () => {
    try {
      const { data, error } = await supabase.from("jobs").insert([
        {
          name: name,
          designation: designation,
          description: description,
          skills: skills,
          experience: experience,
          location: location,
          salary: salary,
          created_by: token.user.id,
          company_name: company_name,
        },
      ]);
      if (error) throw error;
      alert("Job Added");
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return ( 
    <>
      <Navbar token={token} />

      <div className="lg:m-10">
        <form className="relative border border-gray-100 space-y-3 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-10">
          <h1 className="mb-6 text-xl font-semibold lg:text-2xl">Add Job</h1>

          <label htmlFor="company_name">Company Name</label>
          <input
            id="company_name"
            type="text"
            placeholder="Company Name"
            onChange={(e) => setCompany_name(e.target.value)}
            className="border mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
          />
          
          <label htmlFor="job_role">Job Role</label>
          <input
            id="job_role"
            type="text"
            placeholder="Job Role"
            onChange={(e) => setName(e.target.value)}
            className="border mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
          />
          
          <label htmlFor="designation">Designation</label>
          <input
            id="designation"
            type="text"
            placeholder="Designation"
            onChange={(e) => setDesignation(e.target.value)}
            className="border mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
          />
          
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="border mt-2 h-24 w-full rounded-md bg-gray-100 px-3"
          ></textarea>
          
          <label htmlFor="skills">Skills</label>
          <input
            id="skills"
            type="text"
            placeholder="Skills"
            onChange={(e) => setSkills(e.target.value)}
            className="border mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
          />
          
          <label htmlFor="experience">Experience</label>
          <input
            id="experience"
            type="text"
            placeholder="Experience"
            onChange={(e) => setExperience(e.target.value)}
            className="border mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
          />
          
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            className="border mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
          />
          
          <label htmlFor="salary">Salary</label>
          <input
            id="salary"
            type="text"
            placeholder="Salary"
            onChange={(e) => setSalary(e.target.value)}
            className="border mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
          />

          <div className="flex justify-between">
            <button 
              type="button"
              className="border mt-2 h-12 w-1/2 rounded-md bg-purple-800 hover:bg-purple-900 p-2 text-center font-semibold text-white"
              onClick={addJob}
            >
              Add Job
            </button>
            <button 
              type="button"
              className="border mt-2 h-12 w-1/2 rounded-md bg-gray-300 p-2 text-center font-semibold hover:bg-gray-400"
              onClick={() => navigate('/dashboard')}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddJob;
