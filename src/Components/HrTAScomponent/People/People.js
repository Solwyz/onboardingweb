import React, { useEffect, useState } from "react";
import "./people.css";
import expIcon from "../../../Assets/HrTas/People/expIcon.svg";
import depIcon from "../../../Assets/HrTas/People/depIcon.svg";
import jobIcon from "../../../Assets/HrTas/People/jobIcon.svg";
import arrowLeft from "../../../Assets/HrTas/documentsPage/arrowLeft.svg";
import arrowRight from "../../../Assets/HrTas/documentsPage/arrowRight.svg";
import Api from "../../../Services/Api";

function People() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [employees, setEmployees] = useState([]);
  const employeesPerPage = 10;

  const token = localStorage.getItem("token");

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) =>
    employee.name && employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  // Calculate total pages
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  // Get the current page employees
  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage
  );

  // Pagination handlers
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    Api.get("api/employee/api/employees/active", {
      Authorization: `Bearer ${token}`,
    })
      .then((response) => {
        if (response && response.data) {
          setEmployees(response.data);
          console.log("peopleee data", response.data);
        } else {
          console.error("Invalid response data:", response);
          alert("Can not fetch Employees data. Please try again");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="p-6">
      <div className="container bg-white w-full h-[1700px] p-6 shadow-lg">
        <div>
          <h2 className="text-[20px] text-[#232E42] font-medium mt-[40px]">
            People
          </h2>
        </div>
        <div className="mt-[32px]">
          <input
            type="text"
            placeholder="Search Employee"
            className="border border-[#E6E6E7] focus:outline-none text-[#696A70] text-sm font-normal rounded-lg p-2 w-[584px] h-[48px]"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to the first page on a new search
            }}
          />
        </div>
        <div className="grid grid-col-3 mt-4 gap-2">
          {currentEmployees.map((employee) => (
            <div
              key={employee.id}
              className="bg-white h-[136px] py-[22px] p-4 w-[1097px] custom-shadow  flex gap-32 items-center"
            >
              {/* <img
                src={employee.image}
                className="w-[104px] h-[104px] rounded-lg"
                alt={employee.name}
              /> */}

              <div className="ml-8 w-[300px]">
                <h3 className="text-[16px] text-[#373737] font-normal">
                  {employee.name}
                </h3>
                <p className="text-[16px] mt-[16px] text-[#696A70] font-normal">
                  {employee.email}
                </p>
              </div>

              <div className=" text-left ml-[400px]">
                <div className="flex text-[16px] text-[#696A70] font-normal">
                  <img src={jobIcon} alt="Role" className="mr-8" />
                  {employee.basicDetails?.designation?.name}
                </div>
                <div className="flex text-[16px] text-[#696A70] font-normal mt-4">
                  <img src={depIcon} alt="Department" className="mr-8" />
                  {employee.basicDetails?.department?.departmentName}
                </div>
                <div className="flex text-[16px] text-[#696A70] font-normal mt-4">
                  <img src={expIcon} alt="Experience" className="mr-8" />
                  {employee.professionalDetails?.level?.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-end align-middle mt-8">
          <button
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            className={`p-2 ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={currentPage === 1}
          >
            <img src={arrowLeft} alt="Previous" />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`p-2 rounded-md ${
                currentPage === i + 1
                  ? "text-[#373737] font-normal text-sm"
                  : "text-[#C8C8C8] text-sm font-normal"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              paginate(currentPage < totalPages ? currentPage + 1 : totalPages)
            }
            className={`p-2 ${
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={currentPage === totalPages}
          >
            <img src={arrowRight} alt="Next" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default People;
