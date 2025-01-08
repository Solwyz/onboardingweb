import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeInformationDetailed from "../EmployeeInformationDetailed/EmployeeInformationDetailed";
import { FaEye } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";
import AddBtn from "../../../Assets/HrTas/addIcon.svg";
import SearchIcon from "../../../Assets/HrTas/searchIcon.svg";
import filterIcon from "../../../Assets/HrTas/filterIcon.svg";
import Api from '../../../Services/Api';

export const contextItems = createContext();

const token = localStorage.getItem('token')
console.log('Token:', token);
function EmployeeInformation() {
  const [showForm, setShowForm] = useState(false);
  const [employeeList, setEmployeeList] = useState([]); // Initialize with an empty array
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [showFilterOptions, setShowFilterOptions] = useState(false);


  useEffect(() => {
    Api.get('api/employee', {
      'Authorization': `Bearer ${token}`
    })
      .then((response) => {
        console.log('Employee Data:', response.data.content);
        setEmployeeList(response.data.content);
      })
      .catch((error) => console.error('Error fetching employees:', error));
  }, []);

  const handleAddEmployeeClick = () => {
    setShowForm(true);
    setSelectedEmployee(null);
    setViewMode(false);
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
    setViewMode(false);
  };

  const handleViewClick = (employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
    setViewMode(true);
  };

  const handleFormSubmit = (formData) => {
    console.log('newwww', formData)
    if (selectedEmployee) {
      // Update employee 
      Api.put(`api/employees/${formData.EmployeeId}`, formData)
        .then(() => {
          setEmployeeList((prevList) =>
            prevList.map((employee) =>
              employee.EmployeeId === formData.EmployeeId ? formData : employee
            )
          );
          setShowForm(false);
        })
        .catch((error) => console.error('Error updating employee:', error));
    } else {
      // Add new employee
      Api.post('api/employee', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log('New Employee Added:', response.data);
          setEmployeeList((prevList) => [...prevList, response.data]);
          setShowForm(false);
        })
        .catch((error) => console.error('Error adding employee:', error));
    }
  };


  const handleFilterClick = () => setShowFilterOptions((prev) => !prev);

  const handleDepartmentFilter = (department) => {
    setFilterDepartment(department);
    setShowFilterOptions(false);
  };

  const resetFilter = () => setFilterDepartment('');

  const filteredEmployees = employeeList
    .filter((employee) => {
      // Add null/undefined checks for each property
      const nameMatches = employee?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const lastNameMatches = employee?.LastName?.toLowerCase().includes(searchTerm.toLowerCase());
      const idMatches = employee?.id?.toString().includes(searchTerm);
      const departmentMatches = employee?.Department?.toLowerCase().includes(searchTerm.toLowerCase());
      const designationMatches = employee?.Designation?.toLowerCase().includes(searchTerm.toLowerCase());
      const workLocationMatches = employee?.WorkLocation?.toLowerCase().includes(searchTerm.toLowerCase());
      const phoneNumberMatches = employee?.PhoneNumber?.includes(searchTerm);

      // Return true if any of the conditions match
      return (
        nameMatches ||
        lastNameMatches ||
        idMatches ||
        departmentMatches ||
        designationMatches ||
        workLocationMatches ||
        phoneNumberMatches
      );
    })
    .filter((employee) =>
      filterDepartment ? employee?.Department === filterDepartment : true
    );




  return (
    <contextItems.Provider value={{ showForm, setShowForm }}>
      <div className="h-full w-full p-6 bg-[#F9F9FB]">
        {!showForm ? (
          <div>
            <div className="flex justify-between">
              <div className="mt-4 font-medium text-[20px]">All Employees</div>
              <button
                className="border p-3 rounded-lg bg-[#232E42] text-white font-medium flex items-center"
                onClick={handleAddEmployeeClick}
              >
                <img className="mr-2" src={AddBtn} alt="" /> Add Employee
              </button>
            </div>
            <div className="bg-white p-6 h-[600px] mt-[34px]">
              {/* Search Bar */}
              <div className="flex mb-4">
                <div className="border rounded-lg w-[584px] py-[14px] pl-4 text-[#696A70] flex">
                  <img className="mr-2" src={SearchIcon} alt="" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="outline-none w-full"
                  />
                </div>
                <div className="relative ml-2">
                  <button
                    className="border border-[#E6E6E7] flex items-center font-normal text-sm text-[#2C2B2B] py-[15px] rounded-lg w-[89px] px-4"
                    onClick={handleFilterClick}
                  >
                    <img src={filterIcon} className="mr-2" alt="Filter" />
                    Filter
                  </button>
                  {showFilterOptions && (
                    <div className="absolute z-10 bg-white border rounded-lg mt-2 w-[150px]">
                      <ul className="text-left">
                        {['HR', 'Development', 'Finance', 'Sales'].map((dept) => (
                          <li
                            key={dept}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleDepartmentFilter(dept)}
                          >
                            {dept}
                          </li>
                        ))}
                        <li
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={resetFilter}
                        >
                          Reset Filter
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* Wrapping the table in a container */}
              <div className="overflow-x-auto">
                {filteredEmployees.length > 0 ? (
                  <table className="table-auto mt-6 border-collapse w-full min-w-[700px]">
                    <thead>
                      <tr className="bg-[#465062] text-left">
                        <th className="px-4 py-2 text-[14px] font-normal text-white text-center rounded-tl-lg">Sl No</th>
                        <th className="px-4 py-2 text-[14px] font-normal text-white text-center">Name</th>
                        <th className="px-4 py-2 text-[14px] font-normal text-white text-center">Employee ID</th>
                        <th className="px-4 py-2 text-[14px] font-normal text-white text-center">Role</th>
                        <th className="px-4 py-2 text-[14px] font-normal text-white text-center">Department</th>
                        <th className="px-4 py-2 text-[14px] font-normal text-white text-center">Location</th>
                        <th className="px-4 py-2 text-[14px] font-normal text-white text-center">Contact</th>
                        <th className="px-4 py-2 text-[14px] font-normal text-white text-center rounded-tr-lg">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map((employee, index) => (
                        <tr key={index}>
                          <td className="border text-center px-4 py-2">{index + 1}</td>
                          <td className="border text-center px-4 py-2">{employee?.name ? `${employee.name}` : 'N/A'}</td>
                          <td className="border text-center px-4 py-2">{employee?.id || 'N/A'}</td>
                          <td className="border text-center px-4 py-2">{employee?.createdAt || 'N/A'}</td>
                          <td className="border text-center px-4 py-2">{employee?.Department || 'N/A'}</td>
                          <td className="border text-center px-4 py-2">{employee?.WorkLocation || 'N/A'}</td>
                          <td className="border text-center px-4 py-2">{employee?.PhoneNumber || 'N/A'}</td>
                          <td className="border text-center px-4 py-2">
                            <div className="flex">
                              <MdEdit onClick={() => handleEditClick(employee)} />
                              <FaEye className="ml-6" onClick={() => handleViewClick(employee)} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div>Your Employee List is Empty</div>
                )}

              </div>
            </div>
          </div>
        ) : (
          <EmployeeInformationDetailed
            onSubmit={handleFormSubmit}
            employee={selectedEmployee}
            viewMode={viewMode}
          />
        )}
      </div>
    </contextItems.Provider>
  );
}

export default EmployeeInformation;
