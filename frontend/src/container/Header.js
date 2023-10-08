import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.svg'
import { FaUserCircle } from "react-icons/fa";

function Header() {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user data is stored in localStorage
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      // Parse the stored user data if it exists
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
    }
  }, []);

  console.log(currentUser);

  return (
    <header className="bg-gray-900 p-6 flex justify-between">
      <img src={logo} className="h-12 -ml-8 -mb-2 cursor-pointer rotate-0" alt="" />

{currentUser && (
  <div className="flex items-center space-x-4">
  <div className="">
 <FaUserCircle className='w-10 h-10 rounded-full text-white'/>
    </div>
  <div className="font-medium dark:text-white">
      <div>{currentUser.user.email}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">Admin</div>
  </div>
</div>
)}        




    </header>
  );
}

export default Header;
