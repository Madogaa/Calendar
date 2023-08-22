import React, { createContext, useContext, useState } from 'react';
import dayjs from 'dayjs'
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));

  const onChangeDate = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <AppContext.Provider value={{ selectedDate, onChangeDate }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
