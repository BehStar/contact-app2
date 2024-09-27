import React, { useState, createContext, useContext } from "react";

export const CreateAccountContext = createContext(true);

export const CreateAccountProvider = ({ children }) => {
    const [isCreateAccount, setIsCreateAccount] = useState(true);
  return (
    <CreateAccountContext.Provider value={{ isCreateAccount, setIsCreateAccount }}> 
      {children}
    </CreateAccountContext.Provider>
  );
};

export const useCreateAccount = () => {
  const {isCreateAccount, setIsCreateAccount} = useContext(CreateAccountContext); 
  return {isCreateAccount, setIsCreateAccount}; 
};