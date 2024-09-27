import React, { useState, createContext, useContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  

  return (
    <UserContext.Provider value={{ user, setUser }}> 
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user, setUser } = useContext(UserContext); 
  return { user, setUser }; 
};