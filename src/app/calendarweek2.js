// Inspiration: https://pagedone.io/blocks/application/calendar

const CalendarWeek2 = ({ clickedDay, days, times, events, cells }) => {
    const todayDate = new Date(new Date().toDateString());

    const dayCSS = new Array();
    for (let i = 0; i < days.length; i++) {
        if (days[i].getTime() == todayDate.getTime())
            dayCSS.push('text-indigo-600');
        else dayCSS.push('text-gray-900');
    }
    
    // Calendar Event Colors
    const eventColors = ['border-yellow-600 bg-yellow-50', 'border-green-600 bg-green-50', 'border-purple-600 bg-purple-50', 'border-blue-600 bg-blue-50'];
    const titleColors = ['text-yellow-600', 'text-green-600', 'text-purple-600', 'text-blue-600'];

    for (let i = 0; i < events.length; i++) {
        events[i].set('boxCSS', eventColors[i % eventColors.length]);
        events[i].set('textCSS', titleColors[i % titleColors.length]);
    }

    return(
        <div className="flex flex-row w-full h-fit border-t border-b">
            {/* Times */}
            <div style={{width: 1 / (days.length + 1) * 100 + '%'}} className={`flex flex-col h-fit divide-y`}>
                <div className="h-12 flex items-center justify-center border-gray-200 text-sm font-medium text-gray-900 transition-all duration-300"/>
                {times.map((hour, index) => (
                    <div key={`time-${index}`} className="h-32 lg:h-28 p-0.5 border-gray-200 flex items-end transition-all duration-300">
                        <span key={index} className="text-xs font-semibold text-gray-400">{`${hour == 12 || hour == 0 ? hour : hour % 12}:00 ${hour >=12 ? 'pm' : 'am'}`}</span>
                    </div>
                ))}
            </div>
            {days.map((item, index) => (
                <div key={`col-${index}`} style={{width: 1 / (days.length + 1) * 100 + '%'}} onClick={()=>clickedDay(index)} className={`flex flex-col h-fit group divide-y`}>
                    <div key={`day-${index}`} className={`${dayCSS[index]} h-12 flex items-center justify-center border-gray-200 text-sm font-medium transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer`}>
                        {item.toLocaleString('default', { month: 'short' })} {item.getDate()}
                    </div>
                    {times.map((subItem, subIndex) => (
                        <div key={`cell-${subIndex}`} className="h-32 lg:h-28 p-0.5 border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer">
                            {cells[index][subIndex].map((event, eIdx) => (
                                <div key={`box-event-${index}-${subIndex}-${eIdx}`} className={`rounded p-1.5 border-l-2 ${event.get('boxCSS')}`}>
                                    <p key={`title-event-${index}-${subIndex}-${eIdx}`} className="text-xs font-normal text-gray-900 mb-px">{event.get('title')}</p>
                                    <p key={`time-event-${index}-${subIndex}-${eIdx}`} className={`text-xs font-semibold ${event.get('textCSS')}`}>
                                        {Math.floor(event.get('start') / 100).toString().length < 2 ? '0' : ''}{Math.floor(event.get('start') / 100)}:{(event.get('start') % 100).toString().length < 2 ? '0' : ''}{event.get('start') % 100} - {Math.floor(event.get('end') / 100).toString().length < 2 ? '0' : ''}{Math.floor(event.get('end') / 100)}:{(event.get('end') % 100).toString().length < 2 ? '0' : ''}{(event.get('end') % 100)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default CalendarWeek2;