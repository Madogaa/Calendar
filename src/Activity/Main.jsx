import React from "react";
import IconNav from "./IconNav";
import Calendar from "./Calendar";

import "./Main.css";


function Main() {
  return (
    <div className="flex w-screen h-screen">
        <IconNav />
        <Calendar />
    </div>
  );
}

export default Main;
