// different from formatTime in @/app/timeformat
const formatTime = (time) => {
    let msg = time.toString();
    if (time.toString().length < 2) 
        msg = '0' + msg;
    return msg;
}

const WeekCellContent = ({ cellEvent, subIndex, expandEvent, expandMove }) => (
    <div onClick={(event)=>{event.stopPropagation(); cellEvent.get('moveType') ? expandMove(cellEvent) : expandEvent(cellEvent)}} className={`min-h-8 rounded p-1.5 border-l-2 ${cellEvent.get('boxCSS')} ${cellEvent.get('topCSS')} ${cellEvent.get('downCSS')} ${cellEvent.get('hoverCSS')} ${cellEvent.get('activeCSS')} hover:cursor-pointer transition-all duration-150`}>
    {
        subIndex != 0 && cellEvent.get('upContinue') ? null : 
        (
            cellEvent.get('moveType') ? 
            <div className='flex flex-col w-full h-fit pr-2'>
                <p className="text-xs font-semibold truncate underline text-gray-900 mb-px">{cellEvent.get('title')}: {cellEvent.get('elapsedTime')} min</p>
                <p className={`text-xs font-semibold ${cellEvent.get('textCSS')}`}>
                    {formatTime(cellEvent.get('start').getHours())}:{formatTime(cellEvent.get('start').getMinutes())} - {formatTime(cellEvent.get('end').getHours())}:{formatTime(cellEvent.get('end').getMinutes())}
                </p>
            </div> : 
            <div className='flex flex-col w-full h-fit'>
                <p className="text-xs font-normal truncate text-gray-900 mb-px">{cellEvent.get('title')}</p>
                <p className={`text-xs font-semibold ${cellEvent.get('textCSS')}`}>
                    {formatTime(cellEvent.get('start').getHours())}:{formatTime(cellEvent.get('start').getMinutes())} - {formatTime(cellEvent.get('end').getHours())}:{formatTime(cellEvent.get('end').getMinutes())}
                </p>
            </div>
        )
    }
    </div>
)

export default WeekCellContent;