import React from "react";
import IconNav from "./IconNav";
import Calendar from "./Calendar";

import "./Main.css";
import EventsDetail from "./EventsDetail";


function Main() {
  return (
    <div className="flex w-screen h-screen">
        <IconNav />
        <Calendar />
        <EventsDetail />
    </div>
  );
}

export default Main;
