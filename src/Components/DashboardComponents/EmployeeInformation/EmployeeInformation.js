import React, { createContext, useState, useEffect } from 'react';
import EmployeeInformationDetailed from "../EmployeeInformationDetailed/EmployeeInformationDetailed";
import deleteIcon from '../../../Assets/HrTas/delete (1).svg';
import editIcon from '../../../Assets/HrTas/edit.svg';
import AddBtn from "../../../Assets/HrTas/addIcon.svg";
import SearchIcon from "../../../Assets/HrTas/searchIcon.svg";
import filterIcon from "../../../Assets/HrTas/filterIcon.svg";
import Api from '../../../Services/Api';
import arrowLeft from "../../../Assets/HrTas/documentsPage/arrowLeft.svg";
import arrowRight from "../../../Assets/HrTas/documentsPage/arrowRight.svg";

export const contextItems = createContext();

const token = localStorage.getItem('token');
console.log('Token:', token);

function EmployeeInformation() {
  const [showForm, setShowForm] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);



  useEffect(() => {
    setIsLoading(true);
    setError(null);

    Api.get('api/employee/api/employees/active', {
      'Authorization': `Bearer ${token}`
    })
      .then((response) => {
        console.log('API Response', response.data)
        if (response?.data) {
          setEmployeeList(response.data);
        } else {
          console.error('Unexpected API response:', response);
          setError('Failed to fetch employee data. Please try again later.');
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
        setError('Failed to fetch employee data. Please try again later.');
        setIsLoading(false);
      });
  }, []);
  ;

  const handleAddEmployeeClick = () => {
    setShowForm(true);
    setSelectedEmployee(null);
    setViewMode(false);
  };

  const handleEditClick = (employee) => {

    // setSelectedEmployee(employee);
    // console.log('toEdit: ', employee);
    // setShowForm(true);
    // setViewMode(false);
    Api.get(`api/employee/${employee.id}`, {
      'Authorization': `Bearer ${token}`
    })
      .then((response) => {
        console.log('Edit Employee Details:', response.data);
        setSelectedEmployee(response.data); // Set the fetched employee data
        setShowForm(true); // Show the form
        setViewMode(false); // Set view mode to false for editing
        setIsLoading(false); // End loading
      })
      .catch((error) => {
        console.error('Error fetching employee details:', error);
        setError('Failed to fetch employee details. Please try again.');
        setIsLoading(false); // End loading
      });
  };

  const handleDeleteClick = (employeeId) => {
    // e.stopPropagation();
    Api.delete(`api/employee/${employeeId}`, {
      'Authorization': `Bearer ${token}`
    })
      .then((response) => {
        console.log('vvv', response)
        setEmployeeList(employeeList.filter((employee) => employee.id !== employeeId));
      })

  };


  const handleFormSubmit = (formData) => {
    console.log('newwww', formData);
    setIsLoading(true);
    setError(null);

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
          setIsLoading(false); // End loading
        })
        .catch((error) => {
          console.error('Error updating employee:', error);
          setError('Failed to update employee. Please try again.');
          setIsLoading(false); // End loading
        });
    } else {
      // Add new employee
      console.log('fmmkk', formData)
      Api.post('api/employee', {
        "name": formData.firstName,
        "email": formData.PersonalEmail,
        "firstName": formData.firstName,
        "lastName": formData.LastName

      }, {
        'Authorization': `Bearer ${token}`,
      })
        .then((response) => {
          console.log('New Employee Addedddzzz:', response.data);
          setEmployeeList((prevList) => [...prevList, response.data]);
          setShowForm(false);
          setIsLoading(false); // End loading
        })
        .catch((error) => {
          console.error('Error adding employee:', error);
          setError('Failed to add new employee. Please try again.');
          setIsLoading(false); // End loading
        });
    }
  };

  const handleFilterClick = () => setShowFilterOptions((prev) => !prev);

  const handleDepartmentFilter = (department) => {
    setFilterDepartment(department);
    setShowFilterOptions(false);
  };


  const resetFilter = () => setFilterDepartment('');

  const filteredEmployees = (employeeList || [])
    .filter((employee) => {
      const nameMatches = employee?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const lastNameMatches = employee?.LastName?.toLowerCase().includes(searchTerm.toLowerCase());
      const idMatches = employee?.id?.toString().includes(searchTerm);
      const departmentMatches = employee?.Department?.toLowerCase().includes(searchTerm.toLowerCase());
      const designationMatches = employee?.Designation?.toLowerCase().includes(searchTerm);
      const workLocationMatches = employee?.WorkLocation?.toLowerCase().includes(searchTerm);
      const phoneNumberMatches = employee?.PhoneNumber?.includes(searchTerm);

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


  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10; // Change this to adjust employees per page

  // Calculate total pages
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  // Get current employees for the page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  return (
    <contextItems.Provider value={{ showForm, setShowForm }}>
      <div className="h-full w-full p-6 bg-[#F9F9FB]">
        {!showForm ? (
          <div>
            <div className="flex justify-between">
              <div className="mt-4 font-medium text-[20px]">All Employees List</div>
              {/* <button
                className="border p-3 rounded-lg bg-[#232E42] text-white font-medium flex items-center"
                onClick={handleAddEmployeeClick}
              >
                <img className="mr-2" src={AddBtn} alt="" /> Add Employee
              </button> */}
            </div>
            <div className="bg-white p-6 h-full min-h-[600px] mt-[34px]">
              {isLoading && <div>Loading...</div>}
              {error && <div className="text-red-500">{error}</div>}
              {!isLoading && !error && (
                <>
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
                      {/* <button
                        className="border border-[#E6E6E7] flex items-center font-normal text-sm text-[#2C2B2B] py-[15px] rounded-lg w-[89px] px-4"
                        onClick={handleFilterClick}
                      >
                        <img src={filterIcon} className="mr-2" alt="Filter" />
                        Filter
                      </button> */}
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
                  <div className="overflow-x-auto">
                    {filteredEmployees.length > 0 ? (
                      <div>
                        <table className="table-auto mt-6 border-collapse w-full min-w-[700px] h-full">
                          <thead>
                            <tr className="bg-[#465062] text-left">
                              <th className="px-4 py-2 text-[14px] font-normal text-white text-left rounded-tl-lg">Sl No</th>
                              <th className="px-4 py-2 text-[14px] font-normal text-white text-left">Name</th>
                              <th className="px-4 py-2 text-[14px] font-normal text-white text-left">Employee ID</th>
                              <th className="px-4 py-2 text-[14px] font-normal text-white text-left">Role</th>
                              <th className="px-4 py-2 text-[14px] font-normal text-white text-left">Department</th>
                              <th className="px-4 py-2 text-[14px] font-normal text-white text-left rounded-tr-lg">Location</th>
                              {/* <th className="px-4 py-2 text-[14px] font-normal text-white text-left rounded-tr-lg">Actions</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {currentEmployees.map((employee, index) => (
                              <tr key={index} className="text-sm font-normal">
                                <td className="px-4 py-2 text-left">{index + 1}</td>
                                <td className="px-4 py-2 text-left">{employee.name + " " + employee.basicDetails?.lastName}</td>
                                <td className="px-4 py-2 text-left">{employee.id}</td>
                                <td className="px-4 py-2 text-left">{employee.basicDetails?.designation?.name}</td>
                                <td className="px-4 py-2 text-left">{employee.basicDetails?.department?.departmentName}</td>
                                <td className="px-4 py-2 text-left">{employee.professionalDetails?.branch?.name}</td>
                                {/* <td className="px-4 py-2 flex justify-left">
                                <button
                                  onClick={() => handleEditClick(employee)}
                                  className=""
                                >
                                  <img src={editIcon} alt="edit" />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(employee.id)}
                                  className=""
                                >
                                  <img className="w-6 h-6 ml-6" src={deleteIcon} alt="delete" />
                                </button>
                              </td> */}

                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* <div className="flex justify-between items-center mt-4">
                          <button
                            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>

                          <span className="text-gray-700">
                            Page {currentPage} of {totalPages}
                          </span>

                          <button
                            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </div> */}

                        {/* Pagination Controls */}
                        <div className="flex justify-end align-middle mt-8">
                          <button
                            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                            className={`p-2 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                              }`}
                            disabled={currentPage === 1}
                          >
                            <img src={arrowLeft} alt="Previous" />
                          </button>
                          {[...Array(totalPages)].map((_, i) => (
                            <button
                              key={i}
                              onClick={() => paginate(i + 1)}
                              className={`p-2 rounded-md ${currentPage === i + 1 ? "text-[#373737]" : "text-[#C8C8C8]"
                                }`}
                            >
                              {i + 1}
                            </button>
                          ))}
                          <button
                            onClick={() =>
                              paginate(currentPage < totalPages ? currentPage + 1 : totalPages)
                            }
                            className={`p-2 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
                              }`}
                            disabled={currentPage === totalPages}
                          >
                            <img src={arrowRight} alt="Next" />
                          </button>
                        </div>


                      </div>
                    ) : (
                      <div>No employees found.</div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <EmployeeInformationDetailed
            onClose={() => setShowForm(false)}
            onSubmit={handleFormSubmit}
            initialData={selectedEmployee}
            isViewMode={viewMode}
          />
        )}
      </div>
    </contextItems.Provider>
  );
}

export default EmployeeInformation;