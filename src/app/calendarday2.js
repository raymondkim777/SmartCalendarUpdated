// Inspiration: https://pagedone.io/blocks/application/calendar

const CalendarDay2 = ({ index, days, times, events, cells }) => {
    let dayCSS = index == Math.floor((days.length - 1) / 2) ? 'text-indigo-600' : 'text-gray-900';

    // Calendar Event Colors
    const eventColors = ['border-yellow-600 bg-yellow-50', 'border-green-600 bg-green-50', 'border-purple-600 bg-purple-50', 'border-blue-600 bg-blue-50'];
    const titleColors = ['text-yellow-600', 'text-green-600', 'text-purple-600', 'text-blue-600'];

    for (let i = 0; i < events.length; i++) {
        events[i].set('boxCSS', eventColors[i % eventColors.length]);
        events[i].set('textCSS', titleColors[i % titleColors.length]);
    }

    return(
        <div className='flex flex-col w-full h-fit border-t border-b'>
            <div className={`h-12 flex items-center justify-center border-gray-200 text-sm font-medium ${dayCSS}`}>
                {days[index].toLocaleString('default', { month: 'short' })} {days[index].getDate()}
            </div>
            <div className="flex flex-row w-full h-fit border-t">
                {/* Times */}
                <div className="flex flex-col w-1/12 min-w-16 h-fit divide-y">
                    {times.map((item, index) => (
                        <div key={`time-${index}`} className="h-32 lg:h-28 p-0.5 border-gray-200 flex items-end">
                            <span key={index} className="text-xs font-semibold text-gray-400">{item}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col grow h-fit group divide-y">
                    {times.map((item, timeIdx) => (
                        <div key={`cell-${timeIdx}`} className="h-32 lg:h-28 p-0.5 border-gray-200">
                            {cells[index][timeIdx].map((event, eventIdx) => (
                                <div key={`box-event-${index}-${eventIdx}`} className={`rounded p-1.5 border-l-2 ${event.get('boxCSS')}`}>
                                    <p key={`title-event-${index}-${eventIdx}`} className="text-xs font-normal text-gray-900 mb-px">{event.get('title')}</p>
                                    <p key={`time-event-${index}-${eventIdx}`} className={`text-xs font-semibold ${event.get('textCSS')}`}>
                                        {Math.floor(event.get('start') / 100).toString().length < 2 ? '0' : ''}{Math.floor(event.get('start') / 100)}:{(event.get('start') % 100).toString().length < 2 ? '0' : ''}{event.get('start') % 100} - {Math.floor(event.get('end') / 100).toString().length < 2 ? '0' : ''}{Math.floor(event.get('end') / 100)}:{(event.get('end') % 100).toString().length < 2 ? '0' : ''}{(event.get('end') % 100)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CalendarDay2;