// Inspiration: https://pagedone.io/blocks/application/calendar

const CalendarWeek2 = () => {
    const times = new Array();
    const start = 7;
    const end = 19;
    for (let hour = start; hour <= end; hour++)
        times.push(`${hour}:00 ${hour >=12 ? 'pm' : 'am'}`);

    const days = new Array();
    const dayCnt = 6;
    const leftDayCnt = Math.floor((dayCnt - 1)/2);
    const rightDayCnt = Math.ceil((dayCnt - 1)/2);

    const dayCSS = new Array(leftDayCnt).fill('text-gray-900').concat(
        ['text-indigo-600'].concat(
            new Array(rightDayCnt).fill('text-gray-900')
        )
    );

    let todayDate = new Date();
    for (let diff = -leftDayCnt; diff <= rightDayCnt; diff++) {
        let temp = new Date();
        temp.setDate(todayDate.getDate() + diff);
        days.push(temp);
    }
    

    return(
        <div className="flex flex-row w-full h-fit border-t border-b">
            {/* Times */}
            <div style={{width: 1 / (dayCnt + 1) * 100 + '%'}} className={`flex flex-col h-fit divide-y`}>
                <div className="h-12 flex items-center justify-center border-gray-200 text-sm font-medium text-gray-900 transition-all duration-300"/>
                {times.map((item, index) => (
                    <div key={`time-${index}`} className="h-32 lg:h-28 p-0.5 border-gray-200 flex items-end transition-all duration-300">
                        <span key={index} className="text-xs font-semibold text-gray-400">{item}</span>
                    </div>
                ))}
            </div>
            {days.map((item, index) => (
                <div key={`col-${index}`} style={{width: 1 / (dayCnt + 1) * 100 + '%'}} className={`flex flex-col h-fit group divide-y`}>
                    <div key={`day-${index}`} className={`${dayCSS[index]} h-12 flex items-center justify-center border-gray-200 text-sm font-medium transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer`}>
                        {item.toLocaleString('default', { month: 'short' })} {item.getDate()}
                    </div>
                    {times.map((subItem, subIndex) => (
                        <div key={`cell-${subIndex}`} className="h-32 lg:h-28 p-0.5 border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default CalendarWeek2;