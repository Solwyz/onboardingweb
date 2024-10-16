import React from 'react'
import deleteIcon from '../../../../Assets/Superadmin/delete.svg';  
import arrowIcon from '../../../../Assets/Superadmin/arrow.svg';  

function Roles() {
  return (
    <div className="p-4  ">
      <div className="flex text-sm font-semibold ">
        <a href="#" className="hover:underline text-[#498EF6]">Resource Pool</a> <img src={arrowIcon} alt="icon1" /> <span>Role</span>
      </div>


      <div className="flex justify-between items-center mt-6">

        <button className="text-red-500 text-sm flex  hover:underline">
        <img src={deleteIcon} alt="icon2" />

          Delete Role
        </button>
        <div className="mt-6">
          <button className="text-blue-500 text-sm hover:underline">Back</button>
        </div>
      </div>


      <div className="bg-white max-w-full h-[280px] mt-[16px]  shadow-lg "> 
       <h1 className="text-lg mt-[24px] ml-[24px] font-semibold">General</h1>
       <form className="grid grid-cols-2 gap-6">
      
        <div className='ml-[24px] mt-[36px]'>
          <label className="block text-sm font-medium text-gray-700 ">Name</label>
          <input
            type="text"
            className="block w-[250px] border rounded-[8px] mt-[8px]  py-2 px-3 focus:outline-none "
            value="India"
            readOnly
          />
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Resource Manager</label>
          <select className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option>Arjun Das</option>
         
          </select>
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
          <select className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option>Development</option>
          
          </select>
        </div>

     
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Office</label>
          <input
            type="text"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value="India"
            readOnly
          />
        </div>

      
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Value Stream</label>
          <input
            type="text"
            className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value="India"
            readOnly
          />
        </div>
      </form>
      </div>


    </div>
  )
}

export default Roles
