"use client";

import { createContext, useState, useEffect, useContext } from 'react';
import { sql } from '@vercel/postgres';
import { LoginContext } from './LoginContext';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const { currentUser } = useContext(LoginContext);
    const [notifEnabled, setNotifEnabled] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('/api/getsettings', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setNotifEnabled(data.notifEnabled); // Update state with saved value
                }
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        };

        if (currentUser) {
            fetchSettings(); // Fetch saved settings when user logs in
        }
    }, [currentUser]);

    return (
        <SettingsContext.Provider value={{ notifEnabled, setNotifEnabled }}>
            {children}
        </SettingsContext.Provider>
    );
};
