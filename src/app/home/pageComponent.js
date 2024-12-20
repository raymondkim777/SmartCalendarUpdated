"use client"

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import CalendarHeader from './calendarheader';

import CalendarWeek from './calendarweek';
import CalendarDay from './calendarday';

const PageComponent = ({ eventsData, routeData }) => {
    // Calendar CSS
    const [calendarTypeIdx, setCalendarTypeIdx] = useState(1);
    const [buttonCSS, setButtonCSS] = useState(
        new Array(calendarTypeIdx).fill('text-gray-500').concat(
            ['bg-white text-indigo-600'].concat(
                new Array(3 - calendarTypeIdx).fill('text-gray-500')
            )
        )
    );
    const updateCalendarType = (index) => {
        setCalendarTypeIdx(index);
        const new_css = new Array(3).fill('text-gray-500');
        new_css[index] = 'bg-white text-indigo-600';
        setButtonCSS(new_css);
    }
    
    // Content Setup
    const times = new Array();
    const start = 1;
    const end = 24;
    for (let hour = start; hour <= end; hour++)
        times.push(hour);

    const dayCnt = 6;
    const leftDayCnt = Math.floor((dayCnt - 1)/2);
    const rightDayCnt = Math.ceil((dayCnt - 1)/2);
    
    const todayDate = new Date(new Date().toDateString());
    let tempDays = new Array();
    for (let diff = -leftDayCnt; diff <= rightDayCnt; diff++) {
        let temp = new Date(new Date().toDateString());
        temp.setDate(todayDate.getDate() + diff);
        tempDays.push(temp);
    }
    
    // Date Indices
    const [dayIndex, setDayIndex] = useState(Math.floor((dayCnt - 1) / 2));
    const [days, setDays] = useState(tempDays);

    // Calendar Navigation
    const [curCalendarDay, setCurCalendarDay] = useState(todayDate);

    const updateDays = (givenDate, calIdx) => {
        const givenDateNoTime = new Date(givenDate.toDateString());
        let tempDays = new Array();
        for (let diff = -leftDayCnt; diff <= rightDayCnt; diff++) {
            let temp = new Date(givenDateNoTime.getTime());
            temp.setDate(givenDateNoTime.getDate() + diff);
            tempDays.push(temp);
        }
        setDays(tempDays);
        setDayIndex(Math.floor((dayCnt - 1) / 2));
        setCurCalendarDay(givenDateNoTime);
        updateCalendarType(calIdx);
    }

    const clickedDay = (index) => {
        updateDays(days[index], 0);
    }

    // Clicking Left Arrow
    const clickLeft = () => {
        if (calendarTypeIdx == 0) {
            clickedDay(leftDayCnt - 1);
        } else if (calendarTypeIdx == 1) {
            let temp = new Date(curCalendarDay);  // no time
            temp.setDate(curCalendarDay.getDate() - dayCnt);
            updateDays(temp, 1)
        } else {
            let newDate = new Date(new Date(curCalendarDay).setMonth(curCalendarDay.getMonth() - 1));
            newDate.setDate(1);
            updateDays(newDate, 2);
        }
    }

    // Clicking Right Arrow
    const clickRight = () => {
        if (calendarTypeIdx == 0) {
            clickedDay(leftDayCnt + 1);
        } else if (calendarTypeIdx == 1) {
            let temp = new Date(curCalendarDay);  // no time
            temp.setDate(curCalendarDay.getDate() + dayCnt);
            updateDays(temp, 1)
        } else {
            let newDate = new Date(new Date(curCalendarDay).setMonth(curCalendarDay.getMonth() + 1));
            newDate.setDate(1);
            updateDays(newDate, 2);
        }
    }
    
    // Calendar Events
    eventsData.sort(function(a, b) {
        if (a.get('start') < b.get('start')) return -1;
        if (a.get('start') > b.get('start')) return 1;
        return 0;
    });

    for (let i = 0; i < eventsData.length; i++)
        eventsData[i].set('index', i);

    // Transportation Events
    const moveEvents = []
    for (let i = 0; i < routeData.length; i++) {
        let startTime = routeData[i][0].get('start');
        let endTime = routeData[i][routeData[i].length - 1].get('end');
        let elapsedTime = Math.trunc((endTime - startTime) / (1000 * 60));  //  minutes
        let tempMap = new Map([
            ['moveType', true],
            ['start', startTime],
            ['end', endTime],
            ['title', 'Travel Time'],
            ['elapsedTime', elapsedTime],
            ['route', routeData[i]],
        ]);
        moveEvents.push(tempMap);
    }
    const allEvents = moveEvents.concat(eventsData);

    allEvents.sort(function(a, b) {
        if (a.get('start') < b.get('start')) return -1;
        if (a.get('start') > b.get('start')) return 1;
        return 0;
    });

    const allCells = new Array(dayCnt);
    for (let i = 0; i < allCells.length; i++) {
        allCells[i] = new Array(times.length);
        for (let j = 0; j < allCells[i].length; j++) {
            allCells[i][j] = [];
        }
    }

    // Filling cells array
    let allEventIdx = 0;
    for (let curDayIdx = 0; curDayIdx < dayCnt; curDayIdx++) {
        for (let timeIdx = 0; timeIdx < times.length; timeIdx++) {
            while (true) {
                // if no events left, break
                if (allEventIdx >= allEvents.length) break;
                
                // if event starts before/within time cell
                let prevCellTime = new Date(new Date(days[curDayIdx]).setHours(times[timeIdx] - 1));
                let curCellTime = new Date(new Date(days[curDayIdx]).setHours(times[timeIdx]));

                let startTime = allEvents[allEventIdx].get('start');
                let endTime = allEvents[allEventIdx].get('end');

                if (startTime < curCellTime) {
                    let cellEvent = new Map(allEvents[allEventIdx]);
                    cellEvent.set('upContinue', false);
                    cellEvent.set('downContinue', false);
                    if (startTime < prevCellTime) {
                        // if event is continuing from previous cell
                        if (endTime >= prevCellTime) {
                            cellEvent.set('upContinue', true);
                        } 
                        // event has passed
                        else {
                            allEventIdx++;
                            continue;
                        }
                    }
                    // if event should continue to next cell
                    if (endTime > curCellTime) {
                        cellEvent.set('downContinue', true);
                        allCells[curDayIdx][timeIdx].push(cellEvent);
                        break;
                    }
                    // if event ends here
                    else {
                        allEventIdx++;
                    }
                    allCells[curDayIdx][timeIdx].push(cellEvent);
                } else {
                    break;
                }
            }
        }
    }

    // React Calendar (Month) Setup
    const circleColors = ['bg-yellow-600', 'bg-green-600', 'bg-purple-600', 'bg-blue-600'];

    function tileContent({ date, view }) {
        // Add class to tiles in month view only
        if (!(view === 'month')) return;
        
        let tempEventList = [];
        for (let eventIdx = 0; eventIdx < eventsData.length; eventIdx++) {
            if (!(eventsData[eventIdx].get('start') > new Date(new Date(date.toDateString()).setDate(date.getDate() + 1))) 
            && !(eventsData[eventIdx].get('end') < new Date(date.toDateString()))) {
                tempEventList.push(eventIdx);
            }
        }

        return (
            <div className='flex flex-col w-full h-full items-center justify-center pb-4 space-y-2'>
                <div id="date_circle" className="flex w-10 h-10 rounded-full items-center justify-center">
                    {date.getDate()}
                </div>
                <div className='flex flex-col grow items-center justify-center'>
                    <div className='flex flex-row flex-wrap justify-center gap-x-2 gap-y-1'>
                        {tempEventList.map((value, index)=>(
                            <div key={`circ-${value}`} className={`w-2 h-2 rounded-full ${circleColors[value % circleColors.length]}`}></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='flex w-full h-full overflow-y-auto no-scrollbar'>
        {/* Calendar */}
        <main className="flex flex-col w-full h-fit items-center pt-5">
        <section className="bg-stone-50 w-full max-w-7xl">
            <div className="w-full mx-auto px-8">
                {/* Buttons */}
                <CalendarHeader 
                todayDate={todayDate}
                curCalendarDay={curCalendarDay}
                updateDays={updateDays}
                clickLeft={clickLeft}
                clickRight={clickRight}
                updateCalendarType={updateCalendarType}
                buttonCSS={buttonCSS}
                />

                {/* Calendar */}
                <div className="w-full pb-8">
                {
                    calendarTypeIdx == 0 ? <CalendarDay index={dayIndex} days={days} times={times} cells={allCells} /> :
                    calendarTypeIdx == 1 ? <CalendarWeek clickedDay={clickedDay} days={days} times={times} cells={allCells} /> : 
                    <Calendar className="text-sm font-medium text-gray-900 text-center" 
                    calendarType={"gregory"}
                    view={"month"}
                    showNavigation={false}
                    formatDay={(locale, date) => null}
                    tileContent={tileContent}
                    tileClassName={"flex flex-col h-28 items-center py-2 border-t border-gray-200 font-semibold text-gray-400 duration-300 transition-all hover:bg-gray-200 active:bg-gray-300"}
                    onChange={(value, event) => updateDays(value, 1)}
                    activeStartDate={curCalendarDay}
                    />
                }
                </div>
            </div>
        </section>
        </main>
        </div>
    )
}

export default PageComponent;