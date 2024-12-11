// Inspiration: https://pagedone.io/blocks/application/calendar

const CalendarWeek2 = () => {
    // Calendar Setup
    const times = new Array();
    const start = 7;
    const end = 19;
    for (let hour = start; hour <= end; hour++)
        times.push(hour);

    const days = new Array();
    const dayCnt = 6;
    const leftDayCnt = Math.floor((dayCnt - 1)/2);
    const rightDayCnt = Math.ceil((dayCnt - 1)/2);

    const dayCSS = new Array(leftDayCnt).fill('text-gray-900').concat(
        ['text-indigo-600'].concat(
            new Array(rightDayCnt).fill('text-gray-900')
        )
    );

    let todayDate = new Date(new Date().toDateString());
    for (let diff = -leftDayCnt; diff <= rightDayCnt; diff++) {
        let temp = new Date(new Date().toDateString());
        temp.setDate(todayDate.getDate() + diff);
        days.push(temp);
    }
    
    // Calendar Events
    // event: {startFull, date, start, end, title, location}
    let events = [ 
        new Map([
            ['startFull', new Date('Dec 8, 2024 10:00:00')],
            ['date', new Date('Dec 8, 2024')],
            ['start', 1000],
            ['end', 1100],
            ['title', 'Daily Standup Meeting'],
            ['location', 'Some Random Place']
        ]),
        new Map([
            ['startFull', new Date('Dec 9, 2024 8:00:00')],
            ['date', new Date('Dec 9, 2024')],
            ['start', 800],
            ['end', 900],
            ['title', 'Breakfast with Friend'],
            ['location', 'Some Random Place']
        ]),
        new Map([
            ['startFull', new Date('Dec 9, 2024 9:30:00')],
            ['date', new Date('Dec 9, 2024')],
            ['start', 930],
            ['end', 1000],
            ['title', 'Badminton Class'],
            ['location', 'Some Random Place']
        ]),
        new Map([
            ['startFull', new Date('Dec 10, 2024 6:00:00')],
            ['date', new Date('Dec 10, 2024')],
            ['start', 600],
            ['end', 730],
            ['title', 'Pickup Family'],
            ['location', 'Some Random Place']
        ]),
        new Map([
            ['startFull', new Date('Dec 10, 2024 11:00:00')],
            ['date', new Date('Dec 10, 2024')],
            ['start', 1100],
            ['end', 1230],
            ['title', 'Meeting with Project Manager'],
            ['location', 'Some Random Place']
        ]),
        new Map([
            ['startFull', new Date('Dec 11, 2024 6:00:00')],
            ['date', new Date('Dec 11, 2024')],
            ['start', 600],
            ['end', 755],
            ['title', 'Workout and Yoga Seesion'],
            ['location', 'Some Random Place']
        ]),
        new Map([
            ['startFull', new Date('Dec 11, 2024 10:00:00')],
            ['date', new Date('Dec 11, 2024')],
            ['start', 1000],
            ['end', 1145],
            ['title', 'School Friend Birthday Party'],
            ['location', 'Some Random Place']
        ]),
        new Map([
            ['startFull', new Date('Dec 12, 2024 8:00:00')],
            ['date', new Date('Dec 12, 2024')],
            ['start', 800],
            ['end', 825],
            ['title', 'Project Task Review'],
            ['location', 'Some Random Place']
        ]),
        new Map([
            ['startFull', new Date('Dec 13, 2024 9:00:00')],
            ['date', new Date('Dec 13, 2024')],
            ['start', 900],
            ['end', 1045],
            ['title', 'Doctor Appointment'],
            ['location', 'Some Random Place']
        ]),
    ]
    const cells = new Array(dayCnt);
    for (let i = 0; i < cells.length; i++) {
        cells[i] = new Array(times.length);
        for (let j = 0; j < cells[i].length; j++) {
            cells[i][j] = [];
        }
    }

    events.sort(function(a, b) {
        if (a.startFull < b.startFull) return -1;
        if (a.startFull > b.startFull) return 1;
        return 0;
    });

    let eventIdx = 0;
    for (let curDayIdx = 0; curDayIdx < dayCnt; curDayIdx++) {
        while (eventIdx < events.length && events[eventIdx].get('date') < days[curDayIdx]) {
            eventIdx++;
        }
        if (eventIdx >= events.length) break;

        let timeIdx = 0;
        while (eventIdx < events.length && events[eventIdx].get('date').getTime() == days[curDayIdx].getTime()) {
            while (timeIdx < times.length && times[timeIdx] * 100 < events[eventIdx].get('start'))
                timeIdx++;
            if (timeIdx >= times.length) break;

            cells[curDayIdx][timeIdx].push(events[eventIdx]);
            eventIdx++;
        }
    }

    return(
        <div className="flex flex-row w-full h-fit border-t border-b">
            {/* Times */}
            <div style={{width: 1 / (dayCnt + 1) * 100 + '%'}} className={`flex flex-col h-fit divide-y`}>
                <div className="h-12 flex items-center justify-center border-gray-200 text-sm font-medium text-gray-900 transition-all duration-300"/>
                {times.map((hour, index) => (
                    <div key={`time-${index}`} className="h-32 lg:h-28 p-0.5 border-gray-200 flex items-end transition-all duration-300">
                        <span key={index} className="text-xs font-semibold text-gray-400">{`${hour}:00 ${hour >=12 ? 'pm' : 'am'}`}</span>
                    </div>
                ))}
            </div>
            {days.map((item, index) => (
                <div key={`col-${index}`} style={{width: 1 / (dayCnt + 1) * 100 + '%'}} className={`flex flex-col h-fit group divide-y`}>
                    <div key={`day-${index}`} className={`${dayCSS[index]} h-12 flex items-center justify-center border-gray-200 text-sm font-medium transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer`}>
                        {item.toLocaleString('default', { month: 'short' })} {item.getDate()}
                    </div>
                    {times.map((subItem, subIndex) => (
                        <div key={`cell-${subIndex}`} className="h-32 lg:h-28 p-0.5 border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer">

                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default CalendarWeek2;