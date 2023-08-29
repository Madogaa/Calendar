import React, { useEffect, useState } from "react";
import { useApp } from "../Context/AppContext";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import dayjs from "dayjs";

function DayEvents() {
  const {onOpen,handleEventData, eventData} = useApp();
  const [dayEvents, setDayEvents] = useState([]);
  const { selectedDate } = useApp();
  const { monthEvents, handleMonthEvents } = useApp();

  const handleModifyClick = (event) => {
    handleEventData(event)
    onOpen();
    console.log(eventData)
  }
  useEffect(() => {
    console.log(eventData)
  }, [eventData]);

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API_URL}/events/delete/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.deletedEvent);
      if (response.status === 200) {
        const deletedEventId = response.data.deletedEvent.id;
        handleMonthEvents(
          monthEvents.filter((event) => event.id !== deletedEventId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const date = dayjs(
      new Date(selectedDate.year(), selectedDate.month(), selectedDate.date())
    ).format("YYYY-MM-DD");
    setDayEvents(
      monthEvents.filter(
        (event) => event.startDate <= date && event.endDate >= date
      )
    );
  }, [selectedDate, monthEvents]);

  return (
    <>
      <div className="pt-8">
        {dayEvents.map((event) => (
          <div
            className="dayevent grid grid-cols-12 align-items-center"
            key={event.id}
          >
            <button
              className="col-span-10"
              onClick={() => {
                handleModifyClick(event);
              }}
            >
              <p className="py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                {event.title}
              </p>
            </button>
            <button
              className="col-span-2"
              onClick={() => handleDeleteEvent(event.id)}
            >
              <div className="p-4">
                <MdDelete size={24} color="white" />
              </div>
            </button>
          </div>
        ))}
      </div>

    </>
  );
}

export default DayEvents;
