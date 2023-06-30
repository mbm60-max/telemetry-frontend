import React, { createContext, ReactNode, useState } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    setUserLoggedIn: (username: string) => {},
    setUserNotLoggedIn: () => {},
    userName:'',
  });
  interface AuthProviderProps {
    children: ReactNode;
  }
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setuserName] = useState('');

  const setUserLoggedIn = (username:string) => {
    setIsLoggedIn(true); // Replace 'token' with your actual token key
    setuserName(username);
  };
  const setUserNotLoggedIn = () => {
    setIsLoggedIn(false); // Replace 'token' with your actual token key
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, setUserLoggedIn, setUserNotLoggedIn, userName }}>
      {children}
    </AuthContext.Provider>
  );
};
