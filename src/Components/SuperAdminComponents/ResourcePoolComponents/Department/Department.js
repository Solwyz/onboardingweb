import React, { useState, useEffect } from 'react';
import deleteIcon from '../../../../Assets/Superadmin/delete.svg';
import arrowIcon from '../../../../Assets/Superadmin/arrow.svg';
import DepartmentList from './DepartmentList';
import Api from '../../../../Services/Api';

function Department({ onBack }) {


  const [formData, setFormData] = useState({
    department: '',
    name: '',
    resourceManager: '',
    office: '',
    valueStream: ''
  });

  const token = localStorage.getItem('token')

  const [departmentData, setDepartmentData] = useState([]);
  const [isModified, setIsModified] = useState(false);

  // Enable submit only if all fields are filled
  const isFormValid = formData.name && formData.resourceManager && formData.office && formData.valueStream;

  // Load saved departments from localStorage on component mount
  useEffect(() => {
    const savedDepartment = JSON.parse(localStorage.getItem('DepartmentData')) || [];
    setDepartmentData(savedDepartment);
  }, []);

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
    
    event.preventDefault();

    Api.post('api/department',{
      "departmentName": formData.name,
      "createdBy": formData.resourceManager
    },
    {'Authorization': `Bearer ${token}`})
    .then(response => {
      console.log(response)
    })
  

    //  Api.post('api/department',
    //   {
    //     "departmentName": "addedNew dep"
    //   },
    //    {
    //   'Authorization': `Bearer ${token}`
    //  })
    //  .then(response => {
      
    //  })





    // Prevent the default form submission

    // Append new form data to the existing department array
    const updatedDepartment = [...departmentData, formData];

    // Save the updated department array to localStorage
    localStorage.setItem('DepartmentData', JSON.stringify(updatedDepartment));

    // Update state with the new list of departments
    setDepartmentData(updatedDepartment);

    // Reset form and isModified state
    setFormData({
      department: '',
      name: '',
      resourceManager: '',
      office: '',
      valueStream: ''
    });
    setIsModified(false);
  };

  return (
    <div className="p-4 ml-[16px]">
      <div className="flex text-[20px] font-normal mt-[24px]">
        <a href="#" className="text-[#498EF6]">Resource Pool</a>
        <img src={arrowIcon} className='ml-[10px]' alt="icon1" />
        <span className='ml-[8px]'>Department</span>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex">
          <button className="text-[#E94E4E] text-[14px] font-normal flex">
            <img src={deleteIcon} alt="icon2" />
            Delete Department
          </button>
        </div>
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
            {/* <div className="mb-4">
              <label className="block text-sm font-normal text-[#373737]">Department</label>
              <input
                type="text"
                name="name"
                className="block w-[247px] h-[48px] border border-[#E6E6E7] rounded-[8px] text-sm font-normal text-[#696A70] mt-[8px] py-2 px-3 focus:outline-none"
                value={formData.department}
                onChange={handleInputChange}
              />
            </div> */}

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
                <option value="">Select Manager</option>
                <option value="Arjun Das">Arjun Das</option>
                <option value="Sharma">Sharma</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-[24px]">
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
              disabled={!isFormValid}
              className={`bg-[#232E42] w-[107px] h-[48px] text-white font-medium px-6 py-2 rounded-[8px] ${(!isFormValid) ? 'opacity-50 cursor-not-allowed' : ''}`}>
              Submit
            </button>
          </div>
        </form>
      </div>


    </div>
  );
}

export default Department;
