import React, { createContext, useContext, useState } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const fetchCurrentUser = async () => {
    
    let response = sessionStorage.getItem("username");
    if (response === "" || response === null) {
      } else {
        console.log(response)
   
      }
    setCurrentUser(response);
    console.log(response);
  };
  return <CurrentUserContext.Provider value={{currentUser, fetchCurrentUser}}>{children}</CurrentUserContext.Provider>;
};

export const useCurrentUser = () => useContext(CurrentUserContext);
