import React, { useState, createContext, useContext } from "react";

export const ShowModalContext = createContext(false);

export const ShowModalProvider = ({ children }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [ messageModal, setMessageModal] = useState("");
  const [ status, setStatus] = useState("");

  return (
    <ShowModalContext.Provider
      value={{ isShowModal, setIsShowModal, messageModal, setMessageModal,status, setStatus }}
    >
      {children}
    </ShowModalContext.Provider>
  );
};

export const useShowModal = () => {
  const { isShowModal, setIsShowModal, messageModal, setMessageModal,status, setStatus } =
    useContext(ShowModalContext);
  return { isShowModal, setIsShowModal, messageModal, setMessageModal ,status, setStatus};
};
