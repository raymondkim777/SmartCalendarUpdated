'use client'

import { useState } from 'react';
import Header from "../header";
import { Toggle } from 'rsuite';
import 'rsuite/Toggle/styles/index.css';


const Settings = () => {
    const [notifChecked, setNotifChecked] = useState(false);
    const clickToggle = () => {
        setNotifChecked(!notifChecked);
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
                            and notify users which methods of transportation to take and when to 
                            begin travels in order to arrive on time. 
                        </span>
                        <Toggle size="lg" checked={notifChecked} onChange={clickToggle}></Toggle>
                    </div> 
                </div>
            </div>
        </section>
        </main>
        </div>
    )
}

export default Settings;