import React, { useState } from "react";
import DropDown from "../../../Assets/HrTas/drop-down-arrow.svg";
import Star from "../../../Assets/HrTas/stars-white.svg";
import { useEffect } from "react";
import Api from "../../../Services/Api";

const token = localStorage.getItem("token");
console.log("token:", token);

function Perfomance() {
  const [showTable, setShowTable] = useState(false);
  const [showSecondTable, setShowSecondTable] = useState(false);
  const [ratingsData, setRatingsData] = useState([]);
  const [rating, setRating] = useState("8"); // Default rating
  const [feedback, setFeedback] = useState("");

  const [newData, setNewData] = useState([]);

  const [branch, setBranch] = useState("All");
  const [shift, setShift] = useState("Day");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState("January"); // Default month

  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [shiftDropdownOpen, setShiftDropdownOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);

  const [branches, setBranches] = useState([]); // State for branches
  const shifts = ["Day", "Night"];
  const years = Array.from(
    { length: new Date().getFullYear() - 1999 },
    (_, i) => 2020 + i
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  

  useEffect(() => {
    Api.get("api/performance", {
      Authorization: `Bearer ${token}`,
    }).then((response) => {
      console.log("pppp:", response.data.content);
      setNewData(response.data.content);
    });
  
   // Fetch branch data
   Api.get('api/branch?pageNo=0&pageSize=100&sortDir=ASC', {
   'Authorization': `Bearer ${token}` ,
})
.then(response => {
    console.log('Branches:', response.data.content);
    setBranches(response.data.content); // Set the fetched branches
})
}, []);

  const handleAddRatingClick = () => {
    setShowTable(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Api.post(
      "api/performance",
      {
        id: "7f000001-9404-194c-8194-06f6f8a00009",
        rating: "4",
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    // Store the submitted rating and feedback for a specific month
    const newEntry = {
      id: "", // Replace with dynamic ID as needed
      name: "", // Replace with dynamic name as needed
      email: "", // Replace with dynamic email as needed
      manager: "", // Replace with dynamic manager as needed
      ratings: { [month]: rating }, // Store rating for the selected month
      feedback: feedback,
    };

    // Check if the entry already exists and update it
    const existingEntryIndex = ratingsData.findIndex(
      (entry) => entry.id === newEntry.id
    );
    if (existingEntryIndex !== -1) {
      const updatedRatingsData = [...ratingsData];
      updatedRatingsData[existingEntryIndex].ratings[month] = rating; // Update specific month rating
      setRatingsData(updatedRatingsData);
    } else {
      setRatingsData([...ratingsData, newEntry]); // Add new entry
    }

    setRating(8); // Reset rating
    setFeedback(""); // Reset feedback
    setShowTable(false);
    setShowSecondTable(true);
  };

  const calculateTotalRating = (ratings) => {
    return ratings.reduce((total, rating) => total / rating);
  };

  const toggleBranchDropdown = () => {
    setBranchDropdownOpen(!branchDropdownOpen);
  };

  const toggleShiftDropdown = () => {
    setShiftDropdownOpen(!shiftDropdownOpen);
  };

  const toggleYearDropdown = () => {
    setYearDropdownOpen(!yearDropdownOpen);
  };
  const toggleMonthDropdown = () => setMonthDropdownOpen(!monthDropdownOpen);

 

const handleBranchSelect = (branch) => {
    setBranch(branch);
    setBranchDropdownOpen(false);
};

  const handleShiftSelect = (shift) => {
    setShift(shift);
    setShiftDropdownOpen(false);
  };

  const handleYearSelect = (year) => {
    setYear(year);
    setYearDropdownOpen(false);
  };
  const handleMonthSelect = (month) => {
    setMonth(month);
    setMonthDropdownOpen(false);
  };

  return (
    <div className="bg-[#F8FAFB] pl-4 pt-4 pr-[34px] pb-[73px]">
      <div className="bg-[#FFFFFF] w-full px-6 pb-[93px] h-screen">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-[20px] text-[#232E42] font-medium mt-[40px]">
              {!showTable ? "Performance Rating" : "Add Rating"}
            </h2>
          </div>
          <div className="flex">
            {!showTable ? (
              <button
                onClick={handleAddRatingClick}
                className="bg-[#2B2342] flex items-center ml-6 font-normal text-sm mt-[24px] text-white px-6 py-4 rounded-lg"
              >
                <img src={Star} className="mr-[8px]" alt="Add icon" />
                Add Rating
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex text-[14px] gap-4 mt-[34px]">
        <div className="text-[#696A70]">
  Branch
  <div className="mt-2 relative">
    <button
      onClick={toggleBranchDropdown}
      className="flex border items-center px-4 py-[14px] rounded-lg text-[#696A70]"
    >
      {branch} <img className="ml-[39px]" src={DropDown} alt="" />
    </button>
    {branchDropdownOpen && (
      <div className="absolute bg-white border rounded-lg mt-1 z-10">
        {branches.map((branchItem) => (
          <div
            key={branchItem.id}
            onClick={() => handleBranchSelect(branchItem.name)}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
          >
            {branchItem.name}
          </div>
        ))}
      </div>
    )}
  </div>
</div>
          {/* <div className="text-[#696A70]">
            Shift
            <div className="mt-2">
              <button
                onClick={toggleShiftDropdown}
                className="flex border items-center px-4 py-[14px] rounded-lg text-[#696A70]"
              >
                {shift} <img className="ml-[39px]" src={DropDown} alt="" />
              </button>
              {shiftDropdownOpen && (
                <div className="absolute bg-white border rounded-lg mt-1">
                  {shifts.map((shiftItem) => (
                    <div
                      key={shiftItem}
                      onClick={() => handleShiftSelect(shiftItem)}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {shiftItem}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div> */}
          <div className="text-[#696A70]">
            Year
            <div className="mt-2">
              <button
                onClick={toggleYearDropdown}
                className="flex border items-center px-4 py-[14px] rounded-lg text-[#696A70]"
              >
                {year} <img className="ml-[39px]" src={DropDown} alt="" />
              </button>
              {yearDropdownOpen && (
                <div className="absolute bg-white border rounded-lg mt-1">
                  {years.map((yearItem) => (
                    <div
                      key={yearItem}
                      onClick={() => handleYearSelect(yearItem)}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {yearItem}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {showTable && (
            <div className="text-[#696A70]">
              Month
              <div className="mt-2">
                <button
                  onClick={toggleMonthDropdown}
                  className="flex border items-center px-4 py-[14px] rounded-lg text-[#696A70]"
                >
                  {month} <img className="ml-[39px]" src={DropDown} alt="" />
                </button>
                {monthDropdownOpen && (
                  <div className="absolute bg-white border rounded-lg mt-1">
                    {months.map((monthItem) => (
                      <div
                        key={monthItem}
                        onClick={() => handleMonthSelect(monthItem)}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {monthItem}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="text-white">
            <div>"</div>
            <div className="mt-2">
              <button className="flex border items-center px-4 py-[14px] rounded-lg text-white bg-[#2B2342]">
                Get Employee List
              </button>
            </div>
          </div>
        </div>

        {showTable ? (
          <div className="mt-6">
            <form onSubmit={handleSubmit}>
              <table className="w-full mt-4 border border-separate text-[16px] border-spacing-0">
                <thead className="bg-[#4A5061] text-white rounded-t-lg">
                  <tr>
                    <th className="p-2 text-[14px] font-medium rounded-tl-lg">
                      ID
                    </th>
                    <th className="p-2 text-[14px] font-medium">Name</th>
                    <th className="p-2 text-[14px] font-medium ">Email</th>
                    <th className="p-2 text-[14px] font-medium">Manager</th>

                    <th className="p-2 text-[14px] font-medium ">Rating</th>
                    <th className="p-2 text-[14px] font-medium rounded-tr-lg">
                      Remarks
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white text-[#232E42] text-center">
                  {newData.map((entry, index) => (
                    <tr className="border-b">
                      <td className="p-2 text-[14px] font-medium">
                        {entry.id}
                      </td>
                      <td className="p-2 text-[14px] font-medium">
                        {entry.employee?.name}
                      </td>
                      <td className="p-2 text-[14px] font-medium">
                        {entry.manager?.email}
                      </td>
                      <td className="p-2 text-[14px] font-medium">
                        {entry.manager?.basicDetails?.firstName}
                      </td>
                      <td className="p-2 text-[14px] font-medium">
                        <select
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          className=" p-1"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      </td>
                      <td className="p-2 text-[14px] font-medium">
                        <input
                          type="text"
                          placeholder="Add feedback here"
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          className="p-2 text-[14px] font-medium "
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="mt-6">
            <table className="w-full mt-4 border-separate text-[14px] border-spacing-0">
              <thead className="bg-[#4A5061] text-white rounded-t-lg">
                <tr>
                  <th className="p-2 text-[14px] font-normal rounded-tl-lg">
                    ID
                  </th>
                  <th className="p-2 text-[14px] font-normal">Name</th>
                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ].map((month, index) => (
                    <th key={index} className="p-2 text-[14px] font-normal">
                      {month}
                    </th>
                  ))}
                  <th className="p-2 text-[14px] font-normal rounded-tr-lg">
                    Total Rating
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {newData?.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#F8F8F8]"}
                  >
                    <td className="p-2 text-[14px] font-normal">{entry.id}</td>
                    <td className="p-2 text-[14px] font-normal">
                      {entry.employee?.name}
                    </td>
                    {months.map((month) => {
                      const rating = entry.rating;
                      return (
                        <td
                          key={`${entry.id}-${month}`}
                          className={`p-2 ${
                            rating >= 6
                              ? "bg-[#B8E986]"
                              : rating >= 1
                              ? "bg-[#F2C94C]"
                              : rating !== undefined
                              ? "bg-[#FF8A80]"
                              : ""
                          }`}
                        >
                          {rating !== undefined ? rating : "-"}
                        </td>
                      );
                    })}
                    <td className="p-2 text-[14px] font-normal">
                      {entry.rating}/10
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Perfomance;
