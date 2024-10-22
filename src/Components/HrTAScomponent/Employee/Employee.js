import React, { useState } from 'react';
import addIcon from '../../../Assets/HrTas/addIcon.svg';
import editIcon from '../../../Assets/HrTas/edit.svg';
import searchIcon from '../../../Assets/HrTas/SearchIc.svg';
import filterIcon from '../../../Assets/HrTas/filterIcon.svg';
import deleteIcon from '../../../Assets/HrTas/delete.svg';
import BasicDetailsForm from './EmployeeAddForms/BasicDetailsForm';

function Employee() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showBasicForm, setShowBasicForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null); // State to hold employee details for editing

  const employees = [
    { id: 1, name: 'Aswin Raj', empId: 'T15462566', role: 'Frontend Developer', department: 'Development', location: 'Dubai', contact: '965 966 2546' },
    { id: 2, name: 'John Doe', empId: 'T15462567', role: 'Backend Developer', department: 'Development', location: 'Dubai', contact: '965 966 2547' },
    // Add more entries as needed
  ];

  const handleAddEmployeeClick = () => {
    setEditingEmployee(null); // Clear editing employee when adding a new employee
    setShowBasicForm(true);
  };

  const handleEditEmployeeClick = (employee) => {
    setEditingEmployee(employee); // Set the employee to be edited
    setShowBasicForm(true); // Show the form
  };

  const handleSelectRow = (id) => {
    const updatedSelectedRows = selectedRows.includes(id)
      ? selectedRows.filter((rowId) => rowId !== id)
      : [...selectedRows, id];

    setSelectedRows(updatedSelectedRows);
    setSelectAll(updatedSelectedRows.length === employees.length);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(employees.map((employee) => employee.id));
    }
    setSelectAll(!selectAll);
  };

  return (
    <div>
      {!showBasicForm ? (
        <div className="container p-6 shadow-lg bg-white w-auto mx-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-[20px] text-[#232E42] font-medium mt-[40px]">All employees</h2>
            <button onClick={handleAddEmployeeClick}
              className="bg-[#2B2342] flex items-center w-[149px] h-[48px] font-normal text-sm mt-[24px] text-white px-4 py-2 rounded-lg">
              <img src={addIcon} className="mr-[8px]" alt="" />
              Add Employee
            </button>
          </div>
  
          <div className="flex mt-[34px]">
            <div className="flex items-center relative">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search Employee"
                className="border px-[16px] py-[15px] placeholder:translate-x-[10px] rounded-lg w-[584px] h-[48px] focus:outline-none text-[#696A70] text-sm font-normal border-[#E6E6E7]" 
              />
              {searchValue.length === 0 && (
                <img
                  src={searchIcon}
                  alt="Search"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2"
                />
              )}
            </div>
            <button className="ml-4 w-[90px] flex items-center h-[48px] border border-[#E6E6E7] px-4 py-[7px] text-sm text-[#2C2B2B] font-normal rounded-lg">
              <img src={filterIcon} alt="" className="mr-[8px]" /> Filter
            </button>
          </div>
  
          <div className="flex justify-end mt-4">
            <button className="h-[30px] w-[94px] flex items-center text-[#FF0000] text-sm font-normal px-4 py-[7px] rounded-[4px] border border-[#FC4545]">
              <img src={deleteIcon} alt="" className="mr-[8px]" /> Delete
            </button>
          </div>
  
          <div className="overflow-x-auto mt-[16px]">
            <table className="w-full bg-white border-none rounded-t-2xl">
              <thead className="bg-[#465062] h-[50px] text-white rounded-t-3xl">
                <tr>
                  <th className="p-4 text-left">
                    <input 
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="accent-[#232E42]" // Custom checkbox color
                    />
                  </th>
                  <th className="p-4 text-left font-normal text-sm">S No.</th>
                  <th className="p-4 text-left font-normal text-sm">Name</th>
                  <th className="p-4 text-left font-normal text-sm">Employee ID</th>
                  <th className="p-4 text-left font-normal text-sm">Role</th>
                  <th className="p-4 text-left font-normal text-sm">Department</th>
                  <th className="p-4 text-left font-normal text-sm">Location</th>
                  <th className="p-4 text-left font-normal text-sm">Contact</th>
                  <th className="p-4 text-left font-normal text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr
                    key={employee.id}
                    className={`h-[50px] ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9F9F9]'} ${selectedRows.includes(employee.id) ? 'text-[#232E42] font-medium' : 'text-[#373737] font-light'}`}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(employee.id)}
                        onChange={() => handleSelectRow(employee.id)}
                        onClick={(e) => e.stopPropagation()} // Prevent the row click from triggering selection
                        className="accent-[#232E42]"
                      />
                    </td>
                    <td className="p-4 text-left text-sm">{index + 1}</td>
                    <td className="p-4 text-left text-sm">{employee.name}</td>
                    <td className="p-4 text-left text-sm">{employee.empId}</td>
                    <td className="p-4 text-left text-sm">{employee.role}</td>
                    <td className="p-4 text-left text-sm">{employee.department}</td>
                    <td className="p-4 text-left text-sm">{employee.location}</td>
                    <td className="p-4 text-left text-sm">{employee.contact}</td>
                    <td className="p-4 text-left">
                      <button onClick={() => handleEditEmployeeClick(employee)}>
                        <img src={editIcon} alt="edit" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : <BasicDetailsForm employee={editingEmployee} onClose={() => setShowBasicForm(false)} /> }
    </div>
  );
}

export default Employee;
