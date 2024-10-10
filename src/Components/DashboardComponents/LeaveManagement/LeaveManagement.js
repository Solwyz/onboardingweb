import React, { useState } from "react";

function LeaveManagement() {
  const [leaveData, setLeaveData] = useState({
    leaveType: "",
    leaveBalance: {
      Sick: 10,
      Casual: 5,
      Vacation: 15,
    },
    startDate: "",
    endDate: "",
    reason: "",
    approvingManager: "Ratan T",
    leaveStatus: "Pending",
    leaveHistory: [
      {
        leaveType: "Sick",
        startDate: "2023-08-10",
        endDate: "2023-08-12",
        leaveStatus: "Approved",
      },
      {
        leaveType: "Vacation",
        startDate: "2023-09-05",
        endDate: "2023-09-10",
        leaveStatus: "Rejected",
      },
    ],
  });

  // Function to calculate difference in days
  const calculateLeaveDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    if (diffTime >= 0) {
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Including both start and end date
    }
    return 0; // Invalid range
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({
      ...leaveData,
      [name]: value,
    });
  };

  // Disable past dates
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();

    const leaveDays = calculateLeaveDays(leaveData.startDate, leaveData.endDate);
    const updatedBalance = leaveData.leaveBalance[leaveData.leaveType] - leaveDays;

    if (leaveDays === 0) {
      alert("Invalid date range. Please check your start and end dates.");
      return;
    }

    if (updatedBalance >= 0) {
      const newLeaveEntry = {
        leaveType: leaveData.leaveType,
        startDate: leaveData.startDate,
        endDate: leaveData.endDate,
        leaveStatus: "Pending",
      };

      setLeaveData((prevState) => ({
        ...prevState,
        leaveBalance: {
          ...prevState.leaveBalance,
          [leaveData.leaveType]: updatedBalance,
        },
        leaveHistory: [...prevState.leaveHistory, newLeaveEntry],
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
      }));

      alert("Leave request submitted!");
    } else {
      alert("Insufficient leave balance.");
    }
  };

  // Check if all form fields are filled
  const isFormValid = leaveData.leaveType && leaveData.startDate && leaveData.endDate && leaveData.reason;

  return (
    <div className="min-h-screen w-full">
      {/* Leave Dashboard */}
      <div className="w-full p-4 bg-gray-100 shadow-md mb-6">
        <h3 className="text-2xl font-semibold mb-2">Leave Dashboard</h3>
        <div className="flex gap-4">
          {Object.entries(leaveData.leaveBalance).map(([type, balance], idx) => (
            <div key={idx} className={`p-4 rounded-lg ${type === 'Sick' ? 'bg-blue-100' : type === 'Casual' ? 'bg-green-100' : 'bg-yellow-100'}`}>
              <h4 className={`font-semibold ${type === 'Sick' ? 'text-blue-700' : type === 'Casual' ? 'text-green-700' : 'text-yellow-700'}`}>{type} Leave</h4>
              <p className="text-xl">{balance} days</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-8xl mx-auto p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Leave Management</h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Leave Request Form */}
          <div className="flex-1 p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Request Leave</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Leave Type</label>
                <select
                  name="leaveType"
                  value={leaveData.leaveType}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded border border-gray-300"
                >
                  <option value="">Select Leave Type</option>
                  {Object.entries(leaveData.leaveBalance).map(([type, balance], idx) => (
                    <option key={idx} value={type} disabled={balance <= 0}>
                      {type} ({balance} days)
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Date and End Date */}
              <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <label className="block mb-2 font-semibold">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={leaveData.startDate}
                    onChange={handleInputChange}
                    required
                    min={today} // Disable past dates including today
                    className="w-full p-3 rounded border border-gray-300"
                  />
                </div>

                <div className="flex-1">
                  <label className="block mb-2 font-semibold">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={leaveData.endDate}
                    onChange={handleInputChange}
                    required
                    min={leaveData.startDate || today} // Disable past dates and ensure end date is after start date
                    className="w-full p-3 rounded border border-gray-300"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-semibold">Reason</label>
                <textarea
                  name="reason"
                  value={leaveData.reason}
                  onChange={handleInputChange}
                  required
                  className="w-full h-32 p-3 rounded border border-gray-300"
                  placeholder="State the reason for leave"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-semibold">Approving Manager</label>
                <input
                  type="text"
                  name="approvingManager"
                  value={leaveData.approvingManager}
                  onChange={handleInputChange}
                  disabled
                  className="w-full p-3 rounded border border-gray-300"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-2 text-white font-semibold rounded-lg transition duration-200 ${
                  isFormValid
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isFormValid} // Disable submit button if form is not valid
              >
                Submit Leave Request
              </button>
            </form>
          </div>

          {/* Leave History Section */}
          <div className="flex-1 p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Leave History</h3>
            {leaveData.leaveHistory.length > 0 ? (
              <ul className="divide-y divide-gray-300">
                {leaveData.leaveHistory.map((leave, index) => (
                  <li key={index} className="py-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">
                        {leave.leaveType} Leave
                      </span>
                      <span
                        className={`${
                          leave.leaveStatus === "Approved"
                            ? "text-green-600"
                            : leave.leaveStatus === "Rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        } font-semibold`}
                      >
                        {leave.leaveStatus}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      From {leave.startDate} to {leave.endDate}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">No leave history available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveManagement;
