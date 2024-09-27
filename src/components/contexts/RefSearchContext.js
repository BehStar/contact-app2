import { createContext,useContext, useRef } from 'react';

const RefSearchContext = createContext(null);

export const RefSearchProvider = ({ children }) => {
  const userListRef = useRef(null);

  return (
    <RefSearchContext.Provider value={{ userListRef }}> 
      {children}
    </RefSearchContext.Provider>
  );
};

export const useRefSearch = () => {
  return useContext(RefSearchContext);
};