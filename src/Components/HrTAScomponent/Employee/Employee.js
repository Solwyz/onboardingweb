import React, { useState } from 'react';
import addIcon from '../../../Assets/HrTas/addIcon.svg';
import editIcon from '../../../Assets/HrTas/edit.svg';
import searchIcon from '../../../Assets/HrTas/SearchIc.svg';
import Dropdown from '../../../Assets/HrTas/drop-down-arrow.svg';
import deleteIcon from '../../../Assets/HrTas/delete (1).svg';
import BasicDetailsForm from './EmployeeAddForms/BasicDetailsForm';
import EmployeeDetails from './EmployeeDetails/EmployeeDetails';



function Employee() {
  const [employees, setEmployees] = useState([
    { id: 1, firstName: 'Aswin Raj', empId: 'T15462566', role: 'Frontend Developer', department: 'Development', location: 'Dubai',nationality: 'Indian', contact: '965 966 2546' },
    { id: 2, firstName: 'John Doe', empId: 'T15462567', role: 'Backend Developer', department: 'Development', location: 'Dubai',nationality: 'Indian', contact: '965 966 2547' },
    { id: 3, firstName: 'Ashik cn', empId: 'T15462567', role: 'Backend Developer', department: 'Development', location: 'India',nationality: 'Indian', contact: '965 966 2547' },
    { id: 4, firstName: 'Vinessh vj', empId: 'T15462567', role: 'Backend Developer', department: 'Development', location: 'Dubai',nationality: 'Indian', contact: '965 966 2547' },
    { id: 5, firstName: 'Nizam Mdu', empId: 'T15462567', role: 'Backend Developer', department: 'Development', location: 'Dubai',nationality: 'Indian', contact: '965 966 2547' }
  ]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [searchValue, setSearchValue] = useState('');
  const [showBasicForm, setShowBasicForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('Role'); // State for first dropdown
  const [selectedOption, setSelectedOption] = useState(''); // State for second dropdown
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false)

  const [showFinalForm, setShowFinalForm] = useState(false)

  const handleShowEmployeeDetails = () => {
    setShowEmployeeDetails(true);
  }

  const handleAddEmployeeClick = () => {
    setEditingEmployee(null);
    setShowBasicForm(true);
  };

  const handleEditEmployeeClick = (e,employee) => {
    console.log(e)
    e.stopPropagation();
    setEditingEmployee(employee);
    setShowBasicForm(true);
  };

  const handleDeleteEmployee = (e, employeeId) => {
    e.stopPropagation(); // Prevent row click action when deleting
    setEmployees(employees.filter(employee => employee.id !== employeeId));
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Filter employees based on search, department, role, and location
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.empId.toLowerCase().includes(searchValue.toLowerCase());
    const matchesCategory = selectedOption === '' || employee[categoryFilter.toLowerCase()] === selectedOption;

    return matchesSearch && matchesCategory;
  });

  // Handle category (Role/Department/Location) selection
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setSelectedOption(''); // Reset the second dropdown when category changes
  };

  // Options for the second dropdown based on the selected category
  const getOptionsForCategory = () => {
    const uniqueOptions = [...new Set(employees.map(emp => emp[categoryFilter.toLowerCase()]))];
    return uniqueOptions;
  };

  const handleFormSubmit = (newEmployee) => {
    if (editingEmployee) {
      setEmployees(
        employees.map((employee) =>
          employee.id === newEmployee.id ? newEmployee : employee
        )
      );
    } else {
      setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }]);
    }
    setShowBasicForm(false);
  };

  return (
    <div className='p-6'>
      {!showEmployeeDetails ? (
        <div>
          {!showBasicForm ? (
            <div className="container p-6 shadow-lg h-screen  bg-white w-auto mx-auto">
              <div className="flex justify-between items-center">
                <h2 className="text-[20px] text-[#232E42] font-medium mt-[40px]">All employees</h2>
                <button
                  onClick={handleAddEmployeeClick}
                  className="bg-[#2B2342] flex items-center w-[149px] h-[48px] font-normal text-sm mt-[24px] text-white px-4 py-2 rounded-lg"
                >
                  <img src={addIcon} className="mr-[8px]" alt="" />
                  Add Employee
                </button>
              </div>

              <div className="flex mt-[34px]">
                <div className="flex items-center relative">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search Employee"
                    className="border px-[16px] py-[15px] placeholder:translate-x-[10px] rounded-lg w-[584px] h-[48px] focus:outline-none text-[#696A70] text-sm font-normal border-[#E6E6E7]"
                  />
                </div>

                <select
                  value={categoryFilter}
                  onChange={handleCategoryChange}
                  className="ml-4 w-[160px] flex items-center h-[48px] border border-[#E6E6E7] px-4 py-[7px] focus:outline-none justify-between text-sm text-[#696A70] font-normal rounded-lg"
                >
                  <option value="Role">Role</option>
                  <option value="Department">Department</option>
                  <option value="Location">Location</option>
                </select>

                <select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="ml-4 w-[160px] flex items-center h-[48px] border border-[#E6E6E7] px-4 py-[7px] focus:outline-none justify-between text-sm text-[#696A70] font-normal rounded-lg"
                >
                  <option value="">Select {categoryFilter}</option>
                  {getOptionsForCategory().map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="overflow-x-auto mt-[16px] rounded-t-lg ">
                <table className="w-full bg-white border-none">
                  <thead className="bg-[#465062] h-[50px] text-white">
                    <tr>
                      <th className="p-4 text-left font-normal text-sm">S No.</th>
                      <th className="p-4 text-left font-normal text-sm">Name</th>
                      <th className="p-4 text-left font-normal text-sm">Employee ID</th>
                      <th className="p-4 text-left font-normal text-sm">Role</th>
                      <th className="p-4 text-left font-normal text-sm">Department</th>
                      <th className="p-4 text-left font-normal text-sm">Location</th>
                      <th className="p-4 text-left font-normal text-sm">Contact</th>
                      <th className="p-4 text-left font-normal text-sm ">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee, index) => (
                      <tr
                        key={employee.id}
                        onClick={handleShowEmployeeDetails}
                        className={`h-[50px] cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9F9F9]'} ${selectedRows.includes(employee.id) ? 'text-[#232E42] font-medium' : 'text-[#373737] font-light'}`}
                      >
                        <td className="p-4 text-left text-sm">{index + 1}</td>
                        <td className="p-4 text-left text-sm">{employee.firstName}</td>
                        <td className="p-4 text-left text-sm">{employee.empId}</td>
                        <td className="p-4 text-left text-sm">{employee.role}</td>
                        <td className="p-4 text-left text-sm">{employee.department}</td>
                        <td className="p-4 text-left text-sm">{employee.location}</td>
                        <td className="p-4 text-left text-sm">{employee.contact}</td>
                        <td className="p-4 text-left">
                          <button onClick={(e) => handleEditEmployeeClick(e, employee)}>
                            <img src={editIcon} alt="edit" />
                          </button>
                          <button onClick={(e) => handleDeleteEmployee(e, employee.id)}>
                            <img className="w-6 h-6 ml-6" src={deleteIcon} alt="delete" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="9" className="h-[50px]"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <BasicDetailsForm
              editingEmployee={editingEmployee}
              onClose={() => setShowBasicForm(false)}
              onSubmit={handleFormSubmit}
            />
          )}
        </div>
      ) : (
        <EmployeeDetails />
      )}
    </div>
  );
}

export default Employee;
