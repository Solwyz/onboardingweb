import React, { createContext, useState } from 'react';
import EmployeeInformationDetailed from "../EmployeeInformationDetailed/EmployeeInformationDetailed";
import { FaEye } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";
import AddBtn from "../../../Assets/HrTas/addIcon.svg"
import SearchIcon from "../../../Assets/HrTas/searchIcon.svg"
import filterIcon from "../../../Assets/HrTas/filterIcon.svg"

export const contextItems = createContext();

function EmployeeInformation() {
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [employeeList, setEmployeeList] = useState([]); // State to hold employee data
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State for selected employee
  const [viewMode, setViewMode] = useState(false); // State to control view mode

  const handleAddEmployeeClick = () => {
    setShowForm(true); // Show the form when button is clicked
    setSelectedEmployee(null); // Clear selected employee for new entry
    setViewMode(false); // Set to edit mode
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee); // Set the selected employee for editing
    setShowForm(true); // Show the form
    setViewMode(false); // Set to edit mode
  };

  const handleViewClick = (employee) => {
    setSelectedEmployee(employee); // Set the selected employee for viewing
    setShowForm(true); // Show the form
    setViewMode(true); // Set to view mode
  };

  const handleFormSubmit = (formData) => {
    if (selectedEmployee) {
      // Update existing employee (edit mode)
      setEmployeeList((prevList) =>
        prevList.map((employee) =>
          employee.EmployeeId === formData.EmployeeId ? formData : employee
        )
      );
    } else {
      // Add new employee
      setEmployeeList((prevList) => [...prevList, formData]);
    }
    setShowForm(false); // Close the form after submission
  };

  return (
    <contextItems.Provider value={{ showForm, setShowForm }}>
      <div className="h-full w-full p-6 bg-[#F9F9FB] ">
        {!showForm ? (
          <div>
            <div className='flex justify-between'>
              <div className="mt-4 font-medium text-[20px]">All employees</div>
              <button
                className="border p-3 rounded-lg bg-[#232E42] text-white font-medium flex items-center"
                onClick={handleAddEmployeeClick}
              >
                <img className='mr-2' src={AddBtn} alt="" /> Add Employee
              </button>

            </div>
            <div className='bg-white p-6 h-[600px] mt-[34px]'>
              <div className='flex'>
                <div className='border rounded-lg w-[584px] py-[14px] pl-4 text-[#696A70] flex '>
                  <img className='mr-2' src={SearchIcon} alt="" />
                  <input
                    type='text'
                    placeholder='Search'
                    value=''
                    onChange=''
                    className='outline-none w-full '
                  />

                </div>
                <button className="border border-[#E6E6E7] flex items-center font-normal text-sm text-[#2C2B2B] py-[15px] ml-2 rounded-lg w-[89px] px-4">
                  <img src={filterIcon} className="mr-2" alt="Filter" />
                  Filter
                </button>
              </div>

              {/* Wrapping the table in a container with overflow properties */}
              <div className="overflow-x-auto">
                {employeeList.length > 0 ? (
                  <table className="table-auto mt-6 border-collapse w-full min-w-[700px]">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Employee ID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Roll</th>
                        <th className="border px-4 py-2">Department</th>
                        <th className="border px-4 py-2">Location</th>
                        <th className="border px-4 py-2">Contact</th>
                        <th className="border px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeList.map((employee, index) => (
                        <tr key={index} className="text-center">
                          <td className="border px-4 py-2">{employee.EmployeeId}</td>
                          <td className="border px-4 py-2">{employee.FirstName} {employee.LastName}</td>
                          <td className="border px-4 py-2">{employee.Designation}</td>
                          <td className="border px-4 py-2">{employee.Department}</td>
                          <td className="border px-4 py-2">{employee.WorkLocation}</td>
                          <td className="border px-4 py-2">{employee.PhoneNumber}</td>
                          <td className="border px-4 py-4 cursor-pointer ">
                            <div className='flex justify-center items-center'>
                              <MdEdit onClick={() => handleEditClick(employee)} />
                              <FaEye onClick={() => handleViewClick(employee)} className='ml-6' />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="mt-[250px] ml-auto justify-center text-center">Your Employee List is Empty</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <EmployeeInformationDetailed
            onSubmit={handleFormSubmit}
            employee={selectedEmployee}
            viewMode={viewMode} // Pass view mode to the detailed component
          />
        )}



      </div>
    </contextItems.Provider>
  );
}

export default EmployeeInformation;
