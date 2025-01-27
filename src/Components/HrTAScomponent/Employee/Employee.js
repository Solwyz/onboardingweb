import React, { useState, useEffect } from 'react';
import Api from '../../../Services/Api';
import addIcon from '../../../Assets/HrTas/addIcon.svg';
import editIcon from '../../../Assets/HrTas/edit.svg';
import deleteIcon from '../../../Assets/HrTas/delete (1).svg';
import BasicDetailsForm from './EmployeeAddForms/BasicDetailsForm';
import EmployeeDetails from './EmployeeDetails/EmployeeDetails';

const token = localStorage.getItem('token');
console.log('Token:', token);

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showBasicForm, setShowBasicForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('Role');
  const [selectedOption, setSelectedOption] = useState('');
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);

  const handleApiError = (error, customMessage = "An error occurred while fetching data.") => {
    console.error("API Error:", error);
    let errorMessage = customMessage;

    // Check if the error has a response (for HTTP errors)
    if (error.response) {
      errorMessage = error.response.data.message || `Error ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      // Network-related errors
      errorMessage = "Network error: Unable to connect to the server. Please try again later.";
    }

    // Optionally, show a user-friendly alert or toast notification
    alert(errorMessage);

    return errorMessage;
  };






  // Fetch employees from the API
  useEffect(() => {
    Api.get('api/employee/api/employees/active', {
      'Authorization': `Bearer ${token}`
    })

      .then((response) => {
        console.log('Api response', response.data)
        setEmployees(response.data);
      })
      .catch((error) => {
        handleApiError(error, "Failed to fetch employees. Please try again later.");
      });

  }, []);

  const handleAddEmployeeClick = () => {
    setEditingEmployee(null);
    setShowBasicForm(true);
  };

  const handleEditEmployeeClick = (e, employee) => {
    console.log("Edit",employee)
    e.stopPropagation();
    setEditingEmployee(employee);
    setShowBasicForm(true);
  };

  const handleDeleteEmployee = (e, employeeId) => {
    e.stopPropagation();
    Api.delete(`api/employee/${employeeId}`, {
      'Authorization': `Bearer ${token}`
    })
      .then((response) => {
        console.log('nnnn', response)
        setEmployees(employees.filter((employee) => employee.id !== employeeId));
      })
      .catch((error) => {
        handleApiError(error, "Failed to delete the employee. Please try again later.");
      });
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setSelectedOption('');
  };

  const getOptionsForCategory = () => {
    const uniqueOptions = [...new Set(employees.map((emp) => emp[categoryFilter.toLowerCase()]))];
    return uniqueOptions;
  };

  const handleFormSubmit = (newEmployee) => {
    if (editingEmployee) {
      Api.put(`api/employee/${newEmployee.id}`, newEmployee)
        .then((response) => {
          setEmployees(
            employees.map((employee) =>
              employee.id === newEmployee.id ? response.data : employee
            )
          );
          setShowBasicForm(false);
        })
        .catch((error) => {
          handleApiError(error, "Failed to update the employee details.");
        });
    } else {
      Api.post('api/employee', newEmployee, {
        'Authorization': `Bearer ${token}`
      })
        .then((response) => {
          setEmployees([...employees, response.data]);
          setShowBasicForm(false);
        })
        .catch((error) => {
          handleApiError(error, "Failed to add the new employee.");
        });
    }
  };


  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      (employee.name?.toLowerCase() || '').includes(searchValue.toLowerCase()) ||
      (employee.id?.toLowerCase() || '').includes(searchValue.toLowerCase());
    const matchesCategory =
      selectedOption === '' ||
      (employee[categoryFilter.toLowerCase()] || '') === selectedOption;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      {!showEmployeeDetails ? (
        <div>
          {!showBasicForm ? (
            <div className="container p-6 shadow-lg h-screen bg-white w-auto mx-auto">
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
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="Search Employee"
                  className="border px-[16px] py-[15px] rounded-lg w-[584px] h-[48px] focus:outline-none text-[#696A70] text-sm font-normal border-[#E6E6E7]"
                />
                <select
                  value={categoryFilter}
                  onChange={handleCategoryChange}
                  className="ml-4 w-[160px] h-[48px] border px-4 py-[7px] focus:outline-none text-sm text-[#696A70] rounded-lg"
                >
                  <option value="Role">Role</option>
                  <option value="Department">Department</option>
                  <option value="Location">Location</option>
                </select>
                <select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="ml-4 w-[160px] h-[48px] border px-4 py-[7px] focus:outline-none text-sm text-[#696A70] rounded-lg"
                >
                  <option value="">Select {categoryFilter}</option>
                  {getOptionsForCategory().map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="overflow-x-auto mt-[16px] rounded-t-lg">
                <table className="w-full bg-white">
                  <thead className="bg-[#465062] h-[50px] text-white">
                    <tr>
                      <th className="p-4  font-normal text-center text-sm">S No.</th>
                      <th className="p-4  font-normal text-center text-sm">Name</th>
                      <th className="p-4  font-normal text-center text-sm">Employee ID</th>
                      <th className="p-4  font-normal text-center text-sm">Role</th>
                      <th className="p-4  font-normal text-center text-sm">Department</th>
                      <th className="p-4  font-normal text-center text-sm">Location</th>
                      <th className="p-4  font-normal text-center text-sm">Contact</th>
                      <th className="p-4  font-normal text-center text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee, index) => (
                      <tr key={employee.id} className={`h-[50px] ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9F9F9]'}`}>
                        <td className="p-4 text-center text-sm">{index + 1}</td>
                        <td className="p-4 text-center text-sm">{employee.name}</td>
                        <td className="p-4 text-center text-sm">{employee.id}</td>
                        <td className="p-4 text-center text-sm">{employee.basicDetails?.designation?.name}</td>
                        <td className="p-4 text-center text-sm">{employee.basicDetails?.department?.departmentName}</td>
                        <td className="p-4 text-center text-sm">{employee.contactForm?.workAddress?.city}</td>
                        <td className="p-4 text-center text-sm">{employee.contactForm?.primaryNumber}</td>
                        <td className="p-4 text-center">
                          <button onClick={(e) => handleEditEmployeeClick(e, employee)}>
                            <img src={editIcon} alt="edit" />
                          </button>
                          <button onClick={(e) => handleDeleteEmployee(e, employee.id)}>
                            <img className="w-6 h-6 ml-6" src={deleteIcon} alt="delete" />
                          </button>
                        </td>
                      </tr>
                    ))}
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
