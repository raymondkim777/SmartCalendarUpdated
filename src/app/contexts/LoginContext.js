"use client"
import { createContext, useState } from 'react';

export const LoginContext = createContext();
export const LoginProvider = ({ children }) => {
    const [loginStatus, setLoginStatus] = useState(false); 

    return (
        <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
            {children}
        </LoginContext.Provider>
    );
};