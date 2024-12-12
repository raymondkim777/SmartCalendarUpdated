'use client'
import { useState, useContext } from "react";

const EventModal = () => {


    return(
        <div className={`flex flex-col items-center z-10 ${showAccountModal && loginStatus ? '' : 'hidden'} absolute top-24 right-2 w-60 h-fit mr-2 pt-1 rounded-lg border border-neutral-400 bg-stone-50`}>
            <div className='flex flex-row w-full h-10 items-center justify-between pl-4 pr-2 space-x-3'>
                <h1 className="text-base leading-6 text-gray-600 font-normal">Your Name Here</h1>
                <div onClick={()=>setShowAccountModal(false)} className='flex items-center justify-center w-9 h-9 rounded-full hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all duration-300'>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#696969" fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"/>
                    </svg>
                </div>
            </div>
            <div onClick={()=>handleLogout()} className='flex flex-row w-full h-12 items-center justify-center space-x-4 px-4 rounded-b-md hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all duration-300'>
                <h1 className="text-base leading-6 text-gray-600 font-semibold">Logout</h1>
            </div>
        </div>
    )
}
    

export default EventModal;