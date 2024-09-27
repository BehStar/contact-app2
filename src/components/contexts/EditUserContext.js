import React, { useState, createContext, useContext } from "react";

export const EditUserContext = createContext(null);

export const EditUserProvider = ({ children }) => {
  const [editUser, setEditUser] = useState({});
  

  return (
    <EditUserContext.Provider value={{ editUser, setEditUser }}> 
      {children}
    </EditUserContext.Provider>
  );
};

export const useEditUser = () => {
  const { editUser, setEditUser } = useContext(EditUserContext); 
  return { editUser, setEditUser }; 
};