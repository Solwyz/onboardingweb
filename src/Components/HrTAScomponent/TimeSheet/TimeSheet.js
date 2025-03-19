import React, { useState, useEffect } from "react";
import addIcon from "../../../Assets/HrTas/addIcon.svg";
import DropDown from "../../../Assets/HrTas/drop-down-arrow.svg";
import TimeSheetModal from "./TimeSheetModal";
import SearchIcon from "../../../Assets/HrTas/searchIcon.svg";
import FilterIcon from "../../../Assets/HrTas/filter_alt.svg";
import GroupIcon from "../../../Assets/HrTas/GroupIcon.svg";
import Api from "../../../Services/Api";
import editIcon from "../../../Assets/Superadmin/edit-svgrepo-com.svg";
import deleteIcon from "../../../Assets/Superadmin/delete.svg";
import { ClipLoader } from "react-spinners";

function TimeSheet() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All Employees");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeSheetData, setTimeSheetData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleteing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [dataToEdit, setDataToEdit] = useState(null);

  const token = localStorage.getItem("token");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);

    if (option === "My Timesheet") {
      setEmployeeName("");
    } else {
      setEmployeeName("");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDataToEdit(null);
  };

  const handleAddTimeSheet = (newEntry) => {
    // Assuming newEntry is the object with the timesheet data
    setTimeSheetData((prevData) => [...prevData, newEntry]);
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterQuery(e.target.value);
  };

  const [sortOrder, setSortOrder] = useState('DSC');

  const handleGroupChange = (e) => {
    const value = e.target.value;
    if (groupBy === value) {
      setSortOrder(sortOrder === 'ASC' ? 'DSC' : 'ASC');
    } else {
      setGroupBy(value);
      setSortOrder('DSC');
    }
  };

  const filteredTimesheet = timeSheetData.filter((data) => {
    // Check if data.project is defined
    if (!data.project) {
      return false; // Skip this entry if project is undefined
    }

    // Ensure that the properties are not null or undefined before calling toLowerCase
    const createdBy = data.project.createdBy ? data.project.createdBy.toLowerCase() : '';
    const projectName = data.project.projectName ? data.project.projectName.toLowerCase() : '';
    const date = data.date ? data.date.toLowerCase() : '';
    const task = data.task ? data.task.toLowerCase() : '';
    const description = data.description ? data.description.toLowerCase() : '';
    const duration = data.duration ? data.duration.toString() : '';

    if (selectedOption === "My Timesheet") {
      return createdBy.includes("hr"); // Adjust "hr" based on actual data
    }

    return (
      projectName.startsWith(searchTerm.toLowerCase()) ||
      date.startsWith(searchTerm.toLowerCase()) ||
      createdBy.startsWith(searchTerm.toLowerCase()) ||
      task.startsWith(searchTerm.toLowerCase()) ||
      description.startsWith(searchTerm.toLowerCase()) ||
      duration.startsWith(searchTerm.toLowerCase())
    );
  });
  const sortedTimesheet = [...filteredTimesheet].sort((a, b) => {
    if (groupBy === "Date") {
      return sortOrder === "DSC"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (groupBy === "Project") {
      return sortOrder === "DSC"
        ? b.project.projectName.localeCompare(a.project.projectName)
        : a.project.projectName.localeCompare(b.project.projectName);
    }
    return 0;
  });

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const handleDeleteModalCancel = () => {
    setDeleteModal(false);
  };

  const handleDeleteModalConfirm = () => {
    setIsDeleteing(true);
    Api.delete(`api/timesheet/${deleteId}`, {
      Authorization: `Bearer ${token}`,
    }).then((response) => {
      setIsDeleteing(false);
      if (response && response.data) {
        console.log(response.data.message);
        setRefreshKey((prev) => prev + 1);
        setDeleteModal(false);
      } else {
        console.error("Invalid response data: ", response);
        alert("Cannot delete item. Please try again");
      }
    });
  };

  const handleEditClick = (id) => {
    setDataToEdit(timeSheetData.find((time) => time.id === id));
    console.log(dataToEdit);
    setIsModalOpen(true);
  };

  useEffect(() => {
    Api.get("api/timesheet", {
      Authorization: `Bearer ${token}`,
    }).then((response) => {
      if (response && response.data) {
        console.log("timesheetzz", response.data.content);
        setTimeSheetData(response.data.content);
      } else {
        console.error("Invalid response data:", response);
        alert("Can not fetch data. Please try again");
      }
    });
  }, [refreshKey]);

  return (
    <div className="bg-[#F8FAFB] pl-4 pt-4 pr-[34px] pb-[73px]">
      <div className="bg-[#FFFFFF] w-full px-6 pb-[93px] h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-[20px] text-[#232E42] font-medium mt-[40px]">
              Time Sheet
            </h2>
          </div>
          <div className="flex">
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="border flex items-center font-normal text-sm mt-[24px] text-[#373737] px-6 py-[10px] rounded-lg"
              >
                {selectedOption}
                <img src={DropDown} className="ml-[8px]" alt="Dropdown arrow" />
              </button>
              {showDropdown && (
                <div className="absolute top-full left-0 w-full bg-white border rounded-lg">
                  {selectedOption !== "All Employees" && (
                    <div
                      onClick={() => handleOptionSelect("All Employees")}
                      className="px-4 py-2 text-sm text-[#373737] hover:bg-gray-100 cursor-pointer"
                    >
                      All Employees
                    </div>
                  )}
                  {selectedOption !== "My Timesheet" && (
                    <div
                      onClick={() => handleOptionSelect("My Timesheet")}
                      className="px-4 py-2 text-sm text-[#373737] hover:bg-gray-100 cursor-pointer"
                    >
                      My Timesheet
                    </div>
                  )}
                </div>
              )}
            </div>
            {selectedOption === "My Timesheet" && (
              <button
                onClick={handleOpenModal}
                className="bg-[#2B2342] flex items-center ml-6 font-normal text-sm mt-[24px] text-white px-6 py-[14px] rounded-lg"
              >
                <img src={addIcon} className="mr-[8px]" alt="Add icon" />
                Create
              </button>
            )}
          </div>
        </div>

        {timeSheetData.length === 0 ? (
          <div className="mt-[300px] justify-center items-center flex text-center text-[#696A70]">
            No entries available. Click "Create" to add a new timesheet entry.
          </div>
        ) : (
          <>
            {/* Search, Filter, and Group By */}
            <div className="flex gap-2 text-[14px] placeholder:text-[14px] mt-9">
              <div className="border rounded-lg w-[232px] py-[14px] pl-4 text-[#696A70] flex">
                <img className="mr-2" src={SearchIcon} alt="" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    // setCurrentPage(1);
                  }}
                  className="outline-none w-full"
                />
              </div>
              {/* <div className="border rounded-lg w-[96px] py-[14px] pl-4 text-[#696A70] flex">
                <img className="mr-2" src={FilterIcon} alt="" />
                <input
                  type="text"
                  placeholder="Filter"
                  value={filterQuery}
                  onChange={handleFilterChange}
                  className="outline-none w-full"
                />
              </div> */}
              <div className="border rounded-lg w-[125px] py-4 pl-4 pr-1 text-[#696A70] flex">
                <img className="" src={GroupIcon} alt="" />
                <select
                  value={groupBy}
                  onChange={handleGroupChange}
                  className="outline-none w-full bg-white"
                >
                  <option value="">Group By</option>
                  <option value="Project">Project</option>
                  <option value="Date">Date</option>
                </select>
              </div>
            </div>

            {/* TimeSheet Table */}
            <div className="rounded-t-lg overflow-hidden mt-6">
              <table className="min-w-full bg-white rounded-lg">
                <thead className="bg-[#465062] p-4 text-center font-normal text-sm text-white">
                  <tr className="w-full">
                    <th className="p-4 text-center font-normal text-sm">
                      Date
                    </th>
                    <th className="p-4 text-center font-normal text-sm">
                      Name
                    </th>
                    <th className="p-4 text-center font-normal text-sm">
                      Project
                    </th>
                    <th className="p-4 text-center font-normal text-sm">
                      Task
                    </th>
                    <th className="p-4 text-center font-normal text-sm">
                      Description
                    </th>
                    <th className="p-4 text-center font-normal text-sm">
                      Duration (Hours)
                    </th>
                    <th className="p-4 text-center font-normal text-sm">
                      Edit/Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* {Object.entries(groupedTimeSheetData).map(([group, entries], index) => ( */}
                  <React.Fragment>
                    {timeSheetData.length > 0 ? (
                      timeSheetData.map((time, timeIndex) => (
                        <tr
                          key={timeIndex}
                          className={`${timeIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                            } border-b`}
                        >
                          <td className="p-4 text-center font-normal text-sm">
                            {time.date}
                          </td>
                          <td className="p-4 text-center font-normal text-sm">
                            {time.employee?.name||'Not available'}
                          </td>
                          <td className="p-4 text-center font-normal text-sm">
                            {time.project?.projectName||'Not available'}
                          </td>
                          <td className="p-4 text-center font-normal text-sm">
                            {time.task}
                          </td>
                          <td className="p-4 text-center font-normal text-sm">
                            {time.description.length > 25 ? `${time.description.slice(0, 25)}...` : time.description}

                          </td>
                          <td className="p-4 text-center font-normal text-sm">
                            {time.duration}
                          </td>
                          <td className="p-4 text-center font-normal text-sm">
                            <div className="flex items-center justify-center gap-4 w-fit">
                              <img
                                src={editIcon}
                                className="h-3 w-3 hover:cursor-pointer"
                                onClick={() => handleEditClick(time.id)}
                              ></img>
                              <img
                                src={deleteIcon}
                                className="hover:cursor-pointer"
                                onClick={() => handleDelete(time.id)}
                              ></img>
                            </div>
                          </td>
                        </tr>
                      )))
                      : (
                        <tr>
                          <td colSpan="7" className="text-center p-4 text-[#696A70]">
                            No records found.
                          </td>
                        </tr>)}
                  </React.Fragment>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      {deleteModal && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-auto p-10  shadow-lg">
            {isDeleting ? (
              <div className="px-4 flex gap-4">
                <div>
                  <ClipLoader
                    color={"#465062"}
                    loading={true}
                    size={35}
                    aria-label="Loading Spinner"
                    data-testid="Loader"
                  />
                </div>
                <div className="mt-2">Deleing Please wait..</div>
              </div>
            ) : (
              <div>
                <div className="text-[18px] text-[#373737]">
                  Are you sure to delete this data ?
                </div>
                <div className="flex gap-4 mt-8 w-fit ml-auto">
                  <button
                    className="bg-[#405170] hover:bg-[#232E42] w-[72px] h-[42px] text-white font-light rounded-[8px]"
                    onClick={handleDeleteModalCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#405170] hover:bg-[#232E42] w-[72px] h-[42px] text-white font-light rounded-[8px]"
                    onClick={handleDeleteModalConfirm}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <TimeSheetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddTimeSheet}
        setRefreshKey={setRefreshKey}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
    </div>
  );
}

export default TimeSheet;
