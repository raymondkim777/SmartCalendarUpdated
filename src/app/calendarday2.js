// Inspiration: https://pagedone.io/blocks/application/calendar

const CalendarDay2 = ({ index, days, times, cells }) => {
    const todayDate = new Date(new Date().toDateString());
    let dayCSS = days[index].getTime() == todayDate.getTime() ? 'text-indigo-600' : 'text-gray-900';

    // Calendar Event Colors
    const eventColors = ['border-yellow-600 bg-yellow-50', 'border-green-600 bg-green-50', 'border-purple-600 bg-purple-50', 'border-blue-600 bg-blue-50'];
    const titleColors = ['text-yellow-600', 'text-green-600', 'text-purple-600', 'text-blue-600'];

    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            for (let k = 0; k < cells[i][j].length; k++) {
                cells[i][j][k].set('boxCSS', eventColors[cells[i][j][k].get('index') % eventColors.length]);
                cells[i][j][k].set('textCSS', titleColors[cells[i][j][k].get('index') % titleColors.length]);
                // if continuing from top
                cells[i][j][k].set('topCSS', cells[i][j][k].get('upContinue') ? 'rounded-t-none': '');
                // if continuing to bottom
                cells[i][j][k].set('downCSS', cells[i][j][k].get('downContinue') ? 'rounded-b-none h-full': '');
            }
        }
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
                        <div key={`time-${index}`} className="h-32 lg:h-28 p-0.5 border-gray-200 flex items-end">
                            <span key={index} className="text-xs font-semibold text-gray-400">{`${hour == 12 || hour == 0 ? hour : hour % 12}:00 ${hour >=12 ? 'pm' : 'am'}`}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col grow h-fit group divide-y">
                    {times.map((item, timeIdx) => (
                        <div key={`cell-${timeIdx}`} className="h-32 lg:h-28 px-0.5 border-gray-200">
                            {cells[index][timeIdx].map((cellEvent, eventIdx) => (
                                <div key={`box-event-${index}-${eventIdx}`} className={`min-h-8 rounded p-1.5 border-l-2 ${cellEvent.get('boxCSS')} ${cellEvent.get('topCSS')} ${cellEvent.get('downCSS')}`}>
                                    {
                                        cellEvent.get('upContinue') ? null : 
                                        <div className='flex flex-col w-full h-fit'>
                                            <p key={`title-event-${index}-${eventIdx}`} className="text-xs font-normal text-gray-900 mb-px">{cellEvent.get('title')}</p>
                                            <p key={`time-event-${index}-${eventIdx}`} className={`text-xs font-semibold ${cellEvent.get('textCSS')}`}>
                                                {Math.floor(cellEvent.get('start') / 100).toString().length < 2 ? '0' : ''}{Math.floor(cellEvent.get('start') / 100)}:{(cellEvent.get('start') % 100).toString().length < 2 ? '0' : ''}{cellEvent.get('start') % 100} - {Math.floor(cellEvent.get('end') / 100).toString().length < 2 ? '0' : ''}{Math.floor(cellEvent.get('end') / 100)}:{(cellEvent.get('end') % 100).toString().length < 2 ? '0' : ''}{(cellEvent.get('end') % 100)}
                                            </p>
                                        </div>
                                    }
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