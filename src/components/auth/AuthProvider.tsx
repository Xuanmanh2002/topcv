import React, { createContext, useState, useContext, ReactNode } from "react";
import {jwtDecode} from "jwt-decode"; 

type AuthContextType = {
  customer: any;  
  handleLogin: (token: string) => void;
  handleLogout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  customer: null,
  handleLogin: () => {},
  handleLogout: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [customer, setCustomer] = useState<any>(null);

  const handleLogin = (token: string) => {
    try {
      const decodedCustomer = jwtDecode(token);       
      setCustomer(decodedCustomer);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const handleLogout = () => {
    setCustomer(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ customer, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
