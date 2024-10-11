import React, { createContext, useState } from 'react';
import EmployeeInformationDetailed from "../EmployeeInformationDetailed/EmployeeInformationDetailed";

export const contextItems = createContext();

function EmployeeInformation() {
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [employeeList, setEmployeeList] = useState([]); // State to hold employee data

  const handleAddEmployeeClick = () => {
    setShowForm(true); // Show the form when button is clicked
  };

  const handleFormSubmit = (formData) => {
    // Add the new employee to the list
    setEmployeeList((prevList) => [...prevList, formData]);
    setShowForm(false); // Close the form after submission
  };

  return (
    <contextItems.Provider value={{ showForm, setShowForm }}>
      <div className="h-full w-full">
        {!showForm ? (
          <div>
            <button
              className="border p-3 rounded-lg bg-blue-900 text-white font-medium hover:bg-blue-700 duration-1000 translate-x-[1085px]"
              onClick={handleAddEmployeeClick}
            >
              + Add Employee
            </button>
            <div className="mt-4 font-semibold">Employee List:</div>
            {/* Render the employee details in a table */}
            {employeeList.length > 0 ? (
              <table className="table-auto mt-6 border-collapse w-full">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Employee ID</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeList.map((employee, index) => (
                    <tr key={index} className="text-center">
                      <td className="border px-4 py-2">{employee.EmployeeId}</td>
                      <td className="border px-4 py-2">{employee.FirstName} {employee.LastName}</td>
                      <td className="border px-4 py-2">{employee.PersonalEmail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="mt-4">No employees added yet.</div>
            )}
          </div>
        ) : (
          <EmployeeInformationDetailed onSubmit={handleFormSubmit} /> // Pass the onSubmit prop
        )}
      </div>
    </contextItems.Provider>
  );
}

export default EmployeeInformation;

