"use client"
import { createContext, useState } from 'react';

export const LoginContext = createContext();
export const LoginProvider = ({ children }) => {
    const [loginStatus, setLoginStatus] = useState(false); 
    const [userEmail, setUserEmail] = useState(null);
    const [userID, setUserID] = useState('');

    return (
        <LoginContext.Provider value={{ 
            loginStatus, setLoginStatus,
            userEmail, setUserEmail, 
            userID, setUserID,
        }}>
            {children}
        </LoginContext.Provider>
    );
};