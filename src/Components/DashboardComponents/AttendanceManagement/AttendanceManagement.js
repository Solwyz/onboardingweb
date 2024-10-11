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
      overtimeHours: "8 hr",
      attendanceStatus: "90%",
      lateMarking: 2,
      leaveDays: 1
    },
    {
      year: 2024,
      month: "November",
      totalHoursWorked: "140 hr",
      workShift: "Night",
      overtimeHours: "4 hr",
      attendanceStatus: "85%",
      lateMarking: 3,
      leaveDays: 4
    },
    {
      year: 2025,
      month: "January",
      totalHoursWorked: "150 hr",
      workShift: "Morning",
      overtimeHours: "6 hr",
      attendanceStatus: "92%",
      lateMarking: 1,
      leaveDays: 2
    }
  ];

  const [selectedDate, setSelectedDate] = useState(attendanceData[0].date);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState("October");

  // Find the attendance record based on the selected date
  const attendanceForSelectedDate = attendanceData.find(
    (record) => record.date === selectedDate
  );

  // Find the attendance record based on the selected year and month
  const attendanceForSelectedMonth = monthlyData.find(
    (data) => data.year === selectedYear && data.month === selectedMonth
  );

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
        <div className="text-lg text-gray-400 text-center mt-20 mb-8">No attendance data available for the selected date.</div>
      )}

      {/* Monthly report section */}
      <div className="text-2xl font-bold text-gray-800 mb-4 mt-32 text-center">Monthly Attendance Report</div>

      <div className="mb-8 flex items-center justify-center">
        <label className="text-lg font-medium mr-4" htmlFor="attendanceYear">Select Year:</label>
        <select
          id="attendanceYear"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
        >
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
        </select>

        <label className="text-lg font-medium ml-8 mr-4" htmlFor="attendanceMonth">Select Month:</label>
        <select
          id="attendanceMonth"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      {/* Display monthly attendance report */}
      {attendanceForSelectedMonth ? (
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-gray-50 rounded-lg shadow-md">
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-4 font-medium text-gray-700">Month</td>
                <td className="px-6 py-4">:</td>
                <td className="px-6 py-4">{attendanceForSelectedMonth.month}</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4 font-medium text-gray-700">Total Hours Worked</td>
                <td className="px-6 py-4">:</td>
                <td className="px-6 py-4">{attendanceForSelectedMonth.totalHoursWorked}</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4 font-medium text-gray-700">Work Shift</td>
                <td className="px-6 py-4">:</td>
                <td className="px-6 py-4">{attendanceForSelectedMonth.workShift}</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4 font-medium text-gray-700">Overtime Hours</td>
                <td className="px-6 py-4">:</td>
                <td className="px-6 py-4">{attendanceForSelectedMonth.overtimeHours}</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4 font-medium text-gray-700">Attendance Status</td>
                <td className="px-6 py-4">:</td>
                <td className="px-6 py-4">{attendanceForSelectedMonth.attendanceStatus}</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-4 font-medium text-gray-700">Late Marking</td>
                <td className="px-6 py-4">:</td>
                <td className="px-6 py-4">{attendanceForSelectedMonth.lateMarking}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-700">Leave Days</td>
                <td className="px-6 py-4">:</td>
                <td className="px-6 py-4">{attendanceForSelectedMonth.leaveDays}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-lg text-gray-400 text-center mt-20 mb-20">No data available for the selected month.</div>
      )}
    </div>
  );
}

export default AttendanceManagement;
