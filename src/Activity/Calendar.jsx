import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useApp } from "../Context/AppContext";
import {useDisclosure} from "@nextui-org/react";
import "./Calendar.css";
import EventModal from "../Modal/EventModal";

const Calendar = () => {
  const {onOpen,isOpen, onOpenChange} = useDisclosure();
  const [day,setDay] = useState(0);
  const [monthh,setMonthh] = useState(0);

  const { selectedDate } = useApp();
  const year = selectedDate.year();
  const month = selectedDate.month();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDay.getDay();

  const daysInMonth = [];
  for (let day = 1; day <= lastDay.getDate(); day++) {
    daysInMonth.push(day);
  }

  const handleDayClick = (dayNumber) => {
    if (dayNumber) {
      setDay(dayNumber)
      const month = selectedDate.month() + 1;
      setMonthh(month);
      console.log(`Clicked on day ${dayNumber} / ${month}`);
      onOpen();
    }
  };

  return (
    <div className="content">
      <div className="calendar">
        <div className="flex">
          {[
            "Domingo",
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado",
          ].map((day) => (
            <div key={day} className="weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="grid">
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
      <EventModal isOpen={isOpen} onOpenChange={onOpenChange} day={day} month={monthh} />
    </div>
  );
};

export default Calendar;
