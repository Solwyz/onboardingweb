import React, { useState } from 'react';
import addIcon from '../../../Assets/HrTas/addIcon.svg';
import editIcon from '../../../Assets/HrTas/edit.svg';
import searchIcon from '../../../Assets/HrTas/SearchIc.svg';
import filterIcon from '../../../Assets/HrTas/filterIcon.svg';
import deleteIcon from '../../../Assets/HrTas/delete.svg'

function Employee() {
  const [selectedRows, setSelectedRows] = useState([]);

  const employees = [
    { id: 1, name: "Aswin Raj", empId: "T15462566", role: "Frontend Developer", department: "Development", location: "Dubai", contact: "965 966 2546" },
    { id: 2, name: "Aswin Raj", empId: "T15462566", role: "Frontend Developer", department: "Development", location: "Dubai", contact: "965 966 2546" },
    // Add more entries as needed
  ];

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  return (
    <div className="container p-6 shadow-lg bg-white w-auto mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-[20px] text-[#232E42] font-medium mt-[40px]">All employees</h2>
        <button className="bg-[#2B2342] flex items-center w-[149px] h-[48px] font-normal text-sm mt-[24px] text-white px-4 py-2 rounded-lg">
          <img src={addIcon} className='mr-[8px]' alt="" />
          Add Employee
        </button>
      </div>

      <div className="flex mt-[34px]">
       <div className='flex items-center relative'>
       <img
              src={searchIcon}
              alt="Search"
              className="absolute  left-2 top-1/2 transform -translate-y-1/2"
            />
          <input
            type="text"
            placeholder="Search Employee"
            className="border px-[16px] py-[15px] placeholder:translate-x-[8px] rounded-lg w-[584px] h-[48px] focus:outline-none text-[#696A70] text-sm font-normal border-[#E6E6E7]"
          />
           
       
       </div>
        <button className="ml-4 w-[90px] flex items-center h-[48px] border border-[#E6E6E7] px-4 py-[7px] text-sm text-[#2C2B2B] font-normal rounded-lg">
          <img src={filterIcon} alt="" className='mr-[8px]' /> Filter
        </button>
      </div>

      <div className="flex justify-end mt-4">
        <button className="h-[30px] w-[94px] flex items-center text-[#FF0000] text-sm font-normal px-4 py-[7px] rounded-[4px] border border-[#FC4545]">
          <img src={deleteIcon} alt="" className='mr-[8px]' /> Delete
        </button>
      </div>

      <div className="overflow-x-auto mt-[16px]">
        <table className="w-full bg-white border-none rounded-lg">
          <thead className="bg-[#465062] h-[50px] text-white rounded-t-lg">
            <tr>
              <th className="p-4 text-left">
                <input type="checkbox" />
              </th>
              <th className="p-4 font-normal text-sm text-left">S No.</th>
              <th className="p-4 font-normal text-sm text-left">Name</th>
              <th className="p-4 font-normal text-sm text-left">Employee ID</th>
              <th className="p-4 font-normal text-sm text-left">Role</th>
              <th className="p-4 font-normal text-sm text-left">Department</th>
              <th className="p-4 font-normal text-sm text-left">Location</th>
              <th className="p-4 font-normal text-sm text-left">Contact</th>
              <th className="p-4 font-normal text-sm text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr
                key={employee.id}
                className={`border-b h-[50px] ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9F9F9]'} ${selectedRows.includes(employee.id) ? 'font-medium text-[#232E42]' : 'font-normal text-[#373737]'}`}
                onClick={() => handleSelectRow(employee.id)}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(employee.id)}
                    onChange={() => handleSelectRow(employee.id)}
                  />
                </td>
                <td className="p-4 font-light text-[#373737] text-sm text-left">{index + 1}</td>
                <td className="p-4 font-light text-[#373737] text-sm text-left">{employee.name}</td>
                <td className="p-4 font-light text-[#373737] text-sm text-left">{employee.empId}</td>
                <td className="p-4 font-light text-[#373737] text-sm text-left">{employee.role}</td>
                <td className="p-4 font-light text-[#373737] text-sm text-left">{employee.department}</td>
                <td className="p-4 font-light text-[#373737] text-sm text-left">{employee.location}</td>
                <td className="p-4 font-light text-[#373737] text-sm text-left">{employee.contact}</td>
                <td className="p-4 text-left">
                  <button>
                    <img src={editIcon} alt="edit" />
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

export default Employee;
