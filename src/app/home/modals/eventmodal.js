const EventModal = ({ closeEvent, eventDetails }) => {
    // Time Format
    const formatTime = (time) => {
        let msg = time.toString();
        if (time.toString().length < 2) 
            msg = '0' + msg;
        return msg;
    }
// {`${hour % 12 == 0 ? 12 : hour % 12}:00 ${hour >=12 ? 'pm' : 'am'}`}
    const formatDate = (date) => {
        let hours = formatTime(date.getHours() % 12 == 0 ? 12 : date.getHours() % 12);
        let minutes = formatTime(date.getMinutes());
        let apm = date.getHours() >= 12 ? 'pm' : 'am';
        let msg = `${hours}:${minutes} ${apm} (${date.toDateString()})`
        return msg;
    }

    return(
        <div className={`flex flex-col items-center z-10 absolute inset-x-1/3 top-60 min-w-80 h-fit mr-2 pt-1 rounded-lg border border-neutral-400 bg-stone-50`}>
            <div className='flex flex-row w-full h-10 items-center justify-between pl-4 pr-2 space-x-3'>
                <h1 className="text-lg text-nowrap truncate leading-6 text-gray-600 font-semibold">{eventDetails.get('title')}</h1>
                <div onClick={closeEvent} className='flex items-center justify-center w-9 h-9 rounded-full hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all duration-300'>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#696969" fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"/>
                    </svg>
                </div>
            </div>
            <div className='flex flex-col w-full h-fit max-h-[36rem] items-center justify-start py-4 px-4 space-y-4 overflow-y-auto'>
                {/* Times */}
                <div className='flex flex-row w-full h-12 items-center justify-start space-x-4 px-2'>
                    <div className='flex flex-col w-fit h-fit items-start justify-center'>
                        <span className='text-base leading-6 text-gray-600 font-normal'>From: </span>
                        <span className='text-base leading-6 text-gray-600 font-normal'>Until: </span>
                    </div>
                    <div className='flex flex-col grow h-12 items-start justify-center'>
                        <span className='text-base leading-6 text-gray-600 font-normal'>{formatDate(eventDetails.get('start'))}</span>
                        <span className='text-base leading-6 text-gray-600 font-normal'>{formatDate(eventDetails.get('end'))}</span>
                    </div>
                </div>
                {
                    eventDetails.get('description') != '' && 
                    <div className='flex flex-row w-full h-fit items-center justify-start space-x-4 px-2'>
                        <span className='text-base leading-6 text-gray-600 font-normal'>Description: </span>
                        <span className='text-base leading-6 text-gray-600 font-normal'>{eventDetails.get('description')}: </span>
                    </div>
                }
                {/* Location */}
                <div className='flex flex-col w-full h-fit items-center justify-start space-y-4'>
                    <div className='flex flex-row w-full h-fit items-center justify-start space-x-4 px-2'>
                        <span className='text-base leading-6 text-gray-600 font-normal'>Location: </span>
                        <span className='text-base text-wrap leading-6 text-gray-600 font-normal'>{eventDetails.get('location')} </span>
                    </div>
                    <div className='w-full h-64 bg-gray-200 rounded-lg'>
                            
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventModal;