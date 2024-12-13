import LineDiagram from "./linediagram";

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

const PlaceCard = ({ showModal, place, description, type }) => (
    <div className="flex flex-row w-full h-8 items-center justify-center">
        <div className="flex flex-row w-fit h-full items-center justify-center">
            <span className="w-16 text-sm text-center text-gray-600 font-normal">{formatTime(description)}</span>
            <LineDiagram type={type} />
        </div>
        <div onClick={()=>showModal(place)} className="flex grow h-8 items-center justify-center px-10 rounded-lg hover:bg-gray-200 hover:cursor-pointer  active:bg-gray-300 transition-all duration-150">
            <span className="w-full py-1 text-base line-clamp-1 text-center leading-5 text-gray-600 font-semibold border-t border-b border-gray-400">
                {place}
            </span>
        </div>
    </div>
)

export default PlaceCard;