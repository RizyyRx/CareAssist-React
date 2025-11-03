import React, { createContext, useContext, useState } from "react";
import { jwtDecode } from 'jwt-decode';

// create context
const AuthContext = createContext();

// provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return { username: decoded.sub, role: decoded.role };
    } catch {
      return null;
    }
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// custom hook for easy access
export function useAuth() {
  return useContext(AuthContext);
}
