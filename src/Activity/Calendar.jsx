import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "./Main.css";
import "react-datepicker/dist/react-datepicker.css";
import { useApp } from "../Context/AppContext";

const Calendar = () => {
  const {selectedDate} = useApp()
  const year = selectedDate.year();
  const month = selectedDate.month();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDay.getDay();

  const daysInMonth = [];
  for (let day = 1; day <= lastDay.getDate(); day++) {
    daysInMonth.push(day);
  }

  return (
    <div className="content">
        {/* <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="MMMM yyyy"
        showMonthYearPicker
        className="custom-datepicker"
      /> */}
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
                        <div key={dayIndex} className="day">
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
      </div>

  );
};

export default Calendar;
