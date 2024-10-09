import React from 'react'

function AttendanceManagement() {
<<<<<<< Updated upstream
=======
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
    },
    {
      date: "2024-10-10",
      clockIn: "09:15 AM",
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

>>>>>>> Stashed changes
  return (
    <div>AttendanceManagement</div>
  )
}

export default AttendanceManagement