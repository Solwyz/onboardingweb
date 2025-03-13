import React, { useEffect, useState } from 'react';
import medoLogo from "../../../Assets/medoLogo.svg"
import Notification from "../../../Assets/Group 2.svg";
import Announce from "../../../Assets/Group 3.svg";
import User from "../../../Assets/Frame.svg";
import LogoutIcon from "../../../Assets/logOutIcon.svg"
import { useNavigate } from 'react-router-dom';
import Api from '../../../Services/Api';

function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogOut = () => {
    console.log('Logged out');
    localStorage.removeItem('token')
    // Add your logout logic here
    navigate('/'); // Redirect to login page after logout
  };

  const handleTasClick = () => {
    navigate('/hrtas')
  }

  const handleHrmClick = () => {
    navigate('/hr')
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdownNotification = () => {
    setIsOpen(!isOpen);
  };

  const [isOpenAnnouncemet, setIsOpenAnnouncement] = useState(false)

  const toggleDropdownAnnouncement = () => {
    setIsOpenAnnouncement(!isOpenAnnouncemet)
  }

  useEffect(() => {
    Api.get('api/alert', {
      'Authorization': `Bearer ${token}`
    })
      .then(response => {
        if (response && response.data) {
          console.log('dddd', response.data.content);
          setAlerts(response.data.content);
        } else {
          console.error('Invalid response data :', response);
        }
      })

      Api.get('api/announcement', {
        'Authorization': `Bearer ${token}`
      })
      .then(response => {
        if (response && response.data) {
          console.log('eeee', response.data.content);
          setAnnouncements(response.data.content);
        } else {
          console.error('Invalid response data :', response);
        }
      })

  }, [])

  return (
    <div className="h-[72px]  pl-[40px] pr-[25px] flex items-center">
      <img className="cursor-pointer" src={medoLogo} alt="Logo" />
      <div className="flex justify-end ml-auto">
        <div className='relative'>
          <img
            onClick={toggleDropdownNotification}
            className="cursor-pointer" src={Notification} alt="Notification" />

          {isOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl p-4 z-10">
              <div className="text-black text-sm">
                <p className="font-bold">Alerts</p>
                <ul className="mt-2">
                  {alerts.map((alert, index) => (
                    <li className="py-1 border-b">{alert.title}</li>
                  ))}
                  {/* <li className="py-1 border-b">Meeting at 3 PM</li>
                  <li className="py-1">Your report is ready</li> */}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className='relative'>
          <img
            onClick={toggleDropdownAnnouncement}
            className="ml-4 cursor-pointer" src={Announce} alt="Announcement" />

          {isOpenAnnouncemet && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl p-4 z-10">
              <div className="text-black text-sm">
                <p className="font-bold">Announcement</p>
                <ul className="mt-2">
                {announcements.map((announcement, index) => (
                  <li className="py-1 border-b">{announcement.title}</li>
                ))}
                  {/* <li className="py-1 border-b">Meeting at 3 PM</li>
                  <li className="py-1">Your report is ready</li> */}
                </ul>
              </div>
            </div>
          )}
        </div>

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
              <button
                onClick={handleTasClick}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100"
              >
                <img src={LogoutIcon} alt="Logout" className="mr-2" />
                HR-TAS
              </button>
              <button
                onClick={handleHrmClick}
                className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-100"
              >
                <img src={LogoutIcon} alt="Logout" className="mr-2" />
                HR-Module
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
