import React, { useEffect } from "react";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useApp } from "../Context/AppContext";

import "./EventsDetail.css";
import Divider from "../Styling/Divider";

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          className="datepicker"
          label="Selecciona una fecha"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
      <Divider />
      </div>
    </div>
  );
}

export default EventsDetail;
