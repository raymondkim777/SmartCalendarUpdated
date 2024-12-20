import LineDiagram from "./linediagram";
import { formatTime } from "@/app/timeformat";

const PlaceCard = ({ showModal, place, description, type }) => (
    <div className="flex flex-row w-full h-8 items-center justify-center">
        <div className="flex flex-row w-fit h-full items-center justify-center">
            <span className="w-16 text-sm text-center text-gray-600 font-normal">{formatTime(description)}</span>
            <LineDiagram type={type} />
        </div>
        {/* onClick={()=>showModal(place)} */}
        {/* hover:bg-gray-200 hover:cursor-pointer  active:bg-gray-300 transition-all duration-150 */}
        <div className="flex grow h-8 items-center justify-center px-10 rounded-lg">
            <div className="w-full py-1 border-t border-b border-gray-400">
                <span className="text-base line-clamp-1 text-center leading-5 text-gray-600 font-semibold">
                    {place}
                </span>
            </div>
        </div>
    </div>
)

export default PlaceCard;