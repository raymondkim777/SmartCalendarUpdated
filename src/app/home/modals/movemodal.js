import { WALK_INDEX, CAR_INDEX, SUB_INDEX, RAIL_INDEX, BUS_INDEX } from '../../transportation'

const LineDiagram = ({ type }) => {
    const sharedCSS = "flex flex-col w-7 h-full items-center justify-center";
    const circleCSS = "w-4 h-4 rounded-full border-[3px] border-gray-600";
    const lineCSS = "w-[3px] bg-gray-600";

    if (type === 'nodeStart') {
        return(
            <div className={`${sharedCSS}`}>
                <div className={`grow`}></div>
                <div className={`${circleCSS}`}></div>
                <div className={`grow ${lineCSS}`}></div>
            </div>
        )
    }
    else if (type === 'node') {
        return(
            <div className={`${sharedCSS}`}>
                <div className={`grow ${lineCSS}`}></div>
                <div className={`${circleCSS}`}></div>
                <div className={`grow ${lineCSS}`}></div>
            </div>
        )
    }
    else if (type === 'nodeEnd') {
        return(
            <div className={`${sharedCSS}`}>
                <div className={`grow ${lineCSS}`}></div>
                <div className={`${circleCSS}`}></div>
                <div className={`grow`}></div>
            </div>
        )
    }
    else if (type === 'line') {
        return(
            <div className={`${sharedCSS}`}>
                <div className={`grow ${lineCSS}`}></div>
            </div>
        )
    }
    return(null);
}

// SVGs
const MethodIcon = ({ index }) => {
    // move.get('type')
    const size = 20;
    const fillColor = "rgb(75 85 99)";
    
    return((
        index == WALK_INDEX ? 
        <svg width={`${size}`} height={`${size}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 22V16.9612C14 16.3537 13.7238 15.7791 13.2494 15.3995L11.5 14M11.5 14L13 7.5M11.5 14L10 13M13 7.5L11 7M13 7.5L15.0426 10.7681C15.3345 11.2352 15.8062 11.5612 16.3463 11.6693L18 12M10 13L11 7M10 13L8 22M11 7L8.10557 8.44721C7.428 8.786 7 9.47852 7 10.2361V12M14.5 3.5C14.5 4.05228 14.0523 4.5 13.5 4.5C12.9477 4.5 12.5 4.05228 12.5 3.5C12.5 2.94772 12.9477 2.5 13.5 2.5C14.0523 2.5 14.5 2.94772 14.5 3.5Z" stroke={`${fillColor}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg> : 
        index == CAR_INDEX ? 
        <svg width={`${size}`} height={`${size}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m20.772 10.156-1.368-4.105A2.995 2.995 0 0 0 16.559 4H7.441a2.995 2.995 0 0 0-2.845 2.051l-1.368 4.105A2.003 2.003 0 0 0 2 12v5c0 .753.423 1.402 1.039 1.743-.013.066-.039.126-.039.195V21a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2h12v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2.062c0-.069-.026-.13-.039-.195A1.993 1.993 0 0 0 22 17v-5c0-.829-.508-1.541-1.228-1.844zM4 17v-5h16l.002 5H4zM7.441 6h9.117c.431 0 .813.274.949.684L18.613 10H5.387l1.105-3.316A1 1 0 0 1 7.441 6z"/><circle cx="6.5" cy="14.5" r="1.5"/><circle cx="17.5" cy="14.5" r="1.5"/>
        </svg> :
        index == SUB_INDEX ? 
        <svg width={`${size}`} height={`${size}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g><path d="M0 0h24v24H0z" fill="none"/><path d="M17.2 20l1.8 1.5v.5H5v-.5L6.8 20H5a2 2 0 0 1-2-2V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v11a2 2 0 0 1-2 2h-1.8zM13 5v6h6V7a2 2 0 0 0-2-2h-4zm-2 0H7a2 2 0 0 0-2 2v4h6V5zm8 8H5v5h14v-5zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></g>
        </svg> : 
        index == RAIL_INDEX ? 
        <svg width={`${size}`} height={`${size}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g><path d="M0 0h24v24H0z" fill="none"/><path d="M17.2 20l1.8 1.5v.5H5v-.5L6.8 20H5a2 2 0 0 1-2-2V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v11a2 2 0 0 1-2 2h-1.8zM7 5a2 2 0 0 0-2 2v11h14V7a2 2 0 0 0-2-2H7zm5 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM6 7h12v4H6V7z"/></g>
        </svg> :
        index == BUS_INDEX ? 
        <svg width={`${size}`} height={`${size}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g><path d="M0 0h24v24H0z" fill="none"/><path d="M17 20H7v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9H2V8h1V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3h1v4h-1v9a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1zM5 5v6h14V5H5zm14 8H5v5h14v-5zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></g>
        </svg> :
        <div>hello</div>
    ))
}

// Time Format
const formatTimeDigit = (time) => {
    let msg = time.toString();
    if (time.toString().length < 2) 
        msg = '0' + msg;
    return msg;
}

const formatTime = (date) => {
    let hours = formatTimeDigit(date.getHours() % 12 == 0 ? 12 : date.getHours() % 12);
    let minutes = formatTimeDigit(date.getMinutes());
    let apm = date.getHours() >= 12 ? 'pm' : 'am';
    return `${hours}:${minutes} ${apm}`
}

const formatDate = (date) => {
    let hours = formatTimeDigit(date.getHours() % 12 == 0 ? 12 : date.getHours() % 12);
    let minutes = formatTimeDigit(date.getMinutes());
    let apm = date.getHours() >= 12 ? 'pm' : 'am';
    let msg = `${hours}:${minutes} ${apm} (${date.toDateString()})`
    return msg;
}

const PlaceCard = ({ place, description, type }) => {
    return(
        <div className="flex flex-row w-full h-12 items-center justify-center">
            <div className="flex flex-row w-fit h-full items-center justify-center ">
                <span className="w-16 text-sm text-center text-gray-600 font-normal">{formatTime(description)}</span>
                <LineDiagram type={type} />
            </div>
            <div className="flex grow h-fit items-center justify-center px-10">
                <span className="w-full py-1 text-base line-clamp-1 text-center leading-5 text-gray-600 font-semibold border-t border-b border-gray-400">
                    {place}
                </span>
            </div>
        </div>
    )
}

const TransportationCard = ({ move }) => {
    const methodList = ['Walk', 'Car', 'Sub', 'Rail', 'Bus'];
    return(
        <div className="flex flex-row w-full h-14 items-center justify-center">
            <div className="flex flex-row w-fit h-full items-center justify-center">
                <div className="flex w-16 items-center justify-end">
                    <MethodIcon index={move.get('type')}/>
                </div>
                <LineDiagram type={'line'} />
            </div>
            <div className="flex flex-col grow h-fit max-h-20 items-center justify-center px-4">
                <span className="w-full text-base line-clamp-2 text-center leading-6 text-gray-600 font-normal">
                    {move.get('name')}
                </span>
                <span className="w-full text-sm line-clamp-2 text-center leading-4 text-gray-400 font-normal">
                    {move.get('description')}
                </span>
            </div>
        </div>
    )
}

const MoveModal = ({ closeMove, moveDetails }) => {
    let placeDetails = [moveDetails.get('route')[0].get('locations')];
    for (let i = 0; i < moveDetails.get('route').length; i++) {
        placeDetails.push(moveDetails.get('route')[i].get('locatione'));
    }

    return(
        <div style={{top: '50%', left: '50%', transform: 'translate(-50%, -43%)'}} className={`flex flex-col items-center z-10 absolute w-96 lg:w-[28rem] xl:w-[32rem] object-center top-60 h-fit mr-2 pt-1 rounded-lg border border-neutral-400 bg-stone-50`}>
            <div className='flex flex-row w-full h-10 items-center justify-between pl-4 pr-2 space-x-3'>
                <h1 className="text-lg text-nowrap truncate leading-6 text-gray-600 font-semibold">{moveDetails.get('title')}: {moveDetails.get('elapsedTime')} min</h1>
                <div onClick={closeMove} className='flex items-center justify-center w-9 h-9 rounded-full hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all duration-300'>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#696969" fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"/>
                    </svg>
                </div>
            </div>
            <div className="flex flex-row w-full h-fit max-h-64 lg:max-h-[32rem] xl:max-h-[42rem] items-center justify-center">
                {/* Route */}
                <div className='flex flex-col w-full h-fit max-h-64 lg:max-h-[32rem] xl:max-h-[42rem] items-center justify-start pt-2 pb-4 px-4 space-y-4 overflow-y-auto'>
                    {/* Times */}
                    <div className='flex flex-row w-full h-12 items-center justify-start space-x-4 px-2'>
                        <div className='flex flex-col w-fit h-fit items-start justify-center'>
                            <span className='text-base leading-6 text-gray-600 font-normal'>From: </span>
                            <span className='text-base leading-6 text-gray-600 font-normal'>Until: </span>
                        </div>
                        <div className='flex flex-col grow h-12 items-start justify-center'>
                            <span className='text-base leading-6 text-gray-600 font-normal'>{formatDate(moveDetails.get('start'))}</span>
                            <span className='text-base leading-6 text-gray-600 font-normal'>{formatDate(moveDetails.get('end'))}</span>
                        </div>
                    </div>

                    {/* Move Type */}
                    <div className='flex flex-col w-full h-fit items-center justify-start'>
                        {moveDetails.get('route').map((route, index)=>(
                            <div key={`route-${index}`} className='flex flex-col w-full h-fit items-center justify-center'>
                                <PlaceCard place={placeDetails[index]} description={route.get('start')} type={index == 0 ? 'nodeStart' : 'node'}/>
                                <TransportationCard move={route}/>
                            </div>
                        ))}
                        <PlaceCard place={placeDetails[placeDetails.length - 1]} description={moveDetails.get('route')[moveDetails.get('route').length - 1].get('end')} type={'nodeEnd'} />
                    </div>
                </div>

                {/* Specific */}

            </div>

            
        </div>
    )
}

export default MoveModal;