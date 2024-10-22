import React, { useState } from 'react';
import Home from "../../Assets/HrTas/group.svg";
import EmployeeIcon from "../../Assets/HrTas/person.svg";
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

import Employee from '../../Components/HrTAScomponent/Employee/Employee';

import HomePage from '../../Components/HrTAScomponent/HomePage/HomePage';
import Header from '../../Components/SuperAdminComponents/Header/Header';
import SalaryDetailsForm from '../../Components/HrTAScomponent/Employee/EmployeeAddForms/SalaryDetailsForm';

function HrTas() {
  const [activeSidebar, setActiveSidebar] = useState('Resource Pool');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const sidebarItems = [
    { name: 'Home', icon: Home },
    { name: 'Employee', icon: EmployeeIcon },
    { name: 'Expense Claim', icon: ExpenseClaim },
    { name: 'Leave', icon: Leave },
    { name: 'Attendance', icon: Attendance },
    { name: 'Document', icon: Document },
    { name: 'Incident', icon: Incident },
    { name: 'People', icon: Team },
  
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
        return <div><HomePage/></div>;
      case 'Employee':
        return <div><Employee/></div>;
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
      case 'People':
        return <div>Goal</div>;
   
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
  )
}

export default HrTas
