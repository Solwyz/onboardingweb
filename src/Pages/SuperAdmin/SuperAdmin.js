import React, { useState } from 'react';
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
import Test from '../../Components/Test/Test';



const ResourcePool = () => {
  const [activeSidebar, setActiveSidebar] = useState('Resource Pool'); // Tracks sidebar item

  // Sidebar menu items with corresponding icons
  const sidebarItems = [
    { name: 'Team Planner', icon: TeamPlanner },
    { name: 'Portfolio', icon: Portfolio },
    { name: 'My Schedule', icon: MySchedule },
    { name: 'Resource Pool', icon: ResourcePools },
    { name: 'Project List', icon: ProjectList },
    { name: 'Goal', icon: Goal },
    { name: 'Roadmap', icon: RoadMap },
    { name: 'Reports', icon: Report },
    { name: 'Integration', icon: Integration },
    { name: 'Manage', icon: Manage },
    { name: 'Help', icon: Help }
  ];

  // Handle sidebar switching
  const handleSidebarClick = (section) => {
    setActiveSidebar(section);
  };

  // Function to render the appropriate component based on activeSidebar
  const renderContent = () => {
    switch (activeSidebar) {
      case 'Team Planner':
        return <div><Test/></div>;
      case 'Portfolio':
        return <div>Select a section from the sidebar</div>;
      case 'My Schedule':
        return <div>Select a section from the sidebar</div>;
      case 'Resource Pool':
        return <div>Select a section from the sidebar</div>;
      case 'Project List':
        return <div>Select a section from the sidebar</div>;
      case 'Goal':
        return <div>Select a section from the sidebar</div>;
      case 'Roadmap':
        return <div>Select a section from the sidebar</div>;
      case 'Reports':
        return <div>Select a section from the sidebar</div>;
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-[333px] bg-[#2B2342] text-white p-4 fixed top-0 left-0 h-screen overflow-y-auto">
        <ul className="space-y-4">
          {sidebarItems.map((item) => (
            <li
              key={item.name}
              onClick={() => handleSidebarClick(item.name)}
              className={`py-3 px-4 rounded-[32px] cursor-pointer flex items-center ${
                activeSidebar === item.name ? 'bg-[#655B83]' : ''
              }`}
            >
              <img src={item.icon} alt={`${item.name} Icon`} className="w-6 h-6 mr-4" />
              {item.name}
              <img src={RightArrow} alt="Right Arrow" className="w-4 h-4 ml-auto" />
            </li>
          ))}
        </ul>
        <div></div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 ml-[333px]">
        <h2 className="text-xl font-bold"></h2>
        {/* Render the appropriate content */}
        {renderContent()}
      </main>
    </div>
  );
};

export default ResourcePool;
