import React, { useState, useEffect } from 'react';
import Api from '../../../Services/Api';
import addIcon from '../../../Assets/HrTas/addIcon.svg';
import editIcon from '../../../Assets/HrTas/edit.svg';
import deleteIcon from '../../../Assets/HrTas/delete (1).svg';
import BasicDetailsForm from './EmployeeAddForms/BasicDetailsForm';
import EmployeeDetails from './EmployeeDetails/EmployeeDetails';
import confirmDeleteIcon from "../../../Assets/HrTas/employeeForms/Featured icon.svg"

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
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [deleteId, setDeleteId] = useState(null);
  const [teams, setTeams] = useState([]);

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




  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = (e, id) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
    setDeleteId(id);
  };

  const closeDeleteModal = (e) => {
    // e.stopPropagation();
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = (e) => {
    // e.stopPropagation();
    handleDeleteEmployee(e, deleteId); // Call the actual delete function
    closeDeleteModal(); // Close the modal after deletion
  };


  // Fetch employees from the API
  useEffect(() => {
    {selectedOption ? 
      Api.get(`api/employee/team/${selectedOption}`, {
        'Authorization': `Bearer ${token}`
      })

      .then((response) => {
        if(response && response.data) {
          console.log('team filtr resp',response.data.employees)
          setEmployees(response.data.employees);
        } else {
          console.error('Error fetching filtered employees')
        }
        
      })
      :
    Api.get('api/employee/api/employees/active', {
      'Authorization': `Bearer ${token}`
    })

      .then((response) => {
        console.log('Api response emppppget', response.data)
        setEmployees(response.data);
      })
      .catch((error) => {
        handleApiError(error, "Failed to fetch employees. Please try again later.");
      })
      
     
    }

  }, [selectedOption]);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeDetails(true);
  };

  const handleAddEmployeeClick = (employee) => {
    setEditingEmployee(employee);
    setShowBasicForm(true);
  };

  const handleEditEmployeeClick = (e, employee) => {
    e.stopPropagation(); // Prevent event bubbling

    // setIsLoading(true); // Start loading
    // setError(null); // Reset error state

    // Fetch employee details by ID
    Api.get(`api/employee/${employee.id}`, {
      'Authorization': `Bearer ${token}`
    })
      .then((response) => {
        console.log('Fetched Employee Details:', response.data);
        setEditingEmployee(response.data); // Set the fetched employee data
        setShowBasicForm(true); // Show the form for editing
        // setIsLoading(false); // End loading
      })
      .catch((error) => {
        console.error('Error fetching employee details:', error);
        // setError('Failed to fetch employee details. Please try again.');
        // setIsLoading(false); // End loading
      });
  };

  const handleDeleteEmployee = (e, employeeId) => {
    e.stopPropagation();
    Api.delete(`api/employee/${employeeId}`, {
      'Authorization': `Bearer ${token}`
    })
      .then((response) => {
        console.log('hrtas delete', response)
        setDeleteId(null)
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


  const filteredEmployees = employees?.filter((employee) => {
    const matchesSearch =
      (employee.name?.toLowerCase() || '').includes(searchValue.toLowerCase()) ||
      (employee.id?.toLowerCase() || '').includes(searchValue.toLowerCase()) ||
      (employee.basicDetails?.designation?.name?.toLowerCase() || '').includes(searchValue.toLowerCase()) ||
      (employee.basicDetails?.department?.departmentName?.toLowerCase() || '').includes(searchValue.toLowerCase()) ||
      (employee.contactForm?.workAddress?.city?.toLowerCase() || '').includes(searchValue.toLowerCase()) ||
      (employee.contactForm?.primaryNumber?.toLowerCase() || '').includes(searchValue.toLowerCase());
    const matchesCategory =
      selectedOption === '' ||
      (employee[categoryFilter.toLowerCase()] || '') === selectedOption;
    return matchesSearch && matchesCategory;
  });


  useEffect(() => {
    Api.get('api/teams', {
      'Authorization': `Bearer ${token}`
    })
    .then((response) => {
      if(response && response.data){
        console.log('Teams fetch', response.data.content)
        setTeams(response.data.content)
      } else {
        console.error('Error Fetching teams')
      }
    })
  }, [])

  return (
    <div className="p-6">
      {!showEmployeeDetails ? (
        <div>
          {!showBasicForm ? (
            <div className="container p-6 shadow-lg min-h-screen h-auto bg-white w-auto mx-auto">
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
                  <option value="Role">Team</option>

                </select>
                <select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="ml-4 w-[160px] h-[48px] border px-4 py-[7px] focus:outline-none text-sm text-[#696A70] rounded-lg"
                >
                  <option value="">Select Team</option>
                  {teams.map((team, index) => (
                    <option key={index} value={team.id}>{team.name}</option>
                  ))}
                </select>
              </div>

              <div className="overflow-x-auto mt-[16px] rounded-t-lg">
                <table className="w-full bg-white">
                  <thead className="bg-[#465062] h-[50px] text-white">
                    <tr>
                      <th className="p-4  font-normal text-center text-sm">Sl No.</th>
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
                    {employees?.map((employee, index) => (
                      <tr key={employee.id}

                        onClick={() => handleEmployeeClick(employee)}
                        className={` cursor-pointer h-[50px] ${index % 2 === 0 ? 'bg-white ' : 'bg-[#F9F9F9]'}`}>
                        <td className="p-4 text-center text-sm">{index + 1}</td>
                        <td className="p-4 text-center text-sm">{employee.basicDetails?.firstName + ' '+ employee.basicDetails?.lastName}</td>
                        <td className="p-4 text-center text-sm">{employee.id}</td>
                        <td className="p-4 text-center text-sm">{employee.basicDetails?.designation?.name}</td>
                        <td className="p-4 text-center text-sm">{employee.basicDetails?.department?.departmentName}</td>
                        <td className="p-4 text-center text-sm">{employee.professionalDetails?.branch?.name}</td>
                        <td className="p-4 text-center text-sm">{employee.contactForm?.primaryNumber}</td>
                        <td className="p-4 text-center">
                          <button onClick={(e) => handleEditEmployeeClick(e, employee)}>
                            <img src={editIcon} alt="edit" />
                          </button>
                          <button onClick={(e) => openDeleteModal(e, employee.id)}>
                            <img className="w-6 h-6 ml-6" src={deleteIcon} alt="delete" />
                          </button>


                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
                {isDeleteModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-xl w-96">
                      <img src={confirmDeleteIcon} alt="" />
                      <h1 className="mt-6 font-medium text-[16px]">Confirm  Delete</h1>
                      <h2 className="text-[14px] font-normal text-[#818180] mt-2">Are you sure you want to delete this order?</h2>
                      <div className="flex justify-between mt-4">
                        <button
                          onClick={closeDeleteModal}
                          className="px-[52px] py-[14px] border-[1px] rounded-lg mr-2"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={confirmDelete}
                          className="px-[52px] py-[14px] bg-[#FFCFCF] hover:bg-[#FFA0A0] text-[#D41515] rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
        <EmployeeDetails employee={selectedEmployee} onClose={() => setShowEmployeeDetails(false)} />
      )}
    </div>
  );
}

export default Employee;
