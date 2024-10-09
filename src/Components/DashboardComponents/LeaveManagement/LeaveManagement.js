import React, { useState } from "react";

function LeaveManagement() {
  const [leaveData, setLeaveData] = useState({
    leaveType: "",
    leaveBalance: 10,
    startDate: "",
    endDate: "",
    reason: "",
    approvingManager: "",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({
      ...leaveData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLeaveEntry = {
      leaveType: leaveData.leaveType,
      startDate: leaveData.startDate,
      endDate: leaveData.endDate,
      leaveStatus: "Pending",
    };

    setLeaveData((prevState) => ({
      ...prevState,
      leaveHistory: [...prevState.leaveHistory, newLeaveEntry],
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
      approvingManager: "",
    }));

    alert("Leave request submitted!");
  };

  return (
    <div className="min-h-screen w-[1260px]">
      <div className="w-8xl mx-auto p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Leave Management
        </h2>

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
                  <option value="Sick">Sick</option>
                  <option value="Casual">Casual</option>
                  <option value="Vacation">Vacation</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-semibold">Leave Balance</label>
                <input
                  type="number"
                  name="leaveBalance"
                  value={leaveData.leaveBalance}
                  onChange={handleInputChange}
                  disabled
                  className="w-full p-3 rounded border border-gray-300 bg-gray-200"
                />
              </div>

              {/* Start Date and End Date on the same line */}
              <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <label className="block mb-2 font-semibold">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={leaveData.startDate}
                    onChange={handleInputChange}
                    required
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
                  required
                  className="w-full p-3 rounded border border-gray-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
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
