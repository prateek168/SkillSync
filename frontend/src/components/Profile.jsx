import { useState, useEffect } from "react";
import Navbar from "../layouts/Navbar";
import supabase from "../supabase/supabase";

const Profile = ({ token }) => {
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", token.user.id);

      if (error) {
        throw error;
      }

      setUser(data[0]);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Navbar token={token} />
      <div className="w-full flex items-center justify-center">
        <div className="relative w-full max-w-2xl my-8 md:my-16 flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 px-6 py-8 border-1 shadow-lg rounded-lg bg-white">
          <div className="w-full flex justify-center sm:justify-start sm:w-auto">
            <span className="inline-block size-[62px] bg-gray-100 rounded-full overflow-hidden">
              <svg className="size-full text-gray-300" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5" fill="white"></rect>
                <path d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z" fill="currentColor"></path>
                <path d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z" fill="currentColor"></path>
              </svg>
            </span>
          </div>

          <div className="w-full sm:w-auto flex flex-col items-center sm:items-start">
            <p className="font-display mb-2 text-2xl font-semibold text-gray-900" itemprop="author">
              {user.fullname}
            </p>
            <div className="flex gap-4">
              <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">Email: {user.email}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
