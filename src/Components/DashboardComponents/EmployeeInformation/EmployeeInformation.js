import React, { createContext, useState } from 'react';
import EmployeeInformationDetailed from "../EmployeeInformationDetailed/EmployeeInformationDetailed";
import { FaEye } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";
import AddBtn from "../../../Assets/HrTas/addIcon.svg";
import SearchIcon from "../../../Assets/HrTas/searchIcon.svg";
import filterIcon from "../../../Assets/HrTas/filterIcon.svg";

export const contextItems = createContext();

function EmployeeInformation() {
  const [showForm, setShowForm] = useState(false); 
  const [employeeList, setEmployeeList] = useState([]); 
  const [selectedEmployee, setSelectedEmployee] = useState(null); 
  const [viewMode, setViewMode] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filterDepartment, setFilterDepartment] = useState(""); 
  const [showFilterOptions, setShowFilterOptions] = useState(false); 

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
    if (selectedEmployee) {
      setEmployeeList((prevList) =>
        prevList.map((employee) =>
          employee.EmployeeId === formData.EmployeeId ? formData : employee
        )
      );
    } else {
      setEmployeeList((prevList) => [...prevList, formData]);
    }
    setShowForm(false);
  };

  // Toggle filter dropdown visibility
  const handleFilterClick = () => {
    setShowFilterOptions((prev) => !prev);
  };

  // Handle department selection from filter options
  const handleDepartmentFilter = (department) => {
    setFilterDepartment(department);
    setShowFilterOptions(false);
  };

  // Reset department filter
  const resetFilter = () => {
    setFilterDepartment("");
  };

  // Filter employee list based on the search term and selected department
  const filteredEmployees = employeeList
    .filter(
      (employee) =>
        employee.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.EmployeeId.toString().includes(searchTerm) ||
        employee.Department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.Designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.WorkLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.PhoneNumber.includes(searchTerm)
    )
    .filter((employee) =>
      filterDepartment ? employee.Department === filterDepartment : true
    );

  return (
    <contextItems.Provider value={{ showForm, setShowForm }}>
      <div className="h-full w-full p-6 bg-[#F9F9FB] ">
        {!showForm ? (
          <div>
            <div className="flex justify-between">
              <div className="mt-4 font-medium text-[20px]">All employees</div>
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
                        <li
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleDepartmentFilter("HR")}
                        >
                          HR
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleDepartmentFilter("Development")}
                        >
                          Development
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleDepartmentFilter("Finance")}
                        >
                          Finance
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleDepartmentFilter("Sales")}
                        >
                          Sales
                        </li>
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

              {/* Wrapping the table in a container with overflow properties */}
              <div className="overflow-x-auto">
                {filteredEmployees.length > 0 ? (
                  <table className="table-auto mt-6 border-collapse w-full min-w-[700px]">
                    <thead className="">
                      <tr className="bg-[#465062] text-left">
                        <th className="px-4 text-[14px] font-normal text-white py-2 rounded-tl-lg">Sl No</th>
                        <th className="px-4 text-[14px] font-normal text-white py-2">Name</th>
                        <th className="px-4 text-[14px] font-normal text-white py-2">Employee ID</th>
                        <th className="px-4 text-[14px] font-normal text-white py-2">Roll</th>
                        <th className="px-4 text-[14px] font-normal text-white py-2">Department</th>
                        <th className="px-4 text-[14px] font-normal text-white py-2">Location</th>
                        <th className="px-4 text-[14px] font-normal text-white py-2">Contact</th>
                        <th className="px-4 text-[14px] font-normal text-white py-2 rounded-tr-lg">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map((employee, index) => (
                        <tr key={index} className="text-center">
                          <td className="border px-4 py-2 text-[14px] font-normal text-left">{index + 1}</td>
                          <td className="border px-4 text-[14px] font-normal text-left py-2">
                            {employee.FirstName} {employee.LastName}
                          </td>
                          <td className="border px-4 text-[14px] font-normal text-left py-2">{employee.EmployeeId}</td>
                          <td className="border px-4 text-[14px] font-normal text-left py-2">{employee.Designation}</td>
                          <td className="border px-4 text-[14px] font-normal text-left py-2">{employee.Department}</td>
                          <td className="border px-4 text-[14px] font-normal text-left py-2">{employee.WorkLocation}</td>
                          <td className="border px-4 text-[14px] font-normal text-left py-2">{employee.PhoneNumber}</td>
                          <td className="border px-4 text-[14px] font-normal text-left py-4 cursor-pointer">
                            <div className="flex justify-start items-center">
                              <MdEdit onClick={() => handleEditClick(employee)} />
                              <FaEye onClick={() => handleViewClick(employee)} className="ml-6" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="mt-[250px] ml-auto justify-center text-center">
                    Your Employee List is Empty
                  </div>
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
