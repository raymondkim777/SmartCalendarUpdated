"use client"

import { createContext, useState, useContext, useEffect } from 'react';
// import { sql } from '@vercel/postgres';
import { LoginContext } from './LoginContext';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const { currentUser } = useContext(LoginContext);
    const [notifEnabled, setNotifEnabled] = useState(false); 

    // useEffect(() => {
    //     async function updateSettingsDB() {
    //         if (!currentUser) return;

    //         console.log("updated settings in db")
    //         await sql`
    //         UPDATE user_info
    //         SET notifications = ${notifEnabled}
    //         WHERE email = ${currentUser.email}
    //         `;
    //     }
    //     // updateSettingsDB();
    // }, [notifEnabled])

    return (
        <SettingsContext.Provider value={{ notifEnabled, setNotifEnabled }}>
            {children}
        </SettingsContext.Provider>
    );
};