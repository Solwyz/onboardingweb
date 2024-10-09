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

  // State to store the selected date
  const [selectedDate, setSelectedDate] = useState(attendanceData[0].date);

  // Find the attendance record based on the selected date
  const attendanceForSelectedDate = attendanceData.find(
    (record) => record.date === selectedDate
  );

  return (
    <div className='border-2 shadow-md p-8 w-[700px]'>
      <div className='text-[28px] font-medium'>Attendance Management</div>

      {/* Date picker */}
      <div className='mb-4 mt-4'>
        <label className='text-[18px] font-normal mr-4' htmlFor="attendanceDate">Select Date:</label>
        <input
          type="date"
          id="attendanceDate"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      {/* Display attendance data based on selected date */}
      {attendanceForSelectedDate ? (
        <div className='text-[18px]'>
          <table className='mx-auto'>
            <tbody>
            <tr>
              <tb className="tex-left">Attendance Date </tb>
              <tb className="tex-left">:</tb>
              <tb className="tex-left">{attendanceForSelectedDate.date}</tb>
            </tr>
            <tr>
              <tb className="tex-left">Clocked-In at </tb>
              <tb className="tex-left">:</tb>
              <tb className="tex-left">{attendanceForSelectedDate.clockIn}</tb>
            </tr>
            <tr>
              <tb className="tex-left">Clocked-Out at </tb>
              <tb className="tex-left">:</tb>
              <tb className="tex-left">{attendanceForSelectedDate.clockOut}</tb>
            </tr>
            <tr>
              <tb className="tex-left">Total Hours worked </tb>
              <tb className="tex-left">:</tb>
              <tb className="tex-left">{attendanceForSelectedDate.totalHours}</tb>
            </tr>
            <tr>
              <tb className="tex-left">Work Shift </tb>
              <tb className="tex-left">:</tb>
              <tb className="tex-left">{attendanceForSelectedDate.workShift}</tb>
            </tr>
            <tr>
              <tb className="tex-left">Overtime Hours </tb>
              <tb className="tex-left">:</tb>
              <tb className="tex-left">{attendanceForSelectedDate.overtime}</tb>
            </tr>
            <tr>
              <tb className="tex-left">Attendance Status </tb>
              <tb className="tex-left">:</tb>
              <tb className="tex-left">{attendanceForSelectedDate.status}</tb>
            </tr>
            <tr>
              <tb className="tex-left">Late marking </tb>
              <tb className="tex-left">:</tb>
              <tb className="tex-left">{attendanceForSelectedDate.lateMarking}</tb>
            </tr>
            
            </tbody>
          </table>
        </div>
      ) : (
        <div className='text-[18px] text-red-500'>No attendance data available for the selected date.</div>
      )}
    </div>
  );
}

export default AttendanceManagement;
