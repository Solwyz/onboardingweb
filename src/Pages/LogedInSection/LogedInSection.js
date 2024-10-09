import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaProjectDiagram, FaCalendarAlt, FaTasks, FaFileAlt, FaFileInvoice, FaSignOutAlt, FaChevronDown } from 'react-icons/fa'; // Example icons
import LeaveManagement from '../../Components/DashboardComponents/LeaveManagement/LeaveManagement';


function LogedInSection() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('home'); // Track active section
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleClick = (section) => {
    setExpandedSection(section);
    setActiveSection(section); // Set the active section
    setSidebarExpanded(true); // Expand sidebar on section click and keep it open
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const handleLogoutPage = () => {
    navigate("/login");
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const renderContent = () => {
    switch (expandedSection) {
      case 'employee':
        return <div>Details about Employee Information...</div>;
      case 'leave':
        return <div><LeaveManagement/></div>;
      case 'attendance':
        return <div></div>;
      case 'payroll':
        return <div>Details about Payroll...</div>;
      case 'performance':
        return <div>Details about Performance Management...</div>;
      case 'recruitment':
        return <div>Details about Recruitment & Onboarding...</div>;
      case 'training':
        return <div>Details about Training...</div>;
      case 'selfService':
        return <div>Details about Self-service...</div>;
      case 'document':
        return <div>Details about Document Management...</div>;
      default:
        return <div>Home</div>;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header Section */}
      <div className='header-section flex gap-3 border-b h-20 items-center justify-end px-5 w-full bg-slate-200'>
        <div className='relative flex items-center gap-2' ref={dropdownRef}>
          <div className='text-[16px] font-medium flex items-center'>
            <FaUser className="mr-3 w-4 h-4" />
            Ruthin
          </div>
          <FaChevronDown 
            className='cursor-pointer w-3 h-3' 
            onClick={toggleDropdown} 
          />
          {isDropdownOpen && (
            <div className='absolute right-0 mt-[90px] w-fit bg-white shadow-md rounded'>
              <div
                className='py-2 px-4 cursor-pointer hover:bg-gray-200 text-end'
                onClick={handleLogoutPage}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Section */}
      <div className='flex h-[90%]'>
        {/* Sidebar Section */}
        <div
          className={`transition-all duration-300 ${isSidebarExpanded ? 'w-64' : 'w-16'} bg-[#141454] text-white flex flex-col justify-between p-4`}
        >
          <div className="flex-grow">
            <ul className="space-y-10 mt8">
              <li 
                className={`flex items-center cursor-pointer hover:text-blue-400 ${activeSection === 'employee' ? 'text-blue-400' : ''}`}
                onClick={() => handleClick('employee')}
              >
                <FaUser className="mr-3" />
                {isSidebarExpanded && <span>Employee Information</span>}
              </li>
              <li 
                className={`flex items-center cursor-pointer hover:text-blue-400 ${activeSection === 'leave' ? 'text-blue-400' : ''}`}
                onClick={() => handleClick('leave')}
              >
                <FaCalendarAlt className="mr-3" />
                {isSidebarExpanded && <span>Leave Management</span>}
              </li>
              <li 
                className={`flex items-center cursor-pointer hover:text-blue-400 ${activeSection === 'attendance' ? 'text-blue-400' : ''}`}
                onClick={() => handleClick('attendance')}
              >
                <FaTasks className="mr-3" />
                {isSidebarExpanded && <span>Attendance</span>}
              </li>
              <li 
                className={`flex items-center cursor-pointer hover:text-blue-400 ${activeSection === 'payroll' ? 'text-blue-400' : ''}`}
                onClick={() => handleClick('payroll')}
              >
                <FaFileInvoice className="mr-3" />
                {isSidebarExpanded && <span>Payroll</span>}
              </li>
              <li 
                className={`flex items-center cursor-pointer hover:text-blue-400 ${activeSection === 'performance' ? 'text-blue-400' : ''}`}
                onClick={() => handleClick('performance')}
              >
                <FaFileAlt className="mr-3" />
                {isSidebarExpanded && <span>Performance Management</span>}
              </li>
              <li 
                className={`flex items-center cursor-pointer hover:text-blue-400 ${activeSection === 'recruitment' ? 'text-blue-400' : ''}`}
                onClick={() => handleClick('recruitment')}
              >
                <FaProjectDiagram className="mr-3" />
                {isSidebarExpanded && <span>Recruitment & Onboarding</span>}
              </li>
              <li 
                className={`flex items-center cursor-pointer hover:text-blue-400 ${activeSection === 'training' ? 'text-blue-400' : ''}`}
                onClick={() => handleClick('training')}
              >
                <FaTasks className="mr-3" />
                {isSidebarExpanded && <span>Training</span>}
              </li>
              <li 
                className={`flex items-center cursor-pointer hover:text-blue-400 ${activeSection === 'selfService' ? 'text-blue-400' : ''}`}
                onClick={() => handleClick('selfService')}
              >
                <FaUser className="mr-3" />
                {isSidebarExpanded && <span>Self-service</span>}
              </li>
              <li 
                className={`flex items-center cursor-pointer hover:text-blue-400 ${activeSection === 'document' ? 'text-blue-400' : ''}`}
                onClick={() => handleClick('document')}
              >
                <FaFileAlt className="mr-3" />
                {isSidebarExpanded && <span>Document Management</span>}
              </li>
            </ul>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-grow flex justify-center items-center p-8 bg-gray-100">
          <div className="text-center">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogedInSection;
