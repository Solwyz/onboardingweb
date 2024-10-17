import React, { useState } from 'react';
import SearchIcon from "../../../Assets/Superadmin/search.svg";
import FilterIcon from "../../../Assets/Superadmin/tune.svg";
import AddIcon from "../../../Assets/Superadmin/add.svg";
import Resource from './Resource/Resource';
import Department from './Department/Department';
import Roles from './Roles/Roles';

import Close from '../../../Assets/Superadmin/close.svg'
import ResourceList from './Resource/ResourceList';
import RolesList from './Roles/RolesList';


function ResourcePool() {
  const [activeTab, setActiveTab] = useState('Departments');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [departments, setDepartments] = useState([]);
  const [resources, setResources] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newItem, setNewItem] = useState('');

  const toggleModal = (type = '') => {
    setModalType(type);
    setIsModalOpen(!isModalOpen);
  };

  const handleAddItem = () => {
    if (newItem) {
      if (modalType === 'Department') {
        setDepartments([...departments, newItem]);
      } else if (modalType === 'Resource') {
        setResources([...resources, newItem]);
      } else if (modalType === 'Role') {
        setRoles([...roles, newItem]);
      }
      setNewItem('');
      toggleModal();
    }
  };

  const handleDepartmentBackClick = () => {
    setIsModalOpen(true);  
    setModalType('Department'); 
  };

  const handleRolesBackClick = () => {
    setIsModalOpen(true);  
    setModalType('Role');  
  };
  
  const handleResourcesBackClick = () => {
    setIsModalOpen(true);  
    setModalType('Resource');  
  };

  const renderContent = () => {
    if (activeTab === 'Departments' && departments.length === 0) {
      return <div className="text-center p-4 text-gray-500">No departments added yet.</div>;
    } else if (activeTab === 'Resource' && resources.length === 0) {
      return <div className="text-center p-4 text-gray-500"><ResourceList /></div>;
    } else if (activeTab === 'Roles' && roles.length === 0) {
      return <div className="text-center p-4 text-gray-500"><RolesList/></div>;
    }

    switch (activeTab) {
      case 'Departments':
        return <div className="p-4"><Department onBack={handleDepartmentBackClick} /></div>;
      case 'Resource':
        return <div className="p-4"><Resource onBack={handleResourcesBackClick} /></div>;
      case 'Roles':
        return <div className="p-4"><Roles onBack={handleRolesBackClick} /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="ml-[16px]">
      <div className="flex mt-[16px] h-[48px] bg-white shadow w-[528px] font-normal text-[16px] text-[#080723] justify-start">
        {['Departments', 'Resource', 'Roles'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-4 text-lg ml-[40px] ${activeTab === tab ? 'border-b-2 border-[#857BA3]' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center border-1 mt-4 space-x-2">
        {activeTab === 'Departments' && (
          <button
            onClick={() => toggleModal('Department')}
            className="flex items-center justify-center px-4 py-2 h-[40px] border border-[#6C55B2] text-[#6C55B2] rounded-lg space-x-2"
          >
            <img src={AddIcon} alt="Add" className="w-4 h-4" />
            <span>Add Department</span>
          </button>
        )}
        {activeTab === 'Resource' && (
          <button
            onClick={() => toggleModal('Resource')}
            className="flex items-center justify-center px-4 py-2 h-[40px] border border-[#6C55B2] text-[#6C55B2] rounded-lg space-x-2"
          >
            <img src={AddIcon} alt="Add" className="w-4 h-4" />
            <span>Add Resource</span>
          </button>
        )}
        {activeTab === 'Roles' && (
          <button
            onClick={() => toggleModal('Role')}
            className="flex items-center justify-center px-4 py-2 h-[40px] border border-[#6C55B2] text-[#6C55B2] rounded-lg space-x-2"
          >
            <img src={AddIcon} alt="Add" className="w-4 h-4" />
            <span>Add Role</span>
          </button>
        )}

        <div className="flex flex-1 items-center">
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
        </div>
      </div>

      <div className="mt-4 bg-white">
        {renderContent()}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[504px] px-6 py-4  shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-[16px] font-normal">Add {modalType}</h2>
              <button onClick={toggleModal} className="text-gray-600 hover:text-gray-800"><img src={Close} alt="" /></button>
            </div>

            <div className="mt-10">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder={`Enter ${modalType}`}
                className="w-full px-4 py-2 border border-gray-300  focus:outline-none"
              />
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={toggleModal}
                className="mr-4 px-4 py-2 text-gray-700 border text-[14px] font-normal border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 text-white text-[14px] font-normal bg-[#6C55B2] rounded-md hover:bg-[#553c8b]"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResourcePool;
