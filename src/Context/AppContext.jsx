import React, { createContext, useContext, useState } from 'react';
import dayjs from 'dayjs'
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));

  const onChangeDate = (newDate) => {
    setSelectedDate(newDate);
  };

  const isLoged = () => {
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
    <AppContext.Provider value={{ selectedDate, onChangeDate, isLoged, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
