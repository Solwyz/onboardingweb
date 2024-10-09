import React, { useState } from 'react';

function AttendanceManagement() {
  const attendanceData = [
    {
      date: "2024-10-09",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      totalHours: "8h",
      workShift: "Morning",
      overtime: "1h",
      status: "Present",
      lateMarking: "no"
    },
    {
      date: "2024-10-08",
      clockIn: "09:30 AM",
      clockOut: "05:00 PM",
      totalHours: "7.5h",
      workShift: "Morning",
      overtime: "0h",
      status: "Present",
      lateMarking: "no"
    }
  ];

  
  const monthlyData = [
    {
      year: 2024,
      month: "October",
      totalHoursWorked: "160 hr",
      workShift: "Morning",
      overtimeHours: "8hr",
      attendanceStatus: "90%",
      lateMarking: 2,
      leaveDays: 1
    },
    {
      year: 2024,
      month: "November",
      totalHoursWorked: "140 hr",
      workShift: "Night",
      overtimeHours: "4hr",
      attendanceStatus: "90%",
      lateMarking: 3,
      leaveDays: 4
    },
    
  ];


  const [selectedDate, setSelectedDate] = useState(attendanceData[0].date);
  const [selectedYear, setSelectedYear] = useState(2024);

  // Find the attendance record based on the selected date
  const attendanceForSelectedDate = attendanceData.find(
    (record) => record.date === selectedDate
  );

  // Filter monthly data based on selected year
  const filteredMonthlyData = monthlyData.filter(data => data.year === selectedYear);

  return (
    <div className="container border mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="text-3xl font-bold text-gray-800 mb-6 mt-4 text-center">Attendance Management</div>

      {/* Date picker */}
      <div className="mb-8 flex items-center justify-center">
        <label className="text-lg font-medium mr-4" htmlFor="attendanceDate">Select Date:</label>
        <input
          type="date"
          id="attendanceDate"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Display daily attendance data */}
      {attendanceForSelectedDate ? (
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-gray-50 rounded-lg shadow-md">
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-4 font-medium text-gray-700">Attendance Date</td>
                <td className="px-6 py-4">:</td>
                <td className="px-6 py-4">{attendanceForSelectedDate.date}</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4 font-medium text-gray-700">Clocked-In at</td>
                <td className="px-6 py-4">:</td>
                <td className="px-6 py-4">{attendanceForSelectedDate.clockIn}</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4 font-medium text-gray-700">Clocked-Out at</td>
                <td className="px-6 py-4">:</td>
                <td className="px-6 py-4">{attendanceForSelectedDate.clockOut}</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4 font-medium text-gray-700">Total Hours Worked</td>
                <td className="px-6 py-4">:</td>
                <td className="px-6 py-4">{attendanceForSelectedDate.totalHours}</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4 font-medium text-gray-700">Work Shift</td>
                <td className="px-6 py-4">:</td>
                <td className="px-6 py-4">{attendanceForSelectedDate.workShift}</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4 font-medium text-gray-700">Overtime Hours</td>
                <td className="px-6 py-4">:</td>
                <td className="px-6 py-4">{attendanceForSelectedDate.overtime}</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4 font-medium text-gray-700">Attendance Status</td>
                <td className="px-6 py-4">:</td>
                <td className="px-6 py-4">{attendanceForSelectedDate.status}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-700">Late Marking</td>
                <td className="px-6 py-4">:</td>
                <td className="px-6 py-4">{attendanceForSelectedDate.lateMarking}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-lg text-red-500 text-center mb-8">No attendance data available for the selected date.</div>
      )}



      {/* Monthly report section */}
      <div className="text-2xl font-bold text-gray-800 mb-4 mt-32 text-center">Monthly Attendance Report for {selectedYear}</div>

      
      <div className="mb-8 flex items-center justify-center">
        <label className="text-lg font-medium mr-4" htmlFor="attendanceYear">Select Year:</label>
        <select
          id="attendanceYear"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
          {/* Add more years as needed */}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-4 text-left font-medium text-gray-700">Month</th>
              <th className="px-6 py-4 text-left font-medium text-gray-700">Total Hours Worked</th>
              <th className="px-6 py-4 text-left font-medium text-gray-700">Work Shift</th>
              <th className="px-6 py-4 text-left font-medium text-gray-700">Overtime Hours</th>
              <th className="px-6 py-4 text-left font-medium text-gray-700">Attendance Status</th>
              <th className="px-6 py-4 text-left font-medium text-gray-700">Late Marking</th>
              <th className="px-6 py-4 text-left font-medium text-gray-700">Leave Days</th>
            </tr>
          </thead>
          <tbody>
            {filteredMonthlyData.length > 0 ? (
              filteredMonthlyData.map((monthReport, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4">{monthReport.month}</td>
                  <td className="px-6 py-4">{monthReport.totalHoursWorked}</td>
                  <td className="px-6 py-4">{monthReport.workShift}</td>
                  <td className="px-6 py-4">{monthReport.overtimeHours}</td>
                  <td className="px-6 py-4">{monthReport.attendanceStatus}</td>
                  <td className="px-6 py-4">{monthReport.lateMarking}</td>
                  <td className="px-6 py-4">{monthReport.leaveDays}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No data available for the selected year.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceManagement;
