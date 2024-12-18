import React, { useState } from 'react';
import './UpcomingSchedules.css'

function UpcomingSchedules({ events,setEvents }) {
  
  const groupedEvents = events.reduce((acc, event) => {
    const date = event.date;
    if(!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  },{})

  const sortedGroupedEvents = Object.entries(groupedEvents).sort(([dateA],[dateB]) => 
    new Date(dateA) - new Date(dateB)
  );

  const handleRemoveEvent = (date, eventTitle) => {
    setEvents((prevEvents) => 
    prevEvents.filter((event) => !(event.date === date && event.title === eventTitle))
    );
  };

  return (
    <div className='min-w-[280px] h-screen overflow-y-auto custom-scrollbar-upcomingschedule pr-3'>
      <h2 className='text-[16px] font-medium mb-2'>Upcoming Schedules</h2>
      <p className='text-[12px] font-medium text-[#9E9E9E] mt-2'>Don't miss schedule events</p>
      {sortedGroupedEvents.map(([date, events]) => (
        <div key={date} className='mt-4 mb-8'>
          <h3 className='text-[12px] font-semibold text-[#9DA1AC]'>{date}</h3>
          {events.map((event, index) => (
            <div
              key={index}
              className=' bg-[#EAEAFF] py-2 px-4 rounded-lg mt-2 shadow-sm'
            >
              <div>
                <div className='flex items-center justify-between'>
                  <p className='text-[12px] font-medium text-[#8B8F9D]'>{event.time || 'No Time Specified'}</p>
                  <button
                    onClick={() => handleRemoveEvent(event.date, event.title)}
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
