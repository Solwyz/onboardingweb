import React, { useState } from 'react';
import deleteIcon from '../../../../Assets/Superadmin/delete.svg';  
import arrowIcon from '../../../../Assets/Superadmin/arrow.svg';  

function Roles({ onBack }) {  
 
  const [formData, setFormData] = useState({
    name: '',
    resourceManager: '',
    department: '',
    office: '',
    valueStream: ''
  });

  const [isModified, setIsModified] = useState(false); 

  // Handles input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setIsModified(true);
  };

  // Handles form submission and saves data to localStorage
  const handleSubmit = (event) => {
    // Prevent page reload on form submission

    // Save the current form data to localStorage, replacing previous data
    localStorage.setItem('RoleData', JSON.stringify([formData]));

    console.log('Form data saved:', formData);

    // Reset the isModified state
    setIsModified(false);
  };

  return (
    <div className="p-4 ml-[16px]">
      <div className="flex text-[20px] font-normal mt-[24px]">
        <a href="#" className="text-[#498EF6]">Resource Pool</a> 
        <img src={arrowIcon} className='ml-[10px]' alt="icon1" /> 
        <span className='ml-[8px]'>Role</span>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button className="text-[#E94E4E] text-[14px] font-normal flex">
          <img src={deleteIcon} alt="icon2" />
          Delete Role
        </button>
        <div className="mt-6 justify-end">
          <button 
            onClick={onBack}  
            className="font-normal text-[16px] text-[#3003BB]">
            Back
          </button>
        </div>
      </div>

      <div className="bg-white w-auto h-auto mt-[16px] shadow-lg p-[24px] rounded-lg"> 
        <h1 className="text-lg font-semibold">General</h1>
        
        <form onSubmit={handleSubmit} className="mt-[36px]">
          <div className='flex gap-4'>
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#373737]">Name</label>
              <input
                type="text"
                name="name"
                className="block w-[247px] h-[48px] border border-[#E6E6E7] rounded-[8px] text-sm font-normal text-[#696A70] mt-[8px] py-2 px-3 focus:outline-none"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#373737]">Resource Manager</label>
              <select
                name="resourceManager"
                className="block w-[247px] h-[48px] border border-[#E6E6E7] text-sm font-normal text-[#696A70] rounded-[8px] mt-[8px] py-2 px-3 focus:outline-none"
                value={formData.resourceManager}
                onChange={handleInputChange} 
              >
                <option value="Arjun Das">Arjun Das</option>
                <option value="Sharma">Sharma</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-[24px]">
            <div>
              <label className="block text-sm font-normal text-[#373737]">Department</label>
              <select
                name="department"
                className="block w-[247px] h-[48px] border border-[#E6E6E7] text-sm font-normal text-[#696A70] rounded-[8px] mt-[8px] py-2 px-3 focus:outline-none"
                value={formData.department}
                onChange={handleInputChange}
              >
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-normal text-[#373737]">Office</label>
              <input
                type="text"
                name="office"
                className="block w-[247px] h-[48px] border border-[#E6E6E7] text-sm font-normal text-[#696A70] rounded-[8px] mt-[8px] py-2 px-3 focus:outline-none"
                value={formData.office}
                onChange={handleInputChange} 
              />
            </div>

            <div>
              <label className="block text-sm font-normal text-[#373737]">Value Stream</label>
              <input
                type="text"
                name="valueStream"
                className="block w-[247px] h-[48px] border border-[#E6E6E7] text-sm font-normal text-[#696A70] rounded-[8px] mt-[8px] py-2 px-3 focus:outline-none"
                value={formData.valueStream}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex justify-end mt-[24px] mr-[24px] mb-[24px] col-span-2">
            <button
              type="submit"
              disabled={!isModified} 
              className={`bg-[#232E42] w-[107px] h-[48px] text-white font-medium px-6 py-2 rounded-[8px] ${!isModified ? 'opacity-50 cursor-not-allowed' : ''}`}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Roles;
