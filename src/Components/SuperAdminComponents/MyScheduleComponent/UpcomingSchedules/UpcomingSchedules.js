import React, { useState } from 'react';

function UpcomingSchedules() {
  const [scheduleData, setScheduleData] = useState([
    {
      date: '11-12-2024',
      events: [
        {
          id: 1,
          time: '10:00 to 10:30 AM',
          title: 'Meeting with client',
          description: 'Website traffic and UI Discussion',
        },
        {
          id: 2,
          time: '10:00 to 10:30 AM',
          title: 'Meeting with client',
          description: 'Website traffic and UI Discussion',
        },
      ],
    },
    {
      date: '14-12-2024',
      events: [
        {
          id: 3,
          time: '10:00 to 10:30 AM',
          title: 'Meeting with client',
          description: 'Website traffic and UI Discussion',
        },
        {
          id: 4,
          time: '10:00 to 10:30 AM',
          title: 'Meeting with client',
          description: 'Website traffic and UI Discussion',
        },
      ],
    },
  ]);

  const handleRemoveEvent = (date, eventId) => {
    setScheduleData((prevData) =>
      prevData.map((schedule) =>
        schedule.date === date
          ? {
            ...schedule,
            events: schedule.events.filter((event) => event.id !== eventId),
          }
          : schedule
      )
    );
  };

  return (
    <div className='min-w-[280px] min-h-screen'>
      <h2 className='text-[16px] font-medium mb-2'>Upcoming Schedules</h2>
      <p className='text-[12px] font-medium text-[#9E9E9E] mt-2'>Don't miss schedule events</p>
      {scheduleData.map((schedule) => (
        <div key={schedule.date} className='mt-4 mb-8'>
          <h3 className='text-[12px] font-semibold text-[#9DA1AC]'>{schedule.date}</h3>
          {schedule.events.map((event) => (
            <div
              key={event.id}
              className=' bg-[#EAEAFF] py-2 px-4 rounded-lg mt-2 shadow-sm'
            >
              <div>
                <div className='flex items-center justify-between'>
                  <p className='text-[12px] font-medium text-[#8B8F9D]'>{event.time}</p>
                  <button
                    onClick={() => handleRemoveEvent(schedule.date, event.id)}
                    className='text-[#AAAAB9] font-bold text-[12px]'
                  >
                    ✕
                  </button>
                </div>
                <p className='text-[14px] font-semibold text-[#63639A] mt-2'>
                  {event.title}
                </p>
                <p className='text-[10px] font-medium text-[#909AB9] mt-1'>{event.description}</p>
              </div>

            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default UpcomingSchedules;
