/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

function AuthProvider(props) {
  const userLocal = localStorage.getItem("user");
  const [user, setUser] = useState(JSON.parse(userLocal));

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  const authContextValue = {
    setUser,
    logout,
    user,
  };

  return <AuthContext.Provider value={authContextValue} {...props} />;
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
