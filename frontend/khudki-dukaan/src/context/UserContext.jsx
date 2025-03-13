"use client";
import React, { createContext, useState } from "react";

export const UserDataContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
  });

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContextProvider;
