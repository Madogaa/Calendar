import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token'); // Obtener el token almacenado en el local storage

      try {
        const response = await axios.get('http://localhost:3000/events/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className='text-white'>
      <h2>Event List</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> - {event.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
