import React, { useEffect, useState } from 'react';

import Employee from "../../Assets/hrm/person.svg"
import Leave from "../../Assets/hrm/Frame.svg"
import Attendance from "../../Assets/hrm/Frame (1).svg"
import Payroll from "../../Assets/hrm/payments.svg"
import Performance from "../../Assets/hrm/bar_chart.svg"
import Recruitment from "../../Assets/hrm/person_add.svg"
import Training from "../../Assets/hrm/network_node.svg"
import SelfService from "../../Assets/hrm/bookmark_manager.svg"
import Document from "../../Assets/hrm/add_notes.svg"

import RightArrow from "../../Assets/Superadmin/arrow_forward_ios.svg";

import LeftArrow from '../../Assets/Superadmin/arrow_left.svg';

import Header from '../../Components/SuperAdminComponents/Header/Header';


import LeaveManagement from '../../Components/DashboardComponents/LeaveManagement/LeaveManagement';
import EmployeeInformation from '../../Components/DashboardComponents/EmployeeInformation/EmployeeInformation';
import AttendanceManagement from '../../Components/DashboardComponents/AttendanceManagement/AttendanceManagement';

import PerformanceManagement from '../../Components/DashboardComponents/PerformanceManagement/PerformanceManagement';

import PayrollManagment from '../../Components/DashboardComponents/PayRollManagement/PayrollManagment';
import Api from '../../Services/Api';

const token = localStorage.getItem('token');
const refreshToken = localStorage.getItem('refreshToken');


function LogedInSection() {
  const [activeSidebar, setActiveSidebar] = useState('Employer Information');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const sidebarItems = [
    { name: 'Employer Information', icon: Employee },
    { name: 'Leave Management', icon: Leave },
    // { name: 'Expense Claim', icon: ExpenseClaim },
    { name: 'Attendance', icon: Attendance },
    { name: 'Payroll', icon: Payroll },
    { name: 'Perfomance Management', icon: Performance },
    // { name: 'Recruiting and Onboarding', icon: Recruitment },
    // { name: 'Training', icon: Training },
    // { name: 'Self-Service', icon: SelfService },
    // { name: 'Document Management', icon: Document },

  ];


  const handleSidebarClick = (section) => {
    setActiveSidebar(section);
  };


  const renderContent = () => {
    switch (activeSidebar) {
      case 'Employer Information':
        return <EmployeeInformation />;
      case 'Leave Management':
        return <LeaveManagement />;
      case 'Attendance':
        return <div><AttendanceManagement /></div>;
      case 'Payroll':
        return <div><PayrollManagment /></div>;
      case 'Perfomance Management':
        return <div><PerformanceManagement /></div>;
      case 'Recruiting and Onboarding':
        return <div>Details about Recruitment & Onboarding...</div>;
      case 'Training':
        return <div>Details about Training...</div>;
      case 'Self-Service':
        return <div>Details about Self-service...</div>;
      case 'Document Management':
        return <div>Details about Document Management...</div>;
      default:
        return <div><EmployeeInformation /></div>;
    }
  };

  const callRefreshToken =()=> {
    console.log('refresh token of HRM called at:', new Date().toLocaleTimeString());
    Api.post('api/auth/refreshtoken', {
      "refreshToken": refreshToken
    })
    .then(response => {
      console.log('refresh token response:', response)
      if(response && response.data) {
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        return true;
      } else {
        return false;
      }
    })
  }

  useEffect(() => {
    if(token) {
      callRefreshToken();
      const interval = setInterval(callRefreshToken, 600000);
      return () => clearInterval(interval);
    }
  },[token])

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <aside className={`transition-all duration-300 font-normal ${isSidebarExpanded ? 'w-[333px]' : 'w-[90px]'} bg-[#2B2342] text-white p-4 h-full`}>
          <ul className="space-y-4">
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
