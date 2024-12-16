'use client'

import { useContext, useState } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';
import { Toggle } from 'rsuite';
import 'rsuite/Toggle/styles/index.css';
import Link from 'next/link';
import Header from "../header";

const Settings = () => {
    const { notifEnabled, setNotifEnabled } = useContext(SettingsContext);
    const [ localNotifEnabled, setLocalNotifEnabled ] = useState(notifEnabled);
    const [ showSaveMsg, setShowSaveMsg ] = useState(false);
    
    const toggleNotif = () => {
        setLocalNotifEnabled(()=>!localNotifEnabled);
    } 

    const saveSettings = () => {
        setNotifEnabled(localNotifEnabled);
        setShowSaveMsg(true);
    }

    return(
        <div className='flex flex-col w-full h-screen overflow-hidden bg-stone-50 font-[family-name:var(--font-geist-sans)] font-semibold'>
        <Header />
        {/* Calendar */}
        <main className="flex flex-col w-full h-full items-center pt-5 overflow-y-auto">
        <section className="bg-stone-50 w-full max-w-7xl">
            <div className="w-full mx-auto px-8"> 
                <div className="flex flex-col w-full h-fit items-center justify-center pt-4">
                    <h1 className="w-full h-fit text-start text-2xl leading-8 font-semibold text-gray-900">Notifications</h1>
                    <div className="flex flex-row w-full h-fit items-center justify-between">
                        <span className='w-full h-fit mt-4 text-start text-lg leading-6 font-normal text-gray-900'>
                            Do you wish to receive notifications? 
                            Notifications will remind users about their upcoming events, 
                            and specify which methods of transportation to take and when to 
                            begin travels in order to arrive on time. 
                        </span>
                        <Toggle size="lg" checked={localNotifEnabled} onChange={toggleNotif}></Toggle>
                    </div> 
                </div>
                <div className='flex flex-col w-full h-fit items-center justify-center mt-8'>
                    <div className='flex flex-row w-full h-fit items-center justify-center space-x-6'>
                        <Link href="/home" className='group flex flex-row w-fit h-fit py-3 px-4 rounded-xl bg-gray-200 hover:bg-gray-300 hover:cursor-pointer active:bg-gray-400 transition-all duration-300'>
                            <h1 className='w-32 h-fit text-center text-lg font-semibold text-gray-900 group-hover:text-[#e05959] group-hover:cursor-pointer transition-all duration-300'>Leave</h1>
                        </Link>
                        <div onClick={saveSettings} className='group flex flex-row w-fit h-fit py-3 px-4 rounded-xl bg-gray-200 hover:bg-gray-300 hover:cursor-pointer active:bg-gray-400 transition-all duration-300'>
                            <h1 className='w-32 h-fit text-center text-lg font-semibold text-gray-900 group-hover:text-[#4587ED] group-hover:cursor-pointer transition-all duration-300'>Save Settings</h1>
                        </div>
                    </div>
                    {showSaveMsg && 
                        <div className='w-fit h-fit py-3'>
                            <span className='w-fit h-fit text-center text-lg leading-6 font-normal text-[#4587ED]'>Settings saved!</span>
                        </div>
                    }
                </div>
            </div>
        </section>
        </main>
        </div>
    )
}

export default Settings;