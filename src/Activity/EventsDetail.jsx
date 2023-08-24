import React, { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useApp } from "../Context/AppContext";
import dayjs from "dayjs";

import "./EventsDetail.css";

function EventsDetail() {
  const {selectedDate, onChangeDate} = useApp()

  useEffect(()=>{
    console.log(selectedDate)
  },[selectedDate])

  const handleDateChange = (newDate) => {
    onChangeDate(newDate);
  };



  return (
    <div className="eventsdetail">
    <div className="bg-blur" />
      <div className="w-full p-4">
        <IoIosArrowRoundBack
          className="border-2 border-white rounded-full cursor-pointer"
          color="white"
          size={32}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          className="datepicker"
          label="Selecciona una fecha"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
      </div>
    </div>
  );
}

export default EventsDetail;
