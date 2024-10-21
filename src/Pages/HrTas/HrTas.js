import React, { useState } from 'react';
import Home from "../../Assets/HrTas/group.svg";
import Employee from "../../Assets/HrTas/person.svg";
import ExpenseClaim from "../../Assets/HrTas/Frame (4).svg";
import Leave from "../../Assets/HrTas/Frame.svg";
import Attendance from "../../Assets/HrTas/Group (1).svg";
import Document from "../../Assets/HrTas/lab_profile.svg";
import Incident from "../../Assets/HrTas/Frame (1).svg";
import Team from "../../Assets/HrTas/Frame (2).svg";
import Payroll from "../../Assets/HrTas/payments.svg";
import Employer from "../../Assets/HrTas/Group (2).svg";
import UserGuide from "../../Assets/HrTas/Frame (3).svg";
import Help from "../../Assets/Superadmin/info.svg";
import RightArrow from "../../Assets/Superadmin/arrow_forward_ios.svg";

import LeftArrow from '../../Assets/Superadmin/arrow_left.svg';
import ResourcePoool from '../../Components/SuperAdminComponents/ResourcePoolComponents/ResourcePool';

function HrTas() {
  const [activeSidebar, setActiveSidebar] = useState('Resource Pool');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const sidebarItems = [
    { name: 'Home', icon: Home },
    { name: 'Employee', icon: Employee },
    { name: 'Expense Claim', icon: ExpenseClaim },
    { name: 'Leave', icon: Leave },
    { name: 'Attendance', icon: Attendance },
    { name: 'Document', icon: Document },
    { name: 'Incident', icon: Incident },
    { name: 'Team', icon: Team },
    { name: 'Payroll', icon: Payroll },
    { name: 'Employer', icon: Employer },
    { name: 'User Guide', icon: UserGuide },
    { name: 'Help', icon: Help }
  ];


  const handleSidebarClick = (section) => {
    setActiveSidebar(section);
  };

  const renderContent = () => {
    switch (activeSidebar) {
      case 'Home':
        return <div>Home page</div>;
      case 'Employee':
        return <div>Portfolio</div>;
      case 'Expense Claim':
        return <div>My Schedule</div>;
      case 'Resource Pool':
        return <div>Resource Pool</div>
      case 'Leave':
        return <div>Project List</div>;
      case 'Attendance':
        return <div>Goal</div>;
      case 'Document':
        return <div>Roadmap</div>;
      case 'Incident':
        return <div>Report</div>;
      case 'Team':
        return <div>Goal</div>;
      case 'Payroll':
        return <div>Roadmap</div>;
      case 'Employer':
        return <div>Report</div>;
      case 'User Guide':
        return <div>Report</div>;
      case 'Help':
        return <div>Report</div>;
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <div className="flex h-screen">

      <aside className={`transition-all duration-300 ${isSidebarExpanded ? 'w-[333px]' : 'w-[90px]'} bg-[#2B2342] text-white p-4 fixed top-0 left-0 h-screen overflow-y-auto`}>
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
        <div onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} className="cursor-pointer mt-[110px] ml-6">
          {isSidebarExpanded ? (
            <img src={LeftArrow} alt="Collapse Sidebar" />
          ) : (
            <img src={RightArrow} alt="Expand Sidebar" />
          )}
        </div>
      </aside>


      <main className={`flex-1 p-4 transition-all duration-300 ${isSidebarExpanded ? 'ml-[333px]' : 'ml-[80px]'}`}>
        <h2 className="text-xl font-bold"></h2>

        {renderContent()}
      </main>
    </div>
  )
}

export default HrTas
