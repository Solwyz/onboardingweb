import React from 'react'
import UpcomingSchedules from './UpcomingSchedules/UpcomingSchedules'
import CalendarComponent from './CalendarComponent/CalendarComponent'

function MyScheduleComponent() {
  return (
    <div className='flex gap-4'>
      <div className='bg-white p-4'><UpcomingSchedules/></div>
      <div className='bg-white p-4 flex-grow'><CalendarComponent/></div>
    </div>
  )
}

export default MyScheduleComponent
