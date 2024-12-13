import MethodIcon from "./methodicon";
import LineDiagram from "./linediagram";

const TransportationCard = ({ move }) => (
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

export default TransportationCard;