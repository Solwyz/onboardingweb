import React, { useState, useEffect } from 'react';
import deleteIcon from '../../../../Assets/Superadmin/delete.svg';  
import arrowIcon from '../../../../Assets/Superadmin/arrow.svg';  
import Api from '../../../../Services/Api';

function Roles({ onBack }) {  
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    description: '',
    roleType: ''
  });

  const [rolesData, setRolesData] = useState([]);
  const [isModified, setIsModified] = useState(false);
  const [employees, setEmployees] = useState([])

  // Enable submit only if all fields are filled
  const isFormValid = formData.name && formData.employeeId && formData.description && formData.roleType;

  const token = localStorage.getItem('token')

  // Load saved roles from localStorage on component mount
  useEffect(() => {
    Api.get('api/employee', {
      'Authorization': `Bearer ${token}`
    })
    .then(response => {
      if(response && response.data) {
        setEmployees(response.data.content)
        console.log('employeeeeee',response.data.content)
      } else {
        console.error('Invalid response data:', response)
        alert('Can not fetch Employees data. Please try again')
      }
      
    })
    // const savedRoles = JSON.parse(localStorage.getItem('RoleData')) || [];
    // setRolesData(savedRoles);
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
    console.log('form data: ',formData);

    Api.post('api/roles',{
      "name": formData.name,
      "roleType": formData.roleType,
      "description": formData.description,
      "user": {
        "id": formData.employeeId
      }
    }, {'Authorization': `Bearer ${token}`})
    .then(response => {
      console.log('role adding response : ',response)
    })

    // Append new form data to the existing roles array
    const updatedRoles = [...rolesData, formData];

    // Save the updated roles array to localStorage
    localStorage.setItem('RoleData', JSON.stringify(updatedRoles));

    // Update state with the new list of roles
    setRolesData(updatedRoles);
    
    // Reset form and isModified state
    setFormData({
      name: '',
      employeeId: '',
      description: '',
      roleType: ''
    });
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
  
            <div>
              <label className="block text-sm font-normal text-[#373737]">Roll type</label>
              <input
                type="text"
                name="roleType"
                className="block w-[247px] h-[48px] border border-[#E6E6E7] text-sm font-normal text-[#696A70] rounded-[8px] mt-[8px] py-2 px-3 focus:outline-none"
                value={formData.roleType}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex gap-4 mt-[24px]">
            <div>
              <label className="block text-sm font-normal text-[#373737]">Employee</label>
              <select
                name="employeeId"
                className="block w-[247px] h-[48px] border border-[#E6E6E7] text-sm font-normal text-[#696A70] rounded-[8px] mt-[8px] py-2 px-3 focus:outline-none"
                value={formData.employeeId}
                onChange={handleInputChange}
              >
                <option value="">Select Employee</option>
                {employees.map((employee,index)=> (
                  <option key={index} value={employee.id}>{employee.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-normal text-[#373737]">description</label>
              <input
                type="text"
                name="description"
                className="block w-[247px] h-[48px] border border-[#E6E6E7] text-sm font-normal text-[#696A70] rounded-[8px] mt-[8px] py-2 px-3 focus:outline-none"
                value={formData.description}
                onChange={handleInputChange} 
              />
            </div>

            
          </div>

          <div className="flex justify-end mt-[24px] mr-[24px] mb-[24px] col-span-2">
            <button
              type="submit"
              disabled={!isFormValid} 
              className={`bg-[#232E42] w-[107px] h-[48px] text-white font-medium px-6 py-2 rounded-[8px] ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Roles;
