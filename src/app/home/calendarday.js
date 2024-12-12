// Inspiration: https://pagedone.io/blocks/application/calendar
"use client"
import { useState } from "react";
import EventModal from "./modals/eventmodal";
import MoveModal from "./modals/movemodal";

const CalendarDay = ({ index, days, times, cells }) => {
    const todayDate = new Date(new Date().toDateString());
    let dayCSS = days[index].getTime() == todayDate.getTime() ? 'text-indigo-600' : 'text-gray-900';

    let maxEventsInCell = new Array(times.length).fill(0);

    // Calendar Event Colors
    const eventColors = ['border-yellow-600 bg-yellow-50', 'border-green-600 bg-green-50', 'border-purple-600 bg-purple-50', 'border-blue-600 bg-blue-50'];
    const titleColors = ['text-yellow-600', 'text-green-600', 'text-purple-600', 'text-blue-600'];
    const hoverColors = ['hover:bg-yellow-100', 'hover:bg-green-100', 'hover:bg-purple-100', 'hover:bg-blue-100'];
    const activeColors = ['active:bg-yellow-200', 'active:bg-green-200', 'active:bg-purple-200', 'active:bg-blue-200'];

    for (let j = 0; j < cells[index].length; j++) {
        maxEventsInCell[j] = Math.max(maxEventsInCell[j], cells[index][j].length);
        for (let k = 0; k < cells[index][j].length; k++) {
            if (cells[index][j][k].get('moveType')) {
                cells[index][j][k].set('boxCSS', 'border-red-500 bg-red-50');
                cells[index][j][k].set('textCSS', 'text-red-500');
                // if continuing from top
                cells[index][j][k].set('topCSS', cells[index][j][k].get('upContinue') ? 'rounded-t-none': '');
                // if continuing to bottom
                cells[index][j][k].set('downCSS', cells[index][j][k].get('downContinue') ? 'rounded-b-none h-full': '');
                cells[index][j][k].set('hoverCSS', 'hover:bg-red-100');
                cells[index][j][k].set('activeCSS', 'active:bg-red-200');
                continue;
            } 
            cells[index][j][k].set('boxCSS', eventColors[cells[index][j][k].get('index') % eventColors.length]);
            cells[index][j][k].set('textCSS', titleColors[cells[index][j][k].get('index') % titleColors.length]);
            // if continuing from top
            cells[index][j][k].set('topCSS', cells[index][j][k].get('upContinue') ? 'rounded-t-none': '');
            // if continuing to bottom
            cells[index][j][k].set('downCSS', cells[index][j][k].get('downContinue') ? 'rounded-b-none h-full': '');
            cells[index][j][k].set('hoverCSS', hoverColors[cells[index][j][k].get('index') % hoverColors.length]);
            cells[index][j][k].set('activeCSS', activeColors[cells[index][j][k].get('index') % activeColors.length]);
        }
    }

    
    // Cell Height
    for (let i = 0; i < maxEventsInCell.length; i++) {
        maxEventsInCell[i] = Math.max(1, maxEventsInCell[i]);
    }
    const cellHeights = ['lg:h-12', 'lg:h-24', 'lg:h-36', 'lg:h-48', 'lg:h-60', 'lg:h-72'];
    const altCellHeights = ['h-16', 'h-28', 'h-40', 'h-56', 'h-64', 'h-80'];

    // Cell Content
    const methodList = ['Walking', 'Car', 'Subway', 'Bus'];

    const formatTime = (time) => {
        let msg = time.toString();
        if (time.toString().length < 2) 
            msg = '0' + msg;
        return msg;
    }

    // Modals
    const [showEventModal, setShowEventModal] = useState(false);
    const [eventDetails, setEventDetails] = useState(null);

    const expandEvent = (chosenEvent) => {
        setEventDetails(chosenEvent);
        setShowEventModal(true);
    }

    const closeEvent = () => {
        setEventDetails(null);
        setShowEventModal(false);
    }

    const [showMoveModal, setShowMoveModal] = useState(false);
    const [moveDetails, setMoveDetails] = useState(null);

    const expandMove = (chosenMove) => {
        setMoveDetails(chosenMove);
        setShowMoveModal(true);
    }

    const closeMove = () => {
        setMoveDetails(null);
        setShowMoveModal(false);
    }

    return(
        <div className='flex flex-col w-full h-fit border-t border-b'>
            <div className={`h-12 flex items-center justify-center border-gray-200 text-sm font-medium ${dayCSS}`}>
                {days[index].toLocaleString('default', { month: 'short' })} {days[index].getDate()}
            </div>
            <div className="flex flex-row w-full h-fit border-t">
                {/* Times */}
                <div className="flex flex-col w-1/12 min-w-16 h-fit divide-y">
                    {times.map((hour, index) => (
                        <div key={`time-${index}`} className={`${altCellHeights[maxEventsInCell[index] - 1]} ${cellHeights[maxEventsInCell[index] - 1]} p-0.5 border-gray-200 flex items-end`}>
                            <span key={index} className="text-xs font-semibold text-gray-400">{`${hour % 12 == 0 ? 12 : hour % 12}:00 ${hour >=12 ? 'pm' : 'am'}`}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col grow h-fit group divide-y">
                    {times.map((item, timeIdx) => (
                        <div key={`cell-${timeIdx}`} className={`${altCellHeights[maxEventsInCell[timeIdx] - 1]} ${cellHeights[maxEventsInCell[timeIdx] - 1]} px-0.5 border-gray-200`}>
                            {cells[index][timeIdx].map((cellEvent, eventIdx) => (
                                <div onClick={()=>cellEvent.get('moveType') ? expandMove(cellEvent) : expandEvent(cellEvent)} key={`box-event-${index}-${eventIdx}`} className={`min-h-8 rounded p-1.5 border-l-2 ${cellEvent.get('boxCSS')} ${cellEvent.get('topCSS')} ${cellEvent.get('downCSS')} ${cellEvent.get('hoverCSS')} ${cellEvent.get('activeCSS')} hover:cursor-pointer transition-all duration-150`}>
                                    {
                                        timeIdx != 0 && cellEvent.get('upContinue') ? null : 
                                        (
                                            cellEvent.get('moveType') ? 
                                            <div className='flex flex-col w-full h-fit pr-2'>
                                                <p key={`title-event-${index}-${eventIdx}`} className="text-xs font-semibold underline truncate text-gray-900 mb-px">({methodList[cellEvent.get('type')]}) {cellEvent.get('name')}</p>
                                                <p key={`time-event-${index}-${eventIdx}`} className={`text-xs font-semibold ${cellEvent.get('textCSS')}`}>
                                                    {formatTime(cellEvent.get('start').getHours())}:{formatTime(cellEvent.get('start').getMinutes())} - {formatTime(cellEvent.get('end').getHours())}:{formatTime(cellEvent.get('end').getMinutes())}
                                                </p>
                                            </div> : 
                                            <div className='flex flex-col w-full h-fit'>
                                                <p key={`title-event-${index}-${eventIdx}`} className="text-xs font-normal truncate text-gray-900 mb-px">{cellEvent.get('title')}</p>
                                                <p key={`time-event-${index}-${eventIdx}`} className={`text-xs font-semibold ${cellEvent.get('textCSS')}`}>
                                                    {formatTime(cellEvent.get('start').getHours())}:{formatTime(cellEvent.get('start').getMinutes())} - {formatTime(cellEvent.get('end').getHours())}:{formatTime(cellEvent.get('end').getMinutes())}
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Event Modal */}
            {
                showEventModal && 
                <EventModal 
                closeEvent={closeEvent} 
                eventDetails={eventDetails} />
            }

            {/* Move Event Modal */}
            {
                showMoveModal && 
                <MoveModal 
                closeMove={closeMove} 
                moveDetails={moveDetails} />
            }
        </div>
    )
}

export default CalendarDay;