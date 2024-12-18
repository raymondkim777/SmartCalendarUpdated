"use client"
import { createContext, useState } from 'react';

export const LoginContext = createContext();
export const LoginProvider = ({ children }) => {
    const [loginStatus, setLoginStatus] = useState(false); 
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <LoginContext.Provider value={{ 
            loginStatus, setLoginStatus,
            currentUser, setCurrentUser, 
        }}>
            {children}
        </LoginContext.Provider>
    );
};