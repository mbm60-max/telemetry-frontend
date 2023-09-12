import React, { createContext, ReactNode, useState } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    setUserLoggedIn: (username:string,pfpString20:string,pfpString40:string,pfpString60:string) => {},
    setUserNotLoggedIn: () => {},
    userName:'',
    pfpSVG20:'',
    pfpSVG40:'',
    pfpSVG60:'',
  });
  interface AuthProviderProps {
    children: ReactNode;
  }
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setuserName] = useState('');
  const [pfpSVG20,setPfpSVG20] = useState('');
  const [pfpSVG40,setPfpSVG40] = useState('');
  const [pfpSVG60,setPfpSVG60] = useState('');
  

  const setUserLoggedIn = (username:string,pfpString20:string,pfpString40:string,pfpString60:string) => {
    setIsLoggedIn(true); // Replace 'token' with your actual token key
    setuserName(username);
    setPfpSVG20(pfpString20);
    setPfpSVG40(pfpString40);
    setPfpSVG60(pfpString60);
  };
  const setUserNotLoggedIn = () => {
    setIsLoggedIn(false); // Replace 'token' with your actual token key
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, setUserLoggedIn, setUserNotLoggedIn, userName,pfpSVG20,pfpSVG40,pfpSVG60 }}>
      {children}
    </AuthContext.Provider>
  );
};
