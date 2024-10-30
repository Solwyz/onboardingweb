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
      lateMarking: "yes",
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


  const attendanceForSelectedDate = dailyAttendanceData.find(
    (record) => record.date === selectedDate
  );


  const attendanceForSelectedMonth = dailyAttendanceData.filter(
    (record) => record.year === selectedYear && record.month === selectedMonth
  );

  return (
    <div className="container border mx-auto p-8 bg-gray-50 shadow-lg rounded-lg">

      <div className='flex items-center justify-between'>

        <div className="text-[20px] font-medium text-[#2B2342]">Attendance Management</div>

        <div className="flex items-center justify-center">
          <input
            type="date"
            id="attendanceDate"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>


      {attendanceForSelectedDate ? (
        <div className="overflow-x-auto mt-4 mb-8 shadow-md">
          <div className=''>
            <table className="min-w-full bg-white shadow-md">
              <tbody>
                <tr className='h-8'></tr>
                <tr className="">
                  <td className='w-1/4'></td>
                  <td className="px-6 py-4 text-[#434343]">Attendance Date</td>
                  <td className="px-6 py-4">:</td>
                  <td className="px-6 py-4 text-[#434343]">{attendanceForSelectedDate.date}</td>
                  <td className='w-1/4'></td>
                </tr>
                <tr className="">
                  <td className='w-1/4'></td>
                  <td className="px-6 py-4 text-[#434343]">Clocked-In at</td>
                  <td className="px-6 py-4">:</td>
                  <td className="px-6 py-4 text-[#00B24D]">{attendanceForSelectedDate.clockIn}</td>
                  <td className='w-1/4'></td>
                </tr>
                <tr className="">
                  <td className='w-1/4'></td>
                  <td className="px-6 py-4 text-[#434343]">Clocked-Out at</td>
                  <td className="px-6 py-4">:</td>
                  <td className="px-6 py-4 text-[#00B24D]">{attendanceForSelectedDate.clockOut}</td>
                  <td className='w-1/4'></td>
                </tr>
                <tr className="">
                  <td className='w-1/4'></td>
                  <td className="px-6 py-4 text-[#434343]">Total Hours Worked</td>
                  <td className="px-6 py-4">:</td>
                  <td className="px-6 py-4 text-[#434343]">{attendanceForSelectedDate.totalHours}</td>
                  <td className='w-1/4'></td>
                </tr>
                <tr className="">
                  <td className='w-1/4'></td>
                  <td className="px-6 py-4 text-[#434343]">Work Shift</td>
                  <td className="px-6 py-4">:</td>
                  <td className="px-6 py-4 text-[#434343]">{attendanceForSelectedDate.workShift}</td>
                  <td className='w-1/4'></td>
                </tr>
                <tr className="">
                  <td className='w-1/4'></td>
                  <td className="px-6 py-4 text-[#434343]">Overtime Hours</td>
                  <td className="px-6 py-4">:</td>
                  <td className="px-6 py-4">{attendanceForSelectedDate.overtime}</td>
                  <td className='w-1/4'></td>
                </tr>
                <tr className="">
                  <td className='w-1/4'></td>
                  <td className="px-6 py-4 text-[#434343]">Attendance Status</td>
                  <td className="px-6 py-4">:</td>
                  <td className="px-6 py-4 text-[#434343]">{attendanceForSelectedDate.status}</td>
                  <td className='w-1/4'></td>
                </tr>
                <tr>
                  <td className='w-1/4'></td>
                  <td className="px-6 py-4 text-[#434343]">Late Marking</td>
                  <td className="px-6 py-4">:</td>
                  <td className="px-6 py-4 text-[#434343]">{attendanceForSelectedDate.lateMarking}</td>
                  <td className='w-1/4'></td>
                </tr>
                <tr className='h-8'></tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-lg text-gray-400 text-center mt-20 mb-8">No attendance data available for the selected date.</div>
      )}


      <div className='bg-white px-6 pb-[80px] shadow-md'>
        <div className="text-[20px] font-medium text-gray-800 mb-4 pt-8 text-center">Monthly Attendance Report for {selectedMonth} {selectedYear}</div>
        <div className='flex items-center justify-between'>
          <div className='mb-7 text-[16px] text-[#373737]'>Total working Hours: <span className='text-[#38BD07] font-medium'>210 Hours</span></div>

          <div className="mb-7 flex gap-4 items-center justify-center">
            {/* <label className=" mr-4" htmlFor="attendanceYear">Select Year:</label> */}
            <select
              id="attendanceYear"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="text-[14px] border border-gray-300 px-3 py-2 text-[#989899] focus:outline-none focus:ring-2 focus:ring-[#A4A4E5]"
            >
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
            </select>

            {/* <label className=" ml-8 mr-4" htmlFor="attendanceMonth">Select Month:</label> */}
            <select
              id="attendanceMonth"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="text-[14px] border border-gray-300 px-3 py-2 text-[#989899] focus:outline-none focus:ring-2 focus:ring-[#A4A4E5]"
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
        </div>

        {attendanceForSelectedMonth.length > 0 ? (
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full rounded-lg shadow-md">
              <thead>
                <tr className=''>
                  <th className="px-2 py-2 text-[14px] font-normal  text-[#7F7F7F] bg-[#F1F3F9] text-left border-e-8 border-white">Date</th>
                  <th className="px-2 py-2 text-[14px] font-normal  text-[#7F7F7F] bg-[#F1F3F9] text-left border-e-8 border-white">Clock-In</th>
                  <th className="px-2 py-2 text-[14px] font-normal  text-[#7F7F7F] bg-[#F1F3F9] text-left border-e-8 border-white">Clock-Out</th>
                  <th className="px-2 py-2 text-[14px] font-normal  text-[#7F7F7F] bg-[#F1F3F9] text-left border-e-8 border-white">Total Hours Worked</th>
                  <th className="px-2 py-2 text-[14px] font-normal  text-[#7F7F7F] bg-[#F1F3F9] text-left border-e-8 border-white">Work Shift</th>
                  <th className="px-2 py-2 text-[14px] font-normal  text-[#7F7F7F] bg-[#F1F3F9] text-left border-e-8 border-white">Late Marking</th>
                  <th className="px-2 py-2 text-[14px] font-normal  text-[#7F7F7F] bg-[#F1F3F9] text-left border-e-8 border-white">Overtime Hours</th>
                  <th className="px-2 py-2 text-[14px] font-normal  text-[#7F7F7F] bg-[#F1F3F9] text-left ">Attendance Status</th>                  
                </tr>
              </thead>
              <tbody>
                {attendanceForSelectedMonth.map((day, index) => (
                  <tr key={index} className="border-b text-left text-[#373737] text-[14px]">
                    <td className="px-6 py-4">{day.date}</td>
                    <td className="px-6 py-4">{day.clockIn}</td>
                    <td className="px-6 py-4">{day.clockOut}</td>
                    <td className="px-6 py-4">{day.totalHours}</td>
                    <td className="px-6 py-4">{day.workShift}</td>
                    <td className={`${day.lateMarking === 'yes' ? 'text-red-500' : 'text-[#38BD07]'} px-6 py-4`}>{day.lateMarking}</td>
                    <td className="px-6 py-4">{day.overtime}</td>
                    <td className={`${day.status === 'absent' ? 'text-red-500' : 'text-[#38BD07]'} px-6 py-4`}>{day.status}</td>                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-lg text-gray-400 text-center mt-20 mb-20">No data available for the selected month.</div>
        )}
      </div>
    </div>
  );
}

export default AttendanceManagement;
