import React, { useEffect, useState } from 'react'
import { useApp } from '../Context/AppContext'

function DayEvents({events}) {

const [dayEvents,setDayEvents] = useState([])
const {selectedDate} = useApp();

useEffect(() => {
    const date = new Date(selectedDate.year(), selectedDate.month(), selectedDate.date());
    setDayEvents(events.filter((event) =>
      new Date(event.startDate).getTime() <= date.getTime() && new Date(event.endDate).getTime() >= date.getTime()
    ));
}, [selectedDate, events]);

return (
    <div className='pt-8'>
      {dayEvents.map((event, index) => (
        <p className='dayevent' key={index}>{event.title}</p>
      ))}
    </div>
)
}

export default DayEvents