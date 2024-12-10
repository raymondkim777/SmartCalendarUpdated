// Inspiration: https://pagedone.io/blocks/application/calendar

const CalendarDay = ({ givenDate }) => {
    const times = new Array();
    const start = 7;
    const end = 19;
    for (let hour = start; hour <= end; hour++)
        times.push(`${hour}:00 ${hour >=12 ? 'pm' : 'am'}`);

    let todayDate = new Date();
    let dayCSS = givenDate == todayDate ? 'text-indigo-600' : 'text-gray-900';

    return(
        <div className='flex flex-col w-full h-fit border-t border-b'>
            <div className={`h-12 flex items-center justify-center border-gray-200 text-sm font-medium ${dayCSS}`}>
                {todayDate.toLocaleString('default', { month: 'short' })} {todayDate.getDate()}
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
                    {times.map((item, index) => (
                        <div key={`cell-${index}`} className="h-32 lg:h-28 p-0.5 border-gray-200"></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CalendarDay;