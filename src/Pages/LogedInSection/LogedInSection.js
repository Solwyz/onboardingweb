import React, { useState } from 'react';

import Employee from "../../Assets/hrm/person.svg"
import Leave from "../../Assets/hrm/Frame.svg"
import Attendance from "../../Assets/hrm/Frame (1).svg"
import Payroll from "../../Assets/hrm/payments.svg"
import Performance from "../../Assets/hrm/bar_chart.svg"
import Recruitment from "../../Assets/hrm/person_add.svg"
import Training from "../../Assets/hrm/network_node.svg"
import SelfService from "../../Assets/hrm/bookmark_manager.svg"
import Document  from "../../Assets/hrm/add_notes.svg"

import RightArrow from "../../Assets/Superadmin/arrow_forward_ios.svg";

import LeftArrow from '../../Assets/Superadmin/arrow_left.svg';

import Header from '../../Components/SuperAdminComponents/Header/Header';


import LeaveManagement from '../../Components/DashboardComponents/LeaveManagement/LeaveManagement';
import EmployeeInformation from '../../Components/DashboardComponents/EmployeeInformation/EmployeeInformation';
import AttendanceManagement from '../../Components/DashboardComponents/AttendanceManagement/AttendanceManagement';

import PerformanceManagement from '../../Components/DashboardComponents/PerformanceManagement/PerformanceManagement';

import PayrollManagment from '../../Components/DashboardComponents/PayRollManagement/PayrollManagment';


function LogedInSection() {
  const [activeSidebar, setActiveSidebar] = useState('Home');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const sidebarItems = [
    { name: 'employee', icon: Employee },
    { name: 'leave', icon: Leave },
    // { name: 'Expense Claim', icon: ExpenseClaim },
    { name: 'attendance', icon: Attendance },
    { name: 'payroll', icon: Payroll },
    { name: 'performance', icon: Performance},
    { name: 'recruitment', icon: Recruitment },
    { name: 'training', icon: Training },
  
    { name: 'selfService', icon: SelfService },
    { name: 'document', icon: Document },
    
  ];


  const handleSidebarClick = (section) => {
    setActiveSidebar(section);
  };


  const renderContent = () => {
    switch (activeSidebar) {
      case 'employee':
        return <EmployeeInformation />;
      case 'leave':
        return <LeaveManagement />;
      case 'attendance':
        return <div><AttendanceManagement/></div>;
      case 'payroll':
        return <div><PayrollManagment/></div>;
      case 'performance':
        return <div><PerformanceManagement/></div>;
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
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <aside className={`transition-all duration-300 ${isSidebarExpanded ? 'w-[333px]' : 'w-[90px]'} bg-[#2B2342] text-white p-4 h-full`}>
          <ul className="space-y-3">
            {sidebarItems.map((item) => (
              <li
                key={item.name}
                onClick={() => handleSidebarClick(item.name)}
                className={`py-3 px-4 rounded-[32px] cursor-pointer flex items-center ${activeSidebar === item.name ? 'bg-[#655B83]' : ''}`}
              >
                <img src={item.icon} alt={`${item.name} Icon`} className="w-6 h-6 mr-4" />
                {isSidebarExpanded && <span>{item.name}</span>}
                {isSidebarExpanded && <img src={RightArrow} alt="Right Arrow" className="w-4 h-4 ml-auto" />}
              </li>
            ))}
          </ul>
          <div onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} className="cursor-pointer mt-[50px] ml-6">
            {isSidebarExpanded ? (
              <img src={LeftArrow} alt="Collapse Sidebar" />
            ) : (
              <img src={RightArrow} alt="Expand Sidebar" />
            )}
          </div>
        </aside>

   
        <main className={`flex-1  overflow-y-auto transition-all bg-[#F9F9FB] duration-300 ${isSidebarExpanded ? '' : 'ml-[80px]'}`}>
          <h2 className="text-xl font-bold"></h2>
          {renderContent()}
        
       
        </main>
      </div>
    </div>
  );
}

export default LogedInSection;
