<<<<<<< Updated upstream
import React, { createContext, useState } from 'react'
import BasicDetailsForm from './EmployeeAddForms/BasicDetailsForm';

export const employeeContext = createContext();

export default function Employee() {

    const [showBasicForm, setShowBasicForm] = useState(false)
    

    const handeleAddEmployeeClick = () => {
        setShowBasicForm(true)
    }

    return (
        <employeeContext.Provider value={{ showBasicForm, setShowBasicForm }}>
            <div>
            {!showBasicForm ? 
                <div className='bg-yellow-50 px-6 py-8'>
                    <div className='flex justify-between'>
                        <div>All employees</div>
                        <div><button className='border p-3 rounded-lg bg-blue-900 text-white font-medium hover:bg-blue-700 duration-1000'
                            onClick={handeleAddEmployeeClick}>Add Employee</button></div>
                    </div>
                </div>
                : <BasicDetailsForm/> 
            }
            </div>
        </employeeContext.Provider>
    )
}
=======
import React from 'react'
import addIcon from '../../../Assets/HrTas/addIcon.svg'
import deleteIcon from '../../../Assets/HrTas/delete.svg'
import editIcon from '../../../Assets/HrTas/edit.svg'
import searchIcon from '../../../Assets/HrTas/searchIcon.svg'
import filterIcon from '../../../Assets/HrTas/filterIcon.svg'

function Employee() {

  const employees = [
    { id: 1, name: "Aswin Raj", empId: "T15462566", role: "Frontend Developer", department: "Development", location: "Dubai", contact: "965 966 2546" },
    { id: 2, name: "Aswin Raj", empId: "T15462566", role: "Frontend Developer", department: "Development", location: "Dubai", contact: "965 966 2546" },
    // Add more entries as needed
  ];
  return (
    <div className="container p-6 shadow-lg bg-white w-auto mx-auto  ">
      <div className="flex justify-between items-center ">
        <h2 className="text-[20px] text-[#232E42] font-medium mt-[40px]">All employees</h2>
        <button className="bg-[#2B2342] flex items-center w-[149px] h-[48px] font-normal text-sm  mt-[24px] text-white px-4 py-2 rounded-lg">
          <img src={addIcon} className='mr-[8px]' alt="" />
          Add Employee
        </button>
      </div>

      <div className="flex mt-[34px]">
        <input

          type="text"
          placeholder="Search Employee"
          className="border px-[16px] py-[15px] rounded-lg w-[584px] h-[48px] focus:outline-none text-[#696A70] text-sm font-normal border-[#E6E6E7]"
        />
        <button className="ml-4 w-[90px] flex items-center h-[48px] border border-[#E6E6E7] px-4 py-[7px] text-sm text-[#2C2B2B] font-normal rounded-lg">
          <img src={filterIcon} alt="" className='mr-[8px]' />    Filter
        </button>
      </div>
      <div className="flex justify-end mt-4">
        <button className="h-[30px] w-[94px] flex items-center text-[#FF0000] text-sm font-normal px-4 py-[7px] rounded-[4px] border border-[#FC4545] ">
          <img src={deleteIcon} alt="" className='mr-[8px]' /> Delete
        </button>
      </div>

      <div className="overflow-x-auto mt-[16px]">
        <table className="w-full bg-white rounded-lg   ">
          <thead className="bg-[#465062] h-[50px] text-white   border-b">
            <tr>
              <th className="p-4 text-left ">
                <input type="checkbox" />
              </th>
              <th className="p-4 font-normal text-sm  text-left">S No.</th>
              <th className="p-4  font-normal text-sm text-left">Name</th>
              <th className="p-4 font-normal text-sm  text-left">Employee ID</th>
              <th className="p-4 font-normal text-sm  text-left">Role</th>
              <th className="p-4  font-normal text-sm text-left">Department</th>
              <th className="p-4 font-normal text-sm  text-left">Location</th>
              <th className="p-4 font-normal text-sm  text-left">Contact</th>
              <th className="p-4 font-normal text-sm  text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id} className={` 'h-[50px]' ${index % 2 === 0 ? 'bg-white'  : 'bg-[#F9F9F9]'}`}>
                <td className="p-4">
                  <input type="checkbox" />
                </td>
                <td className="p-4 font-light text-sm text-[#373737] text-left">{index + 1}</td>
                <td className="p-4 font-light text-sm text-[#373737] text-left">{employee.name}</td>
                <td className="p-4 font-light text-sm text-[#373737] text-left">{employee.empId}</td>
                <td className="p-4 font-light text-sm text-[#373737]  text-left">{employee.role}</td>
                <td className="p-4 font-light text-sm text-[#373737] text-left">{employee.department}</td>
                <td className="p-4 font-light text-sm text-[#373737]  text-left">{employee.location}</td>
                <td className="p-4 font-light text-sm text-[#373737] text-left">{employee.contact}</td>
                <td className="p-4 font-light text-sm text-[#373737] text-left" >
                  <button className="">
                    <img src={editIcon} alt="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default Employee
>>>>>>> Stashed changes
