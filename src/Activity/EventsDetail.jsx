import React, { useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useApp } from "../Context/AppContext";
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
      <div className="w-full bg-white p-4">
        <IoIosArrowRoundBack
          className="border-2 border-black rounded-full cursor-pointer"
          color="black"
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
