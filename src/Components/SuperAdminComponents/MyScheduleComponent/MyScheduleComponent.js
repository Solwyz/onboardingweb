import React, { useState } from 'react'
import UpcomingSchedules from './UpcomingSchedules/UpcomingSchedules'
import CalendarComponent from './CalendarComponent/CalendarComponent'

function MyScheduleComponent() {

  const [events, setEvents] = useState([
      { title: 'Existing Event', description: 'New descripted event is here', date: '2024-12-15', time: '10:00AM' },
      { title: 'Meeting with client', description: 'Client meeting event is here', date: '2024-12-26', time: '10:00AM' }
    ])

  return (
    <div className='flex gap-4'>
      <div className='bg-white p-4'><UpcomingSchedules events={events} setEvents={setEvents}/></div>
      <div className='bg-white p-4 flex-grow'><CalendarComponent events={events} setEvents={setEvents}/></div>
    </div>
  )
}

export default MyScheduleComponent
