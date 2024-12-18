import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'; // Main FullCalendar component
import dayGridPlugin from '@fullcalendar/daygrid'; // For day grid (month view)
import timeGridPlugin from '@fullcalendar/timegrid'; // For week and day views
import interactionPlugin from '@fullcalendar/interaction'; // Enables user interactions
import './CalendarComponent.css'

function CalendarComponent({ events,setEvents }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', time: '' });

  const handelDateClick = (info) => {
    setNewEvent({ ...newEvent, date: info.dateStr });
    setIsModalOpen(true);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  }

  const handleAddEvent = () => {
    if (newEvent.title) {
      setEvents([...events, { title: newEvent.title, description: newEvent.description, date: newEvent.date, time: newEvent.time }])
      setIsModalOpen(false)
      setNewEvent({ title: '', description: '', date: '' })
      console.log(events)
    } else {
      alert('Please enter an event title')
    }
  }

  const addDayHoverEffect =()=> {
    return 'hover:bg-[#EAEAFF] hover:cursor-pointer'
  }

  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        events={events}
        dateClick={handelDateClick}
        dayCellClassNames={addDayHoverEffect}
        eventClassNames="custom-event"
        eventStartEditable={false}
      />

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-neutral-800 bg-opacity-50 z-50'>
          <div className='bg-white p-8'>

            <div className='flex items-center justify-between'>
              <div className='text-[16px] font-medium text-[#6C55B2]'>Schedule New Meeting</div>
              <div className='text-[#1C1B1F] font-semibold text-[14px] cursor-pointer' onClick={() => setIsModalOpen(!isModalOpen)}>✕</div>
            </div>

            <div>

              <div className='flex items-center justify-between gap-4 mt-8'>

                <div>
                  <div className='text-[14px] font-normal text-[#373737]'>Title</div>
                  <div className='mt-2'>
                    <input
                      type='text'
                      name='title'
                      placeholder='Enter meeting title'
                      className='px-4 py-3 border border-[#E6E6E7] focus:outline-none placeholder:text-[14px] rounded-lg'
                      value={newEvent.title}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <div className='text-[14px] font-normal text-[#373737]'>Date of Event</div>
                  <div className='mt-2'>
                    <input
                      type="text"
                      name="date"
                      placeholder={newEvent.date}
                      value={newEvent.date}
                      readOnly
                      className="px-4 py-3 border border-[#E6E6E7] placeholder:text-[14px] text-[#696A70] focus:outline-none rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <div className='text-[14px] font-normal text-[#373737]'>Starting Time</div>
                  <div className='mt-2'>
                    <input
                      type="time"
                      name="time"
                      placeholder='Add time'
                      value={newEvent.time}
                      onChange={handleInputChange}
                      className="px-4 py-3 w-[104px] border border-[#E6E6E7] placeholder:text-[14px] text-[#696A70] focus:outline-none rounded-lg"
                    />
                  </div>
                </div>

              </div>

              <div className='mt-8'>
                <div className='text-[14px] font-normal text-[#373737]'>Description</div>
                <div className='mt-2'>
                  <textarea
                    type='text'
                    name='description'
                    placeholder='Add description'
                    className='px-4 py-3 border border-[#E6E6E7] focus:outline-none placeholder:text-[14px] rounded-lg w-full h-[120px]'
                    value={newEvent.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className='flex gap-4 mt-8 w-fit ml-auto'>
                <div className='text-[14px] font-normal text-[#2C2B2B] border border-[#E6E6E7] px-4 py-3 rounded-lg cursor-pointer' onClick={() => setIsModalOpen(!isModalOpen)}>Cancel</div>
                <div className='text-[14px] font-medium text-[#FFFFFF] bg-[#6C55B2] px-5 py-3 rounded-lg cursor-pointer' onClick={handleAddEvent}>Add</div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default CalendarComponent
