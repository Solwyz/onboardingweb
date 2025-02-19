import React, { useEffect, useState } from "react";
import leaveIcon from "../../../Assets/hrm/leaveBal.png";
import Api from "../../../Services/Api";

function LeaveManagement() {
  const [showForm, setShowForm] = useState(false);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [leaveBalances, setLeaveBalances] = useState({
    totalLeaves: 20,
    casualLeaves: 10,
    sickLeaves: 10,
    rejectedLeaves: 0,
  }); // Store leave balances
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    reportingManager: "",
  }); // Form data state
  const [isFormValid, setIsFormValid] = useState(false);
  const [apiError, setApiError] = useState("");

  const token = localStorage.getItem("token");
  console.log("token:", token)

  // Fetch Leave History and Balances
  useEffect(() => {
    if (!token) {
      console.error("Token is missing. Please log in.");
      setApiError("Authentication error: Token is missing.");
      return;
    }

    Api.get("api/leaveRequest/employee/7f000101-946d-1e64-8194-723468710044/leave-requests", {
      'Authorization': `Bearer ${token}`
    })
      .then((response) => {
        console.log("API for leave man:", response.data.data);
        setLeaveHistory(response.data.data || []);
        setLeaveBalances(response.data.content || leaveBalances);
        setApiError(""); // Clear any previous error
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          console.error("Unauthorized. Please check your token.");
          setApiError("Unauthorized access. Please check your login credentials.");
        } else {
          console.error("Error fetching leave data:", error);
          setApiError("Unable to fetch leave data. Please try again later.");
        }
      });
  }, [token]);

  // Form Field Change Handler
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "startDate" && formData.endDate && formData.endDate < value) {
      setFormData((prev) => ({
        ...prev,
        endDate: value,
      }));
    }
  };

  // Handle Leave Form Submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('formdataaa:', formData)

    const days =
      Math.ceil(
        (new Date(formData.endDate) - new Date(formData.startDate)) /
        (1000 * 60 * 60 * 24)
      ) + 1;

    if (days <= 0) {
      console.error("End date must be after start date.");
      return;
    }

    Api.post(
      "api/leaveRequest",
      {
        "employee": {
          "id": "7f000101-946d-1e64-8194-723468710044"
        },
        "startDate": formData.startDate,
        "endDate": formData.endDate,
        "reason": formData.reason,
        "leaveType": formData.leaveType,
        "reportingManager": formData.reportingManager
      },

      {
        'Authorization': `Bearer ${token}`

      })
      .then((response) => {
        console.log("post leave:", response)
        const newLeaveEntry = response.data;
        setLeaveHistory([...leaveHistory, newLeaveEntry]);

        // Update leave balances
        if (formData.leaveType === "Casual Leave") {
          setLeaveBalances((prev) => ({
            ...prev,
            totalLeaves: prev.totalLeaves - days,
            casualLeaves: prev.casualLeaves - days,
          }));
        } else if (formData.leaveType === "Sick Leave") {
          setLeaveBalances((prev) => ({
            ...prev,
            totalLeaves: prev.totalLeaves - days,
            sickLeaves: prev.sickLeaves - days,
          }));
        }

        // Reset form
        setShowForm(false);
        setFormData({
          leaveType: "",
          startDate: "",
          endDate: "",
          reason: "",
          reportingManager: "Aman",
        });
      })
      .catch((error) => {
        console.error("Error applying leave:", error.response?.data || error.message);
      });
  };

  // Today's date for date inputs
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  // Validate form
  useEffect(() => {
    const isValid =
      formData.leaveType &&
      formData.startDate &&
      formData.endDate &&
      formData.reason &&
      formData.reportingManager;
    setIsFormValid(isValid);
  }, [formData]);

  return (
    <div className="p-6 h-screen">
      {/* Header */}
      {/* <div className="flex justify-between">
        <div className="font-medium text-[#2B2342] text-[20px]">Leaves</div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-[118px] h-[48px] rounded-lg bg-[#2B2342] text-center text-white text-sm font-normal"
          >
            Apply Leave
          </button>
        )}
      </div> */}

      {/* Leave Summary */}
      <div className="flex justify-center gap-[55px] mt-[24px]">
        {[
          { type: "Total leaves", count: leaveBalances.totalLeaves },
          { type: "Casual leaves", count: leaveBalances.casualLeaves },
          { type: "Sick leaves", count: leaveBalances.sickLeaves },
          { type: "Rejected", count: leaveBalances.rejectedLeaves },
        ].map((leave, index) => (
          <div
            key={index}
            className="bg-white rounded-lg h-[132px] w-[224px] flex flex-col"
          >
            <h2 className="text-[20px] text-[#1255D0] font-medium mt-[20px] text-center">
              {leave.type}
            </h2>
            <div className="flex items-center mt-1">
              <div className="w-[47px] h-[47px] ml-[60px]">
                <img src={leaveIcon} alt={`${leave.type} icon`} />
              </div>
              <div className="text-[48px] font-medium text-[#000000] ml-[16px]">
                {leave.count}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Error Display */}
      {apiError && (
        <div className="text-red-600 text-sm mt-4">{apiError}</div>
      )}

      {/* Leave Form or History */}
      {showForm ? (
        <div className="bg-white p-4 mt-4">
          <h2 className="text-center text-[24px] font-medium">Apply for Leave</h2>
          <form onSubmit={handleFormSubmit}>
            {/* Leave Type */}
            <div className="mt-6">
              <label className="block text-[#373737] text-sm font-normal">
                Leave Type
              </label>
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleFormChange}
                className="w-[500px] h-[48px] focus:outline-[#A4A4E5] border border-[#E6E6E7] mt-4 text-sm text-[#696A70] font-normal rounded-lg px-3 py-2"
                required
              >
                <option value="">Select Leave Type</option>
                <option value="CASUAL">Casual Leave</option>
                <option value="SICK">Sick Leave</option>
              </select>
            </div>

            {/* Start Date and End Date */}
            <div className="flex mt-4">
              <div>
                <label className="block text-[#373737] text-sm font-normal">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleFormChange}
                  className="w-[500px] h-[48px] focus:outline-[#A4A4E5] mt-4 rounded-lg text-sm text-[#696A70] font-normal border border-[#E6E6E7] px-3 py-2"
                  min={getTodayDate()}
                  required
                />
              </div>
              <div className="ml-6">
                <label className="block text-[#373737] text-sm font-normal">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleFormChange}
                  className="w-[500px] h-[48px] focus:outline-[#A4A4E5] mt-4 rounded-lg text-sm text-[#696A70] font-normal border border-[#E6E6E7] px-3 py-2"
                  min={formData.startDate || getTodayDate()}
                  required
                />
              </div>
            </div>

            {/* Reason */}
            <div className="mt-4">
              <label className="block text-[#373737] text-sm font-normal">
                Reason
              </label>

              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleFormChange}
                className="w-full h-[96px] focus:outline-[#A4A4E5] mt-4 rounded-lg text-sm text-[#696A70] font-normal border border-[#E6E6E7] px-3 py-2"
                placeholder="Enter the reason for your leave"
                required
              />
            </div>

            {/* Reporting Manager */}
            <div className="mt-4">
              <label className="block text-[#373737] text-sm font-normal">
                Reporting Manager
              </label>
              <input
                type="text"
                name="reportingManager"
                value={formData.reportingManager}
                onChange={handleFormChange}
                className="w-[500px] h-[48px] focus:outline-[#A4A4E5] mt-4 rounded-lg text-sm text-[#696A70] font-normal border border-[#E6E6E7] px-3 py-2"

                required
              />
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-[118px] h-[48px] rounded-lg text-center text-white text-sm font-normal ${isFormValid ? "bg-[#2B2342]" : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="ml-4 w-[118px] h-[48px] rounded-lg bg-white border border-[#2B2342] text-[#2B2342] text-sm font-normal"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className='mt-14'>
          <h2 className="text-[16px] font-normal">Leave History</h2>

          <div className="bg-white h-screen p-6">
            <div className="rounded-t-lg overflow-hidden">
              {leaveHistory.length > 0 ? (
                <table className="min-w-full bg-white rounded-lg">
                  <thead className="bg-[#465062] p-4 text-center font-normal text-sm text-white">
                    <tr className="w-full">
                      <th className="p-4 text-left font-normal text-sm">Date</th>
                      <th className="p-4 text-left font-normal text-sm">Leave Type</th>
                      <th className="p-4 text-left font-normal text-sm">From</th>
                      <th className="p-4 text-left font-normal text-sm">To</th>
                      <th className="p-4 text-left font-normal text-sm">Days</th>
                      <th className="p-4 text-left font-normal text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#373737]">
                    {leaveHistory.map((leave, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white text-sm' : 'bg-gray-100 text-sm'}>
                        <td className="p-4 text-left font-normal text-sm">{leave.leaveType}</td>
                        <td className="p-4 text-left font-normal text-sm">{leave.leaveType}</td>
                        <td className="p-4 text-left font-normal text-sm">{leave.startDate}</td>
                        <td className="p-4 text-left font-normal text-sm">{leave.endDate}</td>
                        <td className="p-4 text-left font-normal text-sm">{leave.days}</td>
                        <td className={`p-4 text-left font-normal text-sm ${leave.status === "APPROVED"
                          ? "text-green-500"
                          : leave.status === "REJECTED"
                            ? "text-red-500"
                            : "text-orange-500"
                          }`}
                        >{leave.status ? leave.status : 'PENDING'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              ) : (
                <p className="text-center text-gray-500 mt-4">No leave history available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeaveManagement;
