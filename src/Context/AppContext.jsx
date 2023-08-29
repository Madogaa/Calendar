import React, { createContext, useContext, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import dayjs from "dayjs";
import "dayjs/locale/es";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  dayjs.locale("es");
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [monthEvents, setMonthEvents] = useState([]);
  const { onOpen, isOpen, onOpenChange } = useDisclosure();
  const [eventData, setEventData] = useState(null);
  const [err, setErr] = useState(true);
  const [msg, setMsg] = useState("");
  const [msgTrigger, setMsgTrigger] = useState(true);

  const handleTrigger = () => {
    setMsgTrigger(!msgTrigger);
  }

  const handleErr = (newErr) => {
    setErr(newErr);
  };

  const handleMsg = (newMsg) => {
    setMsg(newMsg);
  };

  const handleEventData = (newEventData) => {
    setEventData(newEventData);
  };

  const handleMonthEvents = (monthEvents) => {
    setMonthEvents(monthEvents);
  };

  const onChangeDate = (newDate) => {
    setSelectedDate(newDate);
  };

  const isLogged = () => {
    return sessionStorage.getItem("isAuthenticated");
  };

  const login = () => {
    sessionStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    if (localStorage.getItem("token")) localStorage.removeItem("token");
    sessionStorage.removeItem("isAuthenticated");
  };

  return (
    <AppContext.Provider
      value={{
        selectedDate,
        onChangeDate,
        isLogged,
        login,
        logout,
        monthEvents,
        handleMonthEvents,
        onOpen,
        isOpen,
        onOpenChange,
        eventData,
        handleEventData,
        err,
        handleErr,
        msg,
        handleMsg,
        msgTrigger,
        handleTrigger,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
