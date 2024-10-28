import React, { useState, useEffect } from 'react';
import addIcon from '../../../Assets/HrTas/addIcon.svg';
import DropDown from '../../../Assets/HrTas/drop-down-arrow.svg';
import TimeSheetModal from './TimeSheetModal';
import SearchIcon from "../../../Assets/HrTas/searchIcon.svg";
import FilterIcon from "../../../Assets/HrTas/filter_alt.svg";
import GroupIcon from "../../../Assets/HrTas/GroupIcon.svg";

function TimeSheet() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('All Employees');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeSheetData, setTimeSheetData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [groupBy, setGroupBy] = useState('');
  const [employeeName, setEmployeeName] = useState('Aswin Sabu');

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);

    if (option === 'My Timesheet') {
      setEmployeeName('Reshma');
    } else {
      setEmployeeName('Aswin Sabu');
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTimeSheet = (newEntry) => {
    setTimeSheetData([...timeSheetData, newEntry]);
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterQuery(e.target.value);
  };

  const handleGroupChange = (e) => {
    setGroupBy(e.target.value);
  };

  // Filtered data based on selected option ("My Timesheet" or "All Employees")
  const filteredTimeSheetData = timeSheetData
    .filter(entry => {
      if (selectedOption === 'My Timesheet') {
        return entry.employeeName === 'Reshma';
      }
      return true;
    })
    .filter(entry => {
      return (
        entry.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .filter(entry => {
      return (
        entry.project.toLowerCase().includes(filterQuery.toLowerCase()) ||
        entry.task.toLowerCase().includes(filterQuery.toLowerCase()) ||
        entry.description.toLowerCase().includes(filterQuery.toLowerCase())
      );
    });

  const groupedTimeSheetData = filteredTimeSheetData.reduce((acc, entry) => {
    const key = groupBy === 'Project' ? entry.project : groupBy === 'Date' ? entry.date : 'Ungrouped';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(entry);
    return acc;
  }, {});

  return (
    <div className='bg-[#F8FAFB] pl-4 pt-4 pr-[34px] pb-[73px]'>
      <div className='bg-[#FFFFFF] w-full px-6 pb-[93px] h-screen'>
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='text-[20px] text-[#232E42] font-medium mt-[40px]'>
              Time Sheet
            </h2>
          </div>
          <div className='flex'>
            <div className='relative'>
              <button
                onClick={toggleDropdown}
                className='border flex items-center font-normal text-sm mt-[24px] text-[#373737] px-6 py-[10px] rounded-lg'
              >
                {selectedOption}
                <img src={DropDown} className='ml-[8px]' alt='Dropdown arrow' />
              </button>
              {showDropdown && (
                <div className='absolute top-full left-0 w-full bg-white border rounded-lg'>
                  {selectedOption !== 'All Employees' && (
                    <div
                      onClick={() => handleOptionSelect('All Employees')}
                      className='px-4 py-2 text-sm text-[#373737] hover:bg-gray-100 cursor-pointer'
                    >
                      All Employees
                    </div>
                  )}
                  {selectedOption !== 'My Timesheet' && (
                    <div
                      onClick={() => handleOptionSelect('My Timesheet')}
                      className='px-4 py-2 text-sm text-[#373737] hover:bg-gray-100 cursor-pointer'
                    >
                      My Timesheet
                    </div>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={handleOpenModal}
              className='bg-[#2B2342] flex items-center ml-6 font-normal text-sm mt-[24px] text-white px-6 py-[14px] rounded-lg'
            >
              <img src={addIcon} className='mr-[8px]' alt='Add icon' />
              Create
            </button>
          </div>
        </div>

        {filteredTimeSheetData.length === 0 ? (
          <div className='mt-[300px] justify-center items-center flex text-center text-[#696A70]'>
            No entries available. Click "Create" to add a new timesheet entry.
          </div>
        ) : (
          <>
            {/* Search, Filter, and Group By */}
            <div className='flex gap-2 text-[14px] placeholder:text-[14px] mt-9'>
              <div className='border rounded-lg w-[232px] py-[14px] pl-4 text-[#696A70] flex'>
                <img className='mr-2' src={SearchIcon} alt="" />
                <input
                  type='text'
                  placeholder='Search'
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className='outline-none w-full'
                />
              </div>
              <div className='border rounded-lg w-[96px] py-[14px] pl-4 text-[#696A70] flex'>
                <img className='mr-2' src={FilterIcon} alt="" />
                <input
                  type='text'
                  placeholder='Filter'
                  value={filterQuery}
                  onChange={handleFilterChange}
                  className='outline-none w-full'
                />
              </div>
              <div className='border rounded-lg w-[125px] py-4 pl-4 pr-1 text-[#696A70] flex'>
                <img className='' src={GroupIcon} alt="" />
                <select
                  value={groupBy}
                  onChange={handleGroupChange}
                  className='outline-none w-full bg-white'
                >
                  <option value=''>Group By</option>
                  <option value='Project'>Project</option>
                  <option value='Date'>Date</option>
                </select>
              </div>
            </div>

            {/* TimeSheet Table */}
            <div className='rounded-t-lg overflow-hidden mt-6'>
              <table className='min-w-full bg-white rounded-lg'>
                <thead className="bg-[#465062] p-4 text-center font-normal text-sm text-white">
                  <tr className='w-full'>
                    <th className="p-4 text-center font-normal text-sm">Date</th>
                    <th className="p-4 text-center font-normal text-sm">Name</th>
                    <th className="p-4 text-center font-normal text-sm">Project</th>
                    <th className="p-4 text-center font-normal text-sm">Task</th>
                    <th className="p-4 text-center font-normal text-sm">Description</th>
                    <th className="p-4 text-center font-normal text-sm">Duration (Hours)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(groupedTimeSheetData).map(([group, entries], index) => (
                    <React.Fragment key={group}>
                      {entries.map((entry, entryIndex) => (
                        <tr
                          key={entryIndex}
                          className={`${entryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'} border-b`}
                        >
                          <td className='p-4 text-center font-normal text-sm'>{entry.date}</td>
                          <td className='p-4 text-center font-normal text-sm'>{entry.employeeName}</td>
                          <td className='p-4 text-center font-normal text-sm'>{entry.project}</td>
                          <td className='p-4 text-center font-normal text-sm'>{entry.task}</td>
                          <td className='p-4 text-center font-normal text-sm'>{entry.description}</td>
                          <td className='p-4 text-center font-normal text-sm'>{`${entry.hour}h ${entry.minute}m`}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <TimeSheetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddTimeSheet}
        employeeName={employeeName}
      />
    </div>
  );
}

export default TimeSheet;
