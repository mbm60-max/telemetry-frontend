import React, { createContext, ReactNode, useState } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    setUserLoggedIn: () => {},
    setUserNotLoggedIn: () => {}

  });
  interface AuthProviderProps {
    children: ReactNode;
  }
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setUserLoggedIn = () => {
    setIsLoggedIn(true); // Replace 'token' with your actual token key
  };
  const setUserNotLoggedIn = () => {
    setIsLoggedIn(false); // Replace 'token' with your actual token key
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setUserLoggedIn, setUserNotLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
