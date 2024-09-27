import React, { useState, createContext, useContext } from "react";

export const ShowALertContext = createContext(false);

export const ShowAlertProvider = ({ children }) => {
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");

  return (
    <ShowALertContext.Provider
      value={{ isShowAlert, setIsShowAlert, messageAlert, setMessageAlert }}
    >
      {children}
    </ShowALertContext.Provider>
  );
};

export const useShowAlert = () => {
  const { isShowAlert, setIsShowAlert, messageAlert, setMessageAlert } =
    useContext(ShowALertContext);
  return { isShowAlert, setIsShowAlert, messageAlert, setMessageAlert };
};
