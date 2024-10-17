import React, { useState } from 'react'
import SearchIcon from "../../../Assets/Superadmin/search.svg"
import FilterIcon from "../../../Assets/Superadmin/tune.svg"
import AddIcon from "../../../Assets/Superadmin/add.svg"
import Resource from './Resource/Resource';


function ResourcePoool() {

  const [activeTab, setActiveTab] = useState('Departments');

  const renderContent = () => {
    switch (activeTab) {
      case 'Departments':
        return <div className="p-4 ">Departments Component</div>;
      case 'Resource':
        return <div className="py-4"><Resource /></div>;
      case 'Roles':
        return <div className="p-4">Roles Component</div>;
      default:
        return null;
    }
  }
  return (
    <div className="ml-[16px]">

      <div className="flex mt-[16px] h-[48px] bg-white shadow  w-[528px] font-normal text-[16px] text-[#080723] justify-start ">
        {['Departments', 'Resource', 'Roles'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-4 text-lg ml-[40px] ${activeTab === tab ? 'border-b-2 border-[#857BA3]' : ''
              }`}
          >
            {tab}
          </button>
        ))}
      </div>



      <div className="flex items-center border-1 mt-4 space-x-4">
        <button className="flex items-center justify-center px-4 py-2  h-[40px] border border-[#6C55B2] text-[#6C55B2] rounded-lg space-x-2">
          <img src={AddIcon} alt="" className="w-4 h-4" />
          <span>Add department</span>
        </button>

        <div className="flex flex-1 items-center">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border border-[#6C55B2] placeholder-[#6C55B2] rounded-lg  focus:outline-none h-[40px]"

          />


          <button className="flex items-center justify-center px-4 py-2  h-[40px] w-[138px] ml-[8px] border border-[#6C55B2] text-[#6C55B2] rounded-lg ">
            <span>Filter</span>
            <img src={FilterIcon} alt="" className=" ml-[57px]" />
          </button>
        </div>
      </div>




      <div className="mt-4  bg-white">
        {renderContent()}
      </div>

    </div>
  )
}

export default ResourcePoool