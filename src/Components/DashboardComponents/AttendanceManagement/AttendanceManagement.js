import React, { useState } from 'react';

function AttendanceManagement() {

  const dailyAttendanceData = [
    {
      date: "2024-10-09",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      totalHours: "8h",
      workShift: "Morning",
      overtime: "1h",
      status: "Present",
      lateMarking: "no",
      year: 2024,
      month: "October",
    },
    {
      date: "2024-10-08",
      clockIn: "09:30 AM",
      clockOut: "05:00 PM",
      totalHours: "8h",
      workShift: "Morning",
      overtime: "0h",
      status: "Present",
      lateMarking: "no",
      year: 2024,
      month: "October",
    },
    {
      date: "2024-11-01",
      clockIn: "09:15 AM",
      clockOut: "05:30 PM",
      totalHours: "8h",
      workShift: "Night",
      overtime: "0.5h",
      status: "Present",
      lateMarking: "yes",
      year: 2024,
      month: "November",
    },
    
  ];

  const [selectedDate, setSelectedDate] = useState(dailyAttendanceData[0].date);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState("October");

  // Find the attendance record based on the selected date
  const attendanceForSelectedDate = dailyAttendanceData.find(
    (record) => record.date === selectedDate
  );

  // Find all attendance records for the selected year and month
  const attendanceForSelectedMonth = dailyAttendanceData.filter(
    (record) => record.year === selectedYear && record.month === selectedMonth
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
      <div className="text-2xl font-bold text-gray-800 mb-4 mt-32 text-center">Daily Attendance Report for {selectedMonth} {selectedYear}</div>

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

      {/* Display daily attendance records for the selected month */}
      {attendanceForSelectedMonth.length > 0 ? (
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-gray-50 rounded-lg shadow-md">
            <thead>
              <tr className='bg-slate-300'>
                <th className="px-6 py-4 font-medium text-gray-700">Date</th>
                <th className="px-6 py-4 font-medium text-gray-700">Clock-In</th>
                <th className="px-6 py-4 font-medium text-gray-700">Clock-Out</th>
                <th className="px-6 py-4 font-medium text-gray-700">Total Hours Worked</th>
                <th className="px-6 py-4 font-medium text-gray-700">Work Shift</th>
                <th className="px-6 py-4 font-medium text-gray-700">Overtime Hours</th>
                <th className="px-6 py-4 font-medium text-gray-700">Attendance Status</th>
                <th className="px-6 py-4 font-medium text-gray-700">Late Marking</th>
              </tr>
            </thead>
            <tbody>
              {attendanceForSelectedMonth.map((day, index) => (
                <tr key={index} className="border-b text-center">
                  <td className="px-6 py-4">{day.date}</td>
                  <td className="px-6 py-4">{day.clockIn}</td>
                  <td className="px-6 py-4">{day.clockOut}</td>
                  <td className="px-6 py-4">{day.totalHours}</td>
                  <td className="px-6 py-4">{day.workShift}</td>
                  <td className="px-6 py-4">{day.overtime}</td>
                  <td className="px-6 py-4">{day.status}</td>
                  <td className="px-6 py-4">{day.lateMarking}</td>
                </tr>
              ))}
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
