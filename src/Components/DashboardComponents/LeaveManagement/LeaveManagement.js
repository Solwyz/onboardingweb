import React, { useEffect, useState } from 'react';
import leaveIcon from "../../../Assets/hrm/leaveBal.png";

function LeaveManagement() {
  const [showForm, setShowForm] = useState(false);
  const [leaveHistory, setLeaveHistory] = useState([
    { id: 1, date: '24/07/2024', type: 'Casual Leave', from: '24/07/2024', to: '24/07/2024', days: 1, status: 'Approved' },
  ]);
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    reportingManager: 'Arjun JS'
  });
  const [leaveBalances, setLeaveBalances] = useState({
    totalLeaves: 20,
    casualLeaves: 10,
    sickLeaves: 10,
    rejectedLeaves: 0
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleApplyLeaveClick = () => {
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "startDate" && formData.endDate < value) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        endDate: value
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const days = Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) + 1;

    const newLeaveEntry = {
      id: leaveHistory.length + 1,
      date: new Date().toLocaleDateString(),
      type: formData.leaveType,
      from: formData.startDate,
      to: formData.endDate,
      days: days,
      status: 'Pending'
    };

    setLeaveHistory([...leaveHistory, newLeaveEntry]);

    if (formData.leaveType === 'Casual Leave') {
      setLeaveBalances((prevBalances) => ({
        ...prevBalances,
        totalLeaves: prevBalances.totalLeaves - days,
        casualLeaves: prevBalances.casualLeaves - days
      }));
    } else if (formData.leaveType === 'Sick Leave') {
      setLeaveBalances((prevBalances) => ({
        ...prevBalances,
        totalLeaves: prevBalances.totalLeaves - days,
        sickLeaves: prevBalances.sickLeaves - days
      }));
    }

    setShowForm(false);
    setFormData({
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: '',
      reportingManager: 'Arjun JS'
    });
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  useEffect(() => {
    const isValid = formData.leaveType && formData.startDate && formData.endDate && formData.reason && formData.reportingManager;
    setIsFormValid(isValid);
  }, [formData]);

  return (
    <div className="p-6 h-screen">
      <div className='flex justify-between'>
        <div className='font-medium text-[#2B2342] text-[20px]'>Leaves</div>
        {!showForm && (
    <button
      onClick={handleApplyLeaveClick}
      className="w-[118px] h-[48px] rounded-lg bg-[#2B2342] text-center text-white text-sm font-normal"
    >
      Apply Leave
    </button>
  )}
      </div>

      {/* Leave Summary Cards */}
      <div className="flex justify-center gap-[55px] mt-[24px]">
        {[
          { type: 'Total leaves', count: leaveBalances.totalLeaves },
          { type: 'Casual leaves', count: leaveBalances.casualLeaves },
          { type: 'Sick leaves', count: leaveBalances.sickLeaves },
          { type: 'Rejected', count: leaveBalances.rejectedLeaves },
        ].map((leave, index) => (
          <div key={index} className="bg-white rounded-lg h-[132px] w-[224px] flex flex-col">
            <h2 className="text-[20px] text-[#1255D0] font-medium mt-[20px] text-center">{leave.type}</h2>
            <div className="flex items-center mt-1">
              <div className="w-[47px] h-[47px] ml-[60px]">
                <img src={leaveIcon} alt={`${leave.type} icon`} />
              </div>
              <div className="text-[48px] font-medium text-[#000000] ml-[16px]">{leave.count}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Conditional Section for Leave History or Apply Form */}
      {!showForm ? (
        <div className='mt-[16px]'>
          {/* Leave History Table */}
          <h2 className="text-[16px] font-normal text-[#000000]">Leave History</h2>
          <div className='bg-white p-6 mt-4 h-screen'>
            <div className="overflow-x-auto mt-[16px] rounded-t-lg">
              <table className="w-full border-none">
                <thead className="bg-[#465062] h-[50px] text-white">
                  <tr>
                    <th className="p-4 text-left font-normal text-sm">Date</th>
                    <th className="p-4 text-left font-normal text-sm">Leave Type</th>
                    <th className="p-4 text-left font-normal text-sm">From</th>
                    <th className="p-4 text-left font-normal text-sm">To</th>
                    <th className="p-4 text-left font-normal text-sm">Days</th>
                    <th className="p-4 text-left font-normal text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveHistory.map((leave) => (
                    <tr key={leave.id} className="border-b hover:bg-[#F9F9F9] text-[#373737] font-light">
                      <td className="p-4 text-left text-sm">{leave.date}</td>
                      <td className="p-4 text-left text-sm">{leave.type}</td>
                      <td className="p-4 text-left text-sm">{leave.from}</td>
                      <td className="p-4 text-left text-sm">{leave.to}</td>
                      <td className="p-4 text-left text-sm">{leave.days}</td>
                      <td className={`p-4 font-normal ${leave.status === 'Approved' ? 'text-[#0DC606]' : 'text-[#FF0000]'}`}>{leave.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 mt-4">
          <h2 className="text-center text-[24px] font-medium">Apply for Leave</h2>
          <div className='text-start text-lg text-[#2B2342] font-medium mt-[32px]'>Request Leave</div>
          <form onSubmit={handleFormSubmit}>
            <div className="mt-6">
              <label className="block text-[#373737] text-sm font-normal">Leave Type</label>
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleFormChange}
                className="w-[500px] h-[48px] focus:outline-[#A4A4E5] border border-[#E6E6E7] mt-4 text-sm text-[#696A70] font-normal rounded-lg px-3 py-2"
                required
              >
                <option value="">Select Leave Type</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
              </select>
            </div>
            <div className="flex mt-4">
              <div>
                <label className="block text-[#373737] text-sm font-normal">Start Date</label>
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
              <div className='ml-[17px]'>
                <label className="block text-[#373737] text-sm font-normal">End Date</label>
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
            <div className="mt-4">
              <label className="block text-[#373737] text-sm font-normal">Reason</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleFormChange}
                className="w-[1014px] h-[100px] focus:outline-[#A4A4E5] mt-4 rounded-lg text-sm text-[#696A70] font-normal border border-[#E6E6E7] px-3 py-2"
                placeholder="Leave Reason"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-[#373737] text-sm font-normal">Reporting Manager</label>
              <input
                type="text"
                name="reportingManager"
                value={formData.reportingManager}
                readOnly
                className="w-[500px] h-[48px] focus:outline-[#A4A4E5] mt-4 rounded-lg text-sm text-[#696A70] font-normal border border-[#E6E6E7] px-3 py-2"
              />
            </div>
            <div className='mt-[56px]'>
              <button
                type="submit" 
                className={`bg-[#2B2342] text-white text-[14px] font-normal py-2 px-6 rounded-lg ${isFormValid ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                onClick={isFormValid ? handleFormSubmit : null} 
              >
               Apply
              </button>

            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default LeaveManagement;
