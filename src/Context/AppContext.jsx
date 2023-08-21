import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // Lógica para iniciar sesión
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Lógica para cerrar sesión
    setIsLoggedIn(false);
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
