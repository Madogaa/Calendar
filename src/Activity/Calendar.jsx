import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useApp } from "../Context/AppContext";
import { useDisclosure } from "@nextui-org/react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "./Calendar.css";
import dayjs from "dayjs";
import EventModal from "../Modal/EventModal";

const Calendar = () => {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const [day, setDay] = useState(0);
  const [month, setMonthh] = useState(0);

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

  const handleDayClick = (dayNumber) => {
    if (dayNumber) {
      setDay(dayNumber);
      const month = selectedDate.month() + 1;
      setMonthh(month);
      console.log(`Clicked on day ${dayNumber} / ${month}`);
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
              {day.tit}
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
                      <div
                        onClick={() =>
                          handleDayClick(
                            dayNumber > 0 && dayNumber <= lastDay.getDate()
                              ? dayNumber
                              : null
                          )
                        }
                        key={dayIndex}
                        className="day"
                      >
                        {dayNumber > 0 && dayNumber <= lastDay.getDate()
                          ? dayNumber
                          : ""}
                      </div>
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
