import React, { useState } from 'react';
import SearchIcon from "../../../Assets/Superadmin/search.svg";
import FilterIcon from "../../../Assets/Superadmin/tune.svg";
import AddIcon from "../../../Assets/Superadmin/add.svg";
import Resource from './Resource/Resource';
import Department from './Department/Department';
import Roles from './Roles/Roles';
import ResourceList from './Resource/ResourceList';
import RolesList from './Roles/RolesList';
import DepartmentList from './Department/DepartmentList';

function ResourcePool() {
  const [activeTab, setActiveTab] = useState('Departments');
  const [showForm, setShowForm] = useState(false); // Controls form visibility

  const handleAddClick = () => {
    setShowForm(true); // Show form when "Add" is clicked
  };

  const handleBackClick = () => {
    setShowForm(false); // Go back to list
  };

  const renderContent = () => {
    if (activeTab === 'Departments') {
      return showForm ? (
        <Department onBack={handleBackClick} />
      ) : (
        <DepartmentList />
      );
    } else if (activeTab === 'Designation') {
      return showForm ? (
        <Roles onBack={handleBackClick} />
      ) : (
        <RolesList />
      );
    } else if (activeTab === 'Resource') {
      return <ResourceList />;
    }
    return null;
  };

  return (
    <div className="ml-[16px]">
      {/* Tabs for Departments and Roles */}
      <div className="flex mt-[16px] h-[48px] bg-white shadow w-[528px] font-normal text-[16px] text-[#080723] justify-start">
        {['Departments', 'Designation'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setShowForm(false); // Reset form visibility on tab change
            }}
            className={`p-4 text-lg ml-[40px] ${activeTab === tab ? 'border-b-2 border-[#857BA3]' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Actions: Add Button, Search, and Filter */}
      <div className="flex items-center border-1 mt-4 space-x-2">
        {!showForm && (
          <>
            {(activeTab === 'Departments' || activeTab === 'Designation') && (
              <button
                onClick={handleAddClick}
                className="flex items-center justify-center px-4 py-2 h-[40px] border border-[#6C55B2] text-[#6C55B2] rounded-lg space-x-2"
              >
                <img src={AddIcon} alt="Add" className="w-4 h-4" />
                <span>{activeTab === 'Departments' ? "Add Department" : "Add Designation"}</span>
              </button>
            )}
          </>
        )}

        {/* <div className="flex flex-1 items-center">
          <div className="flex items-center relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-4 pr-10 py-2 border border-[#6C55B2] placeholder-[#6C55B2] rounded-lg focus:outline-none h-[40px] w-[138px]"
            />
            <img
              src={SearchIcon}
              alt="Search"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6C55B2]"
            />
          </div>

          <button className="flex items-center justify-center px-4 py-2 h-[40px] w-[138px] ml-[8px] border border-[#6C55B2] text-[#6C55B2] rounded-lg">
            <span>Filter</span>
            <img src={FilterIcon} alt="Filter" className="ml-[57px]" />
          </button>
        </div> */}
      </div>

      {/* Content Section (List or Form) */}
      <div className="mt-4 bg-white">
        {renderContent()}
      </div>
    </div>
  );
}

export default ResourcePool;
