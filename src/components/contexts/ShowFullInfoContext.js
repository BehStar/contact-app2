import React, { useState, createContext, useContext } from "react";

export const ShowFullInfoContext = createContext(false);

export const ShowFullInfoProvider = ({ children }) => {
  const [isShowFullInfo, setIsShowFullInfo] = useState(false);

  return (
    <ShowFullInfoContext.Provider value={{ isShowFullInfo, setIsShowFullInfo }}>
      {children}
    </ShowFullInfoContext.Provider>
  );
};

export const useShowFullInfo = () => {
  const { isShowFullInfo, setIsShowFullInfo } = useContext(ShowFullInfoContext);
  return { isShowFullInfo, setIsShowFullInfo };
};
