"use client"

import { useState } from 'react';
import PlaceCard from './move/placecard';
import TransportationCard from './move/transportationcard';

// Time Format
const formatTimeDigit = (time) => {
    let msg = time.toString();
    if (time.toString().length < 2) 
        msg = '0' + msg;
    return msg;
}

const formatDate = (date) => {
    let hours = formatTimeDigit(date.getHours() % 12 == 0 ? 12 : date.getHours() % 12);
    let minutes = formatTimeDigit(date.getMinutes());
    let apm = date.getHours() >= 12 ? 'pm' : 'am';
    let msg = `${hours}:${minutes} ${apm} (${date.toDateString()})`
    return msg;
}

const MoveModal = ({ closeMove, moveDetails }) => {
    let placeDetails = [moveDetails.get('route')[0].get('locations')];
    for (let i = 0; i < moveDetails.get('route').length; i++)
        placeDetails.push(moveDetails.get('route')[i].get('locatione'));

    const widthCSS = ['w-96 lg:w-[28rem] xl:w-[32rem]', 'w-96 md:w-[48rem] lg:w-[56rem] xl:w-[64rem]'];
    const [showDetails, setShowDetails] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const showEventDetails = (clickedEvent) => {
        setShowDetails(true);
        setSelectedEvent(clickedEvent);
    } 
    
    return(
        <div style={{top: '50%', left: '50%', transform: 'translate(-50%, -43%)'}} className={`flex flex-col items-center z-10 absolute ${widthCSS[Number(showDetails)]} object-center top-60 h-fit mr-2 pt-1 rounded-lg border border-neutral-400 bg-stone-50 transition-all duration-300`}>
            <div className='flex flex-row w-full h-10 items-center justify-between pl-4 pr-2 space-x-3'>
                <h1 className="text-lg text-nowrap truncate leading-6 text-gray-600 font-semibold">{moveDetails.get('title')}: {moveDetails.get('elapsedTime')} min</h1>
                <div onClick={closeMove} className='flex items-center justify-center w-9 h-9 rounded-full hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all duration-300'>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#696969" fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"/>
                    </svg>
                </div>
            </div>
            <div className="flex flex-row w-full h-fit max-h-80 md:max-h-96 lg:max-h-[32rem] xl:max-h-[42rem] items-center justify-center">
                {/* Route */}
                <div className='flex flex-col w-full h-fit max-h-80 md:max-h-96 lg:max-h-[32rem] xl:max-h-[42rem] items-center justify-start pt-2 pb-4 px-4 space-y-4 overflow-y-auto no-scrollbar'>
                    {/* Times */}
                    <div className='flex flex-row w-full h-12 items-center justify-start space-x-4 px-2'>
                        <div className='flex flex-col w-fit h-fit items-start justify-center'>
                            <span className='text-base leading-6 text-gray-600 font-normal'>From: </span>
                            <span className='text-base leading-6 text-gray-600 font-normal'>Until: </span>
                        </div>
                        <div className='flex flex-col grow h-12 items-start justify-center'>
                            <span className='text-base leading-6 text-gray-600 font-normal'>{formatDate(moveDetails.get('start'))}</span>
                            <span className='text-base leading-6 text-gray-600 font-normal'>{formatDate(moveDetails.get('end'))}</span>
                        </div>
                    </div>

                    {/* Move Type */}
                    <div className='flex flex-col w-full h-fit items-center justify-start'>
                        {moveDetails.get('route').map((route, index)=>(
                            <div key={`route-${index}`} className='flex flex-col w-full h-fit items-center justify-center'>
                                <PlaceCard showModal={showEventDetails} place={placeDetails[index]} description={route.get('start')} type={index == 0 ? 'nodeStart' : 'node'}/>
                                <TransportationCard showModal={showEventDetails} move={route}/>
                            </div>
                        ))}
                        <PlaceCard showModal={showEventDetails} place={placeDetails[placeDetails.length - 1]} description={moveDetails.get('route')[moveDetails.get('route').length - 1].get('end')} type={'nodeEnd'} />
                    </div>
                </div>

                {/* Specific */}
                {
                    showDetails && 
                    <div className={`hidden md:flex flex-col w-2/3 h-fit max-h-96 lg:max-h-[32rem] xl:max-h-[42rem] items-center justify-start`}>
                    {
                        typeof(selectedEvent) == "string" ? 
                        <div className="flex flex-col w-full items-center justify-center p-4 space-y-4">
                            <h1 className="text-lg text-center line-clamp-1 leading-6 text-gray-600 font-semibold">{selectedEvent}</h1>
                            <div className='w-full h-60 lg:h-80 xl:h-96 bg-gray-200 rounded-lg'></div>
                        </div>: 
                        <div className="flex flex-col w-full items-center justify-center p-4 space-y-4">
                            <h1 className="text-lg text-center line-clamp-2 leading-6 text-gray-600 font-semibold">{selectedEvent.get('name')}</h1>
                            <div className='w-full h-60 lg:h-80 xl:h-96 bg-gray-200 rounded-lg'></div>
                        </div>
                    }

                        <div onClick={()=>setShowDetails(false)} className="flex w-32 h-10 items-center justify-center rounded-lg text-gray-600 font-normal bg-gray-200 hover:bg-gray-300 hover:cursor-pointer active:bg-gray-400 transition-all duration-150">Close</div>
                    </div>
                }
                

            </div>

            
        </div>
    )
}

export default MoveModal;