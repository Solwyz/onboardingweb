import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaHome, FaUser, FaProjectDiagram, FaCalendarAlt, FaTasks, FaFileAlt,
  FaFileInvoice, FaSignOutAlt, FaChevronDown
} from 'react-icons/fa';
import LeaveManagement from '../../Components/DashboardComponents/LeaveManagement/LeaveManagement';
import EmployeeInformation from '../../Components/DashboardComponents/EmployeeInformation/EmployeeInformation';

function LogedInSection() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleClick = (section) => {
    setExpandedSection(section);
    setActiveSection(section);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
        return <EmployeeInformation />;
      case 'leave':
        return <LeaveManagement />;
      case 'attendance':
        return <div>Attendance content...</div>;
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
    <div className="flex flex-col h-screen overflow-hidden">
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

      <div className='flex flex-grow overflow-hidden'>
        <div className={`w-64 bg-[#141454] text-white flex flex-col justify-between p-4`}>
          <div className="flex-grow">
            <ul className="space-y-10 mt-8">
              <li 
                className={`flex items-center cursor-pointer hover:text-blue-400 ${activeSection === 'employee' ? 'text-blue-400' : ''}`}
                onClick={() => handleClick('employee')}
              >
                <FaUser className="mr-3" />
                <span>Employee Information</span>
              </li>
              <li 
                className={`flex items-center cursor-pointer hover:text-blue-400 ${activeSection === 'leave' ? 'text-blue-400' : ''}`}
                onClick={() => handleClick('leave')}
              >
                <FaCalendarAlt className="mr-3" />
                <span>Leave Management</span>
              </li>
              <li 
                className={`flex items-center cursor-pointer hover:text-blue-400 ${activeSection === 'attendance' ? 'text-blue-400' : ''}`}
                onClick={() => handleClick('attendance')}
              >
                <FaTasks className="mr-3" />
                <span>Attendance</span>
              </li>
              <li 
                className={`flex items-center cursor-pointer hover:text-blue-400 ${activeSection === 'payroll' ? 'text-blue-400' : ''}`}
                onClick={() => handleClick('payroll')}
              >
                <FaFileInvoice className="mr-3" />
                <span>Payroll</span>
              </li>
              <li 
                className={`flex items-center cursor-pointer hover:text-blue-400 ${activeSection === 'performance' ? 'text-blue-400' : ''}`}
                onClick={() => handleClick('performance')}
              >
                <FaFileAlt className="mr-3" />
                <span>Performance Management</span>
              </li>
              <li 
                className={`flex items-center cursor-pointer hover:text-blue-400 ${activeSection === 'recruitment' ? 'text-blue-400' : ''}`}
                onClick={() => handleClick('recruitment')}
              >
                <FaProjectDiagram className="mr-3" />
                <span>Recruitment & Onboarding</span>
              </li>
              <li 
                className={`flex items-center cursor-pointer hover:text-blue-400 ${activeSection === 'training' ? 'text-blue-400' : ''}`}
                onClick={() => handleClick('training')}
              >
                <FaTasks className="mr-3" />
                <span>Training</span>
              </li>
              <li 
                className={`flex items-center cursor-pointer hover:text-blue-400 ${activeSection === 'selfService' ? 'text-blue-400' : ''}`}
                onClick={() => handleClick('selfService')}
              >
                <FaUser className="mr-3" />
                <span>Self-service</span>
              </li>
              <li 
                className={`flex items-center cursor-pointer hover:text-blue-400 ${activeSection === 'document' ? 'text-blue-400' : ''}`}
                onClick={() => handleClick('document')}
              >
                <FaFileAlt className="mr-3" />
                <span>Document Management</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-grow flex justify-center p-8 bg-white overflow-y-auto">
          <div className="w-full">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogedInSection;
