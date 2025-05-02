import React, { createContext, useState, useEffect, FC, ReactNode } from 'react';
import api from '../api/api';
import { jwtDecode } from "jwt-decode";
  
  // Interface du token (à adapter si tu as d’autres claims)
  interface JwtPayload {
    sub?: string;
    email?: string;
    name?: string;
    exp?: number;
  }
  
  export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (email: string, password: string) => Promise<User | null>;
    logout: () => void;
  }
  
  export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},  
    login: async () => null,
    logout: () => {},
  });
  
  export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
  
    // Au démarrage, on restaure depuis localStorage
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const decoded = jwtDecode<JwtPayload>(token);
          if (decoded.sub && decoded.email) {
            setUser({ id: decoded.sub, email: decoded.email,name: decoded.name  ?? decoded.email });
          }
        } catch {
          localStorage.removeItem('token');
        }
      }
    }, []);
  
    const login = async (email: string, password: string) => {
      const res = await api.post<string>('/auth/login', { email, password });
      const token = res.data;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.sub && decoded.email) {
        const me = { id: decoded.sub, email: decoded.email, name: decoded.name ?? decoded.email,};
        setUser(me);
        return me;
      }
      return null;
    };
  
    const logout = () => {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ user, setUser, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  