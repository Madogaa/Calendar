import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useApp } from "../Context/AppContext";
import { useDisclosure } from "@nextui-org/react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "./Calendar.css";
import dayjs from "dayjs";
import EventModal from "../Modal/EventModal";
import axios from "axios";

const Calendar = () => {

  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const [day, setDay] = useState(0);
  const [month, setMonthh] = useState(0);
  const {monthEvents, handleMonthEvents} = useApp();
  const { selectedDate, onChangeDate } = useApp();
  const firstDay = new Date(selectedDate.year(), selectedDate.month(), 1);
  const lastDay = new Date(selectedDate.year(), selectedDate.month() + 1, 0);
  const startingDayOfWeek = firstDay.getDay();
  const daysInMonth = [];
  for (let day = 1; day <= lastDay.getDate(); day++) {
    daysInMonth.push(day);
  }

  const days = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];


  useEffect(() => {
    fetchEventsByDate(selectedDate)
      .then((events) => {
        handleMonthEvents(events);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, [selectedDate]);

  const fetchEventsByDate = async (date) => {
    const token = localStorage.getItem('token'); // Obtener el token almacenado
    console.log(date.month());
    try {
      const response = await axios.get(
        `http://localhost:3000/events/list/month?month=${date.month()+1}&year=${date.year()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const events = response.data;
      // Aquí puedes manejar los eventos devueltos por la API
      return events
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const getDayEvents = (dayNumber) => {
    const date = new Date(selectedDate.year(), selectedDate.month(), dayNumber);
    const filteredEvents = monthEvents.filter((event) =>
      date > new Date(event.startDate) && date < new Date(event.endDate)
    );

    return (
      <div className="w-full h-full overflow-hidden pt-2">
        {
        filteredEvents.map((event,index) => (
        <p className="w-full py-0.5 px-1 text-sm text-white-t font-semibold bg-second rounded-lg mb-1 whitespace-nowrap "  key={index}>{event.title}</p>
        ))
      }
      </div>
      )
  };

  const handleDayClick = (dayNumber) => {
    if (dayNumber) {
      const newDate = dayjs(new Date(selectedDate.year(),selectedDate.month(),dayNumber))
      onChangeDate(newDate)
      setDay(dayNumber);
      setMonthh(selectedDate.month() + 1);

      onOpen();
    }
  };

  const handleBackMonth = () => {
    const newDate = dayjs(
      new Date(
        selectedDate.year(),
        selectedDate.month() - 1,
        selectedDate.date()
      )
    );
    onChangeDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = dayjs(
      new Date(
        selectedDate.year(),
        selectedDate.month() + 1,
        selectedDate.date()
      )
    );
    onChangeDate(newDate);
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="content">
      <div className="flex items-center w-full gap-3 py-4">
        <button className="hover:scale-125" onClick={() => handleBackMonth()}>
          <IoIosArrowBack color="white" size={32} />
        </button>
        <button onClick={() => handleNextMonth()} className="hover:scale-125">
          <IoIosArrowForward color="white" size={32} />
        </button>
        <h1 className="w-full text-3xl text-white-t font-semibold">
          {capitalizeFirstLetter(selectedDate.format("MMMM"))} de{" "}
          {selectedDate.format("YYYY")}
        </h1>
      </div>
      <div className="calendar">
        <div className="flex">
          {days.map((day) => (
            <div key={day} className="weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="grid">
          <div className="bg-blur" />
          {Array(Math.ceil((daysInMonth.length + startingDayOfWeek) / 7))
            .fill()
            .map((_, weekIndex) => (
              <React.Fragment key={weekIndex}>
                {Array(7)
                  .fill()
                  .map((_, dayIndex) => {
                    const dayNumber =
                      weekIndex * 7 + dayIndex + 1 - startingDayOfWeek;

                    return (
                      <>
                      <div
                        onClick={() =>
                          handleDayClick(
                            dayNumber > 0 && dayNumber <= lastDay.getDate()
                              ? dayNumber
                              : null
                          )
                        }
                        key={dayIndex}
                        className={`day ${dayNumber === selectedDate.date() ? 'selectedDate' : ''}`}
                      >
                        {dayNumber > 0 && dayNumber <= lastDay.getDate()
                          ? (
                            <>
                            <p className="h-6">{dayNumber}</p>
                            {getDayEvents(dayNumber)}
                            </>
                          )
                          : ""}

                      </div>
                      </>
                    );
                  })}
              </React.Fragment>
            ))}
        </div>

      </div>
      <EventModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        day={day}
        month={month}
      />
    </div>
  );
};

export default Calendar;
