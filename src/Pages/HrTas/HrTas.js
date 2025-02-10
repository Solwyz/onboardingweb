import React, { useEffect, useState } from 'react';
import Home from "../../Assets/HrTas/group.svg";
import EmployeeIcon from "../../Assets/HrTas/person.svg";
import ExpenseClaim from "../../Assets/HrTas/Frame (4).svg";
import LeaveIcon from "../../Assets/HrTas/Frame.svg";
import Attendance from "../../Assets/HrTas/Group (1).svg";
import DocumentIcon from "../../Assets/HrTas/lab_profile.svg";
import PerfomanceIcon from "../../Assets/HrTas/trending_up.svg";
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
import Document from '../../Components/HrTAScomponent/Document/Document';
import Leave from '../../Components/HrTAScomponent/Leave/Leave';
import TimeSheet from '../../Components/HrTAScomponent/TimeSheet/TimeSheet';
import Recruitment from '../../Components/HrTAScomponent/Recruitment/Recruitment';

import Perfomance from '../../Components/HrTAScomponent/Perfomance/Perfomance';

import People from '../../Components/HrTAScomponent/People/People';
import HelpPage from '../../Components/HrTAScomponent/help/HelpPage';
import Api from '../../Services/Api';

const token = localStorage.getItem('token');
const refreshToken = localStorage.getItem('refreshToken');


function HrTas() {
  const [activeSidebar, setActiveSidebar] = useState('Home');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const sidebarItems = [
    { name: 'Home', icon: Home },
    { name: 'Employee', icon: EmployeeIcon },
    // { name: 'Expense Claim', icon: ExpenseClaim },
    { name: 'Leave', icon: LeaveIcon },
    { name: 'Time Sheet', icon: Attendance },
    { name: 'Document', icon: DocumentIcon },
    { name: 'Perfomance', icon: PerfomanceIcon },
    { name: 'People', icon: Team },
  
    { name: 'Recruitment', icon: Employer },
    // { name: 'User Guide', icon: UserGuide },
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
      // case 'Expense Claim':
      //   return <div>My Schedule</div>;
      case 'Resource Pool':
        return <div>Resource Pool</div>
      case 'Leave':
        return <div><Leave/></div>;
      case 'Time Sheet':
        return <div><TimeSheet/></div>;
      case 'Document':
        return <div><Document/></div>;
      case 'Perfomance':
        return <div><Perfomance/></div>;
      case 'People':
        return <div><People/></div>;
   
      case 'Recruitment':
        return <div><Recruitment/></div>;
      // case 'User Guide':
      //   return <div>Report</div>;
      case 'Help':
        return <div><HelpPage/></div>;
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  const callRefreshToken =()=> {
    console.log('refresh token of HR-TAS called at:', new Date().toLocaleTimeString());
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
        window.location.href = '/'
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
  },[token]);

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
