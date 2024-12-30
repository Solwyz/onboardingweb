import React, { useState } from 'react';
import medoLogo from "../../../Assets/medoLogo.svg"
import Notification from "../../../Assets/Group 2.svg";
import Announce from "../../../Assets/Group 3.svg";
import User from "../../../Assets/Frame.svg";
import LogoutIcon from "../../../Assets/logOutIcon.svg"
import { useNavigate } from 'react-router-dom';

function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogOut = () => {
    console.log('Logged out');
    localStorage.removeItem('token')
    // Add your logout logic here
    navigate('/'); // Redirect to login page after logout
  };

  return (
    <div className="h-[72px] z-[1000] pl-[40px] pr-[25px] flex items-center">
      <img className="cursor-pointer" src={medoLogo} alt="Logo" />
      <div className="flex justify-end ml-auto">
        <img className="cursor-pointer" src={Notification} alt="Notification" />
        <img className="ml-4 cursor-pointer" src={Announce} alt="Announcement" />
        <div className="relative ">
          <img 
            className="ml-16 cursor-pointer" 
            src={User} 
            alt="User" 
            onClick={toggleDropdown} 
          />
          {/* Dropdown menu */}
          {dropdownVisible && (
            <div className="absolute right-0  mt-8 w-48 bg-white border rounded-md shadow-lg">
              <button 
                onClick={handleLogOut} 
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100"
              >
                <img src={LogoutIcon} alt="Logout" className="mr-2" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
