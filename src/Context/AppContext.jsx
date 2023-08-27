import React, { createContext, useContext, useState } from 'react';
import dayjs from 'dayjs'
import 'dayjs/locale/es'
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  dayjs.locale("es");
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [monthEvents, setMonthEvents] = useState([]);

  const handleMonthEvents = (monthEvents) => {
      setMonthEvents(monthEvents);
  }

  const onChangeDate = (newDate) => {
    setSelectedDate(newDate);
  };

  const isLogged = () => {
    return sessionStorage.getItem("isAuthenticated")
  };

  const login = () => {
    sessionStorage.setItem("isAuthenticated", "true")
  };

  const logout = () => {
    if (localStorage.getItem("token")) localStorage.removeItem("token")
    sessionStorage.removeItem("isAuthenticated")
  };

  return (
    <AppContext.Provider value={{ selectedDate, onChangeDate, isLogged, login, logout, monthEvents, handleMonthEvents }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
