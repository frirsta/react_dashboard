import React, {useState, useEffect, useContext, createContext} from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    let response = await fetch("http://localhost:8000/users");

    if(response.status === 200){
      response = await response.json();
      setCurrentUser(response);
    } else{
      setCurrentUser(null)
    }
  };

  return (
    <div>
      <CurrentUserContext.Provider value={{ currentUser, fetchCurrentUser }}>
        {children}
      </CurrentUserContext.Provider>
    </div>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
