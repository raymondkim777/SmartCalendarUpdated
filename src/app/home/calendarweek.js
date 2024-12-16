// Inspiration: https://pagedone.io/blocks/application/calendar
"use client"
import { useState } from "react";
import WeekCellContent from "./calweekcomponents/weekcellcontent";
import EventModal from "./modals/eventmodal";
import MoveModal from "./modals/movemodal";

const findMaxEventsForEachCell = (cells, times) => {
    let maxEventsInCell = new Array(times.length).fill(1);
    for (let j = 0; j < cells[0].length; j++) 
        for (let i = 0; i < cells.length; i++) 
            maxEventsInCell[j] = Math.max(maxEventsInCell[j], cells[i][j].length);
    return maxEventsInCell;
}

const setCellCSS = (cells) => {
    const eventColors = ['border-yellow-600 bg-yellow-50', 'border-green-600 bg-green-50', 'border-purple-600 bg-purple-50', 'border-blue-600 bg-blue-50'];
    const titleColors = ['text-yellow-600', 'text-green-600', 'text-purple-600', 'text-blue-600'];
    const hoverColors = ['hover:bg-yellow-100', 'hover:bg-green-100', 'hover:bg-purple-100', 'hover:bg-blue-100'];
    const activeColors = ['active:bg-yellow-200', 'active:bg-green-200', 'active:bg-purple-200', 'active:bg-blue-200'];

    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            for (let k = 0; k < cells[i][j].length; k++) {
                if (cells[i][j][k].get('moveType')) {
                    cells[i][j][k].set('boxCSS', 'border-red-500 bg-red-50');
                    cells[i][j][k].set('textCSS', 'text-red-500');
                    // if continuing from top
                    cells[i][j][k].set('topCSS', cells[i][j][k].get('upContinue') ? 'rounded-t-none': '');
                    // if continuing to bottom
                    cells[i][j][k].set('downCSS', cells[i][j][k].get('downContinue') ? 'rounded-b-none h-full': '');
                    cells[i][j][k].set('hoverCSS', 'hover:bg-red-100');
                    cells[i][j][k].set('activeCSS', 'active:bg-red-200');
                    continue;
                } 
                cells[i][j][k].set('boxCSS', eventColors[cells[i][j][k].get('index') % eventColors.length]);
                cells[i][j][k].set('textCSS', titleColors[cells[i][j][k].get('index') % titleColors.length]);
                // if continuing from top
                cells[i][j][k].set('topCSS', cells[i][j][k].get('upContinue') ? 'rounded-t-none': '');
                // if continuing to bottom
                cells[i][j][k].set('downCSS', cells[i][j][k].get('downContinue') ? 'rounded-b-none h-full': '');
                cells[i][j][k].set('hoverCSS', hoverColors[cells[i][j][k].get('index') % hoverColors.length]);
                cells[i][j][k].set('activeCSS', activeColors[cells[i][j][k].get('index') % activeColors.length]);
            }
        }
    }
}

const CalendarWeek = ({ clickedDay, days, times, cells }) => {
    const todayDate = new Date(new Date().toDateString());

    const dayCSS = new Array();
    for (let i = 0; i < days.length; i++) {
        if (days[i].getTime() == todayDate.getTime())
            dayCSS.push('text-indigo-600');
        else dayCSS.push('text-gray-900');
    }

    let maxEventsInCell = findMaxEventsForEachCell(cells, times);
    setCellCSS(cells);

    const cellHeights = ['lg:h-12', 'lg:h-24', 'lg:h-36', 'lg:h-48', 'lg:h-60', 'lg:h-72'];
    const altCellHeights = ['h-16', 'h-28', 'h-40', 'h-56', 'h-64', 'h-80'];

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
        <div className="flex flex-row w-full h-fit border-t border-b">
            {/* Times */}
            <div style={{width: 1 / (days.length + 1) * 100 + '%'}} className={`flex flex-col h-fit divide-y`}>
                <div className="h-12 flex items-center justify-center border-gray-200 text-sm font-medium text-gray-900 transition-all duration-300"/>
                {times.map((hour, index) => (
                    <div key={`time-${index}`} className={`${altCellHeights[maxEventsInCell[index] - 1]} ${cellHeights[maxEventsInCell[index] - 1]} p-0.5 border-gray-200 flex items-end transition-all duration-300`}>
                        <span key={index} className="text-xs font-semibold text-gray-400">{`${hour % 12 == 0 ? 12 : hour % 12}:00 ${hour >=12 ? 'pm' : 'am'}`}</span>
                    </div>
                ))}
            </div>
            {days.map((item, index) => (
                <div onClick={()=>clickedDay(index)} key={`col-${index}`} style={{width: 1 / (days.length + 1) * 100 + '%'}} className={`flex flex-col h-fit group divide-y`}>
                    <div key={`day-${index}`} className={`${dayCSS[index]} h-12 flex items-center justify-center border-gray-200 text-sm font-medium transition-all group-hover:bg-gray-200 group-active:bg-gray-300 duration-300 hover:cursor-pointer`}>
                        {item.toLocaleString('default', { month: 'short' })} {item.getDate()}
                    </div>
                    {times.map((subItem, subIndex) => (
                        <div key={`cell-${subIndex}`} className={`${altCellHeights[maxEventsInCell[subIndex] - 1]} ${cellHeights[maxEventsInCell[subIndex] - 1]} px-0.5 border-gray-200 transition-all group-hover:bg-gray-200 hover:cursor-pointer group-active:bg-gray-300 group-active:border-gray-300 duration-300`}>
                            {cells[index][subIndex].map((cellEvent, eIdx) => (
                                <WeekCellContent key={`cell-${index}-${subIndex}-${eIdx}`} cellEvent={cellEvent} subIndex={subIndex} expandEvent={expandEvent} expandMove={expandMove} />
                            ))}
                        </div>
                    ))}
                </div>
            ))}

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

export default CalendarWeek;