import React, { useState } from 'react';
import axios from 'axios';

function CreateEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleCreateEvent = async () => {
    const token = localStorage.getItem('token'); // Obtener el token almacenado en el local storage

    try {
      const response = await axios.post(
        'http://localhost:3000/events/create',
        {
          title,
          description,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.message);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className='flex flex-col gap-5'>
      <h2>Create Event</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="datetime-local"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="datetime-local"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button className='bg-slate-100' onClick={handleCreateEvent}>Create Event</button>
    </div>
  );
}

export default CreateEvent;
