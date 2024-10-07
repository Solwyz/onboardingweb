import React, { useState, useRef, useEffect } from 'react';
import Logout from "../../Assets/power-off-solid.svg";
import { useNavigate } from 'react-router-dom'; // If using react-router for navigation

function LogedInSection() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate(); 
  const handleClick = (section) => {
    setExpandedSection(section);
    setSidebarExpanded(true);
  };


  const handleLogout = () => {
    
    navigate("/login"); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarExpanded(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderContent = () => {
    switch (expandedSection) {
      case 'employee':
        return <div>Details about Employee Information...</div>;
      case 'leave':
        return <div>Details about Leave Management...</div>;
      case 'attendance':
        return <div>Details about Attendance...</div>;
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
        return <div>Please select an option from the sidebar.</div>;
    }
  };

  return (
    <div className="">
      {/* Header Section */}
      <div className='header-section flex gap-3 border-b h-20 items-center justify-end px-5 w-full bg-slate-200'>
        <div className='text-[24px] font-light'>Ruthin</div>
        <img
          className='w-6 h-6 cursor-pointer'
          src={Logout}
          alt="Logout icon"
          onClick={handleLogout} 
        />
      </div>

      {/* Sidebar Section */}
      <div
        ref={sidebarRef}
        className={`sidebar-section border transition-all duration-1000 flex mt-6 ml-6 ${isSidebarExpanded ? 'w-[80%]' : 'w-fit'} p-4`}
      >
        <ul>
          <li className="mb-4 border-b cursor-pointer hover:text-blue-600" onClick={() => handleClick('employee')}>Employee Information</li>
          <li className="mb-4 border-b cursor-pointer hover:text-blue-600" onClick={() => handleClick('leave')}>Leave Management</li>
          <li className="mb-4 border-b cursor-pointer hover:text-blue-600" onClick={() => handleClick('attendance')}>Attendance</li>
          <li className="mb-4 border-b cursor-pointer hover:text-blue-600" onClick={() => handleClick('payroll')}>Payroll</li>
          <li className="mb-4 border-b cursor-pointer hover:text-blue-600" onClick={() => handleClick('performance')}>Performance Management</li>
          <li className="mb-4 border-b cursor-pointer hover:text-blue-600" onClick={() => handleClick('recruitment')}>Recruitment & Onboarding</li>
          <li className="mb-4 border-b cursor-pointer hover:text-blue-600" onClick={() => handleClick('training')}>Training</li>
          <li className="mb-4 border-b cursor-pointer hover:text-blue-600" onClick={() => handleClick('selfService')}>Self-service</li>
          <li className="mb-4 border-b cursor-pointer hover:text-blue-600" onClick={() => handleClick('document')}>Document</li>
        </ul>

        {/* Show content in expanded sidebar */}
        {isSidebarExpanded && (
          <div className="p-2 items-center m-auto">
            {renderContent()}
          </div>
        )}
      </div>

    </div>
  );
}

export default LogedInSection;
