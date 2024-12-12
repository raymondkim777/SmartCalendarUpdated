"use client"

import { createContext, useState } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [notifEnabled, setNotifEnabled] = useState(false); 

    return (
        <SettingsContext.Provider value={{ notifEnabled, setNotifEnabled }}>
            {children}
        </SettingsContext.Provider>
    );
};