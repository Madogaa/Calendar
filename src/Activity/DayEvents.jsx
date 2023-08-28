import React, { useEffect, useState } from 'react'
import { useApp } from '../Context/AppContext'
import {MdDelete} from 'react-icons/md'
import axios from 'axios';
import dayjs from 'dayjs';

function DayEvents() {

const [dayEvents,setDayEvents] = useState([])
const {selectedDate} = useApp();
const {monthEvents,handleMonthEvents} = useApp()

const handleDeleteEvent = async (eventId) =>{
  try{
    const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/events/delete/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    console.log(response.data.deletedEvent)
    if (response.status === 200) {
      const deletedEventId = response.data.deletedEvent.id;
      handleMonthEvents(monthEvents.filter((event) => event.id !== deletedEventId));
    }
  }catch(error){
    console.log(error)
  }
}

useEffect(() => {
  const date = dayjs(new Date(selectedDate.year(), selectedDate.month(), selectedDate.date())).format("YYYY-MM-DD");
    setDayEvents(monthEvents.filter((event) =>
      event.startDate <= date && event.endDate >= date
    ));
}, [selectedDate, monthEvents]);

return (
    <div className='pt-8'>
      {dayEvents.map((event) => (
        <div className='dayevent grid grid-cols-12 align-items-center px-4' key={event.id}>
          <p className='whitespace-nowrap overflow-hidden text-ellipsis col-span-10 h-fit'>{event.title}</p>
          <button className='ml-2 col-span-2' onClick={() => handleDeleteEvent(event.id)}>
            <MdDelete size={24} color='white' />
          </button>
        </div>
      ))}
    </div>
)
}

export default DayEvents