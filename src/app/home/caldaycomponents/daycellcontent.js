import { formatTimeDigit } from "@/app/timeformat";

const DayCellContent = ({ cellEvent, timeIdx, expandEvent, expandMove }) => {
    console.log(typeof(cellEvent.get('start')));
    return (
        <div onClick={()=>cellEvent.get('moveType') ? expandMove(cellEvent) : expandEvent(cellEvent)} className={`min-h-8 rounded p-1.5 border-l-2 ${cellEvent.get('boxCSS')} ${cellEvent.get('topCSS')} ${cellEvent.get('downCSS')} ${cellEvent.get('hoverCSS')} ${cellEvent.get('activeCSS')} hover:cursor-pointer transition-all duration-150`}>
            {
                timeIdx != 0 && cellEvent.get('upContinue') ? null : 
                (
                    cellEvent.get('moveType') ? 
                    <div className='flex flex-col w-full h-fit pr-2'>
                        <p className="text-xs font-semibold underline truncate text-gray-900 mb-px">{cellEvent.get('title')}: {cellEvent.get('elapsedTime')} min</p>
                        <p className={`text-xs font-semibold ${cellEvent.get('textCSS')}`}>
                            {formatTimeDigit(cellEvent.get('start').getHours())}:{formatTimeDigit(cellEvent.get('start').getMinutes())} - {formatTimeDigit(cellEvent.get('end').getHours())}:{formatTimeDigit(cellEvent.get('end').getMinutes())}
                        </p>
                    </div> : 
                    <div className='flex flex-col w-full h-fit'>
                        <p className="text-xs font-normal truncate text-gray-900 mb-px">{cellEvent.get('title')}</p>
                        <p className={`text-xs font-semibold ${cellEvent.get('textCSS')}`}>
                            {formatTimeDigit(cellEvent.get('start').getHours())}:{formatTimeDigit(cellEvent.get('start').getMinutes())} - {formatTimeDigit(cellEvent.get('end').getHours())}:{formatTimeDigit(cellEvent.get('end').getMinutes())}
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default DayCellContent;