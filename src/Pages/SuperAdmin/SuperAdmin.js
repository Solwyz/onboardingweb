import React, { useEffect, useState } from 'react';
import TeamPlanner from "../../Assets/Superadmin/group.svg";
import Portfolio from "../../Assets/Superadmin/person.svg";
import MySchedule from "../../Assets/Superadmin/Frame.svg";
import ResourcePools from "../../Assets/Superadmin/library_add.svg";
import ProjectList from "../../Assets/Superadmin/folder_data.svg";
import Goal from "../../Assets/Superadmin/send.svg";
import RoadMap from "../../Assets/Superadmin/moving.svg";
import Report from "../../Assets/Superadmin/lab_profile.svg";
import Integration from "../../Assets/Superadmin/integration_instructions.svg";
import Manage from "../../Assets/Superadmin/manage_history.svg";
import Help from "../../Assets/Superadmin/info.svg";
import RightArrow from "../../Assets/Superadmin/arrow_forward_ios.svg";
import LeftArrow from '../../Assets/Superadmin/arrow_left.svg';
import ResourcePoool from '../../Components/SuperAdminComponents/ResourcePoolComponents/ResourcePool';
import Header from '../../Components/SuperAdminComponents/Header/Header';
import TeamPlanerComponent from '../../Components/SuperAdminComponents/TeamPlaner/TeamPlanerComponent';
import PortfolioComponent from '../../Components/SuperAdminComponents/PortfolioComponent/PortfolioComponent';
import MyScheduleComponent from '../../Components/SuperAdminComponents/MyScheduleComponent/MyScheduleComponent';
import ProjectListComponent from '../../Components/SuperAdminComponents/ProjectListComponent/ProjectListComponent';
import GoalComponent from '../../Components/SuperAdminComponents/GoalComponent/GoalComponent';
import RoadmapComponent from '../../Components/SuperAdminComponents/RoadmapComponent/RoadmapComponent';
import ReportComponet from '../../Components/SuperAdminComponents/ReportComponent/ReportComponet';
import IntegrationComponent from '../../Components/SuperAdminComponents/IntegrationComponent/IntegrationComponent';
import ManageComponent from '../../Components/SuperAdminComponents/MangeComponent/ManageComponent';
import HelpComponent from '../../Components/SuperAdminComponents/HelpComponent/HelpComponent';
import { useNavigate } from 'react-router-dom';
import Api from '../../Services/Api';

const token = localStorage.getItem('token');
const refreshToken = localStorage.getItem('refreshToken')

const SuperAdmin = () => {
  const [activeSidebar, setActiveSidebar] = useState('Team Planner');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const navigate = useNavigate();
  

  const sidebarItems = [
    { name: 'Team Planner', icon: TeamPlanner },
    { name: 'Portfolio', icon: Portfolio },
    // { name: 'My Schedule', icon: MySchedule },
    { name: 'Resource Pool', icon: ResourcePools },
    // { name: 'Project List', icon: ProjectList },
    // { name: 'Goal', icon: Goal },
    // { name: 'Roadmap', icon: RoadMap },
    // { name: 'Reports', icon: Report },
    // { name: 'Integration', icon: Integration },
    // { name: 'Manage', icon: Manage },
    // { name: 'Help', icon: Help }
  ];

  const handleSidebarClick = (section) => {
    setActiveSidebar(section);
  };

  const renderContent = () => {
    switch (activeSidebar) {
      case 'Team Planner':
        return <div><TeamPlanerComponent /></div>;
      case 'Portfolio':
        return <div><PortfolioComponent /></div>;
      case 'My Schedule':
        return <div><MyScheduleComponent /></div>;
      case 'Resource Pool':
        return <div><ResourcePoool /></div>;
      case 'Project List':
        return <div><ProjectListComponent /></div>;
      case 'Goal':
        return <div><GoalComponent /></div>;
      case 'Roadmap':
        return <div><RoadmapComponent /></div>;
      case 'Reports':
        return <div><ReportComponet /></div>;
      case 'Integration':
        return <div><IntegrationComponent/></div>;
      case 'Manage':
        return <div><ManageComponent/></div>;
      case 'Help':
        return <div><HelpComponent/></div>;


    }
  };

  const callRefreshToken =()=> {
    console.log('refresh token called at:', new Date().toLocaleTimeString());
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
    const token = localStorage.getItem('token');
    if(!token) {
      navigate("/")
    }
  },[navigate]);

  useEffect(() => {
    if(token) {
      callRefreshToken();
      const interval = setInterval(callRefreshToken,600000);
      return () => clearInterval(interval);
    }
  },[token]);

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <aside className={`transition-all duration-300 ${isSidebarExpanded ? 'w-[242px]' : 'w-[90px]'} bg-[#2B2342] text-white p-4 h-full`}>
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


        <main className={`flex-1 p-4 overflow-y-auto transition-all bg-[#F9F9FB] duration-300 ${isSidebarExpanded ? '' : 'ml-[80px]'}`}>
          <h2 className="text-xl font-bold"></h2>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default SuperAdmin;
