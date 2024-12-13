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
    const methodList = ['Walking', 'Car', 'Subway', 'Bus'];
    return(
        <div className="flex flex-row w-full h-14 items-center justify-center">
            <div className="flex flex-row w-fit h-full items-center justify-center">
                <span className="w-16 text-sm text-center text-gray-300 font-normal">({methodList[move.get('type')]})</span>
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
            <div className='flex flex-col w-full h-fit max-h-64 lg:max-h-[32rem] xl:max-h-[40rem] items-center justify-start pt-2 pb-4 px-4 space-y-4 overflow-y-auto'>
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
        </div>
    )
}

export default MoveModal;