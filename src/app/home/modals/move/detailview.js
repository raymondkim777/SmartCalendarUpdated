import GoogleMapRoute from "@/app/components/maproute";
import { formatDate } from "@/app/timeformat";

const DetailView = ({ selectedEvent, setShowDetails }) => (
    <div className="flex w-full h-full overflow-y-auto p-4">
        <div className='flex flex-col w-full h-fit items-center justify-start space-y-4'>
            <div className='flex w-full h-fit items-center justify-center'>
                <h1 className="text-lg text-center line-clamp-2 leading-6 text-gray-600 font-semibold">{selectedEvent.get('name')}</h1>
            </div>
            {/* Times */}
            <div className='flex flex-row w-full h-12 items-center justify-start space-x-4 px-2'>
                <div className='flex flex-col w-fit h-fit items-start justify-center'>
                    <span className='text-base leading-6 text-gray-600 font-normal'>From: </span>
                    <span className='text-base leading-6 text-gray-600 font-normal'>Until: </span>
                </div>
                <div className='flex flex-col grow h-12 items-start justify-center'>
                    <span className='text-base leading-6 line-clamp-1 text-gray-600 font-normal'>{formatDate(selectedEvent.get('start'))}</span>
                    <span className='text-base leading-6 line-clamp-1 text-gray-600 font-normal'>{formatDate(selectedEvent.get('end'))}</span>
                </div>
            </div>
            {/* Locations */}
            <div className='flex flex-row w-full h-12 items-center justify-start space-x-4 px-2'>
                <div className='flex flex-col w-fit h-fit items-start justify-center'>
                    <span className='text-base leading-6 text-gray-600 font-normal'>Start: </span>
                    <span className='text-base leading-6 text-gray-600 font-normal'>Finish: </span>
                </div>
                <div className='flex flex-col grow h-12 items-start justify-center'>
                    <span className='text-base leading-6 line-clamp-1 text-gray-600 font-normal'>{selectedEvent.get('locations')}</span>
                    <span className='text-base leading-6 line-clamp-1 text-gray-600 font-normal'>{selectedEvent.get('locatione')}</span>
                </div>
            </div>
            {
                selectedEvent.get('description') != '' && 
                <div className='flex flex-row w-full h-fit items-start justify-start space-x-4 px-2'>
                    <span className='text-base leading-6 text-gray-600 font-normal'>Description: </span>
                    <span className='text-base leading-6 line-clamp-3 text-gray-600 font-normal'>{selectedEvent.get('description')} </span>
                </div>
            }
            {/* Location */}
            <div className='flex flex-col w-full h-fit items-center justify-start space-y-4'>
                <div className='w-full h-36 lg:h-44 xl:h-72 overflow-hidden bg-gray-200 rounded-lg'>
                    <GoogleMapRoute
                    directions={selectedEvent.get('polyline')} 
                    bounds={selectedEvent.get('bounds')}
                    start={selectedEvent.get('coords')}
                    end={selectedEvent.get('coorde')}
                    />
                </div>
            </div>
            <div onClick={()=>setShowDetails(false)} className="shrink-0 flex w-32 h-10 items-center justify-center rounded-lg text-gray-600 font-normal bg-gray-200 hover:bg-gray-300 hover:cursor-pointer active:bg-gray-400 transition-all duration-150">Close</div>
        </div>
    </div>
)

export default DetailView;