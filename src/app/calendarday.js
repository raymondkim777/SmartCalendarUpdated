// Inspiration: https://pagedone.io/blocks/application/calendar

const CalendarDay = () => (
    <div className="flex flex-row w-full h-fit border-t border-b">
        {/* Times */}
        <div className="flex flex-col w-1/12 min-w-16 h-fit divide-y">
            <div className="h-12 flex items-center justify-center  border-gray-200 text-sm font-medium  text-gray-900 "></div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end ">
                <span className="text-xs font-semibold text-gray-400">07:00 am</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end ">
                <span className="text-xs font-semibold text-gray-400">08:00 am</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end ">
                <span className="text-xs font-semibold text-gray-400">09:00 am</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end ">
                <span className="text-xs font-semibold text-gray-400">10:00 am</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end ">
                <span className="text-xs font-semibold text-gray-400">11:00 am</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end ">
                <span className="text-xs font-semibold text-gray-400">12:00 pm</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end ">
                <span className="text-xs font-semibold text-gray-400">01:00 pm</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end ">
                <span className="text-xs font-semibold text-gray-400">02:00 pm</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end ">
                <span className="text-xs font-semibold text-gray-400">03:00 pm</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end ">
                <span className="text-xs font-semibold text-gray-400">04:00 pm</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end ">
                <span className="text-xs font-semibold text-gray-400">05:00 pm</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end ">
                <span className="text-xs font-semibold text-gray-400">06:00 pm</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end ">
                <span className="text-xs font-semibold text-gray-400">07:00 pm</span>
            </div>
        </div>

        {/* Column */}
        <div className="flex flex-col grow h-fit group divide-y">
            <div className="h-12 flex items-center justify-center  border-gray-200 text-sm font-medium  text-indigo-600 ">Dec 10</div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 ">
                <div className="rounded p-1.5 border-l-2 border-green-600 bg-green-50">
                <p className="text-xs font-normal text-gray-900 mb-px">Workout and Yoga Session</p>
                <p className="text-xs font-semibold text-green-600">06:00 - 07:55</p>
                </div>
            </div>
            <div className="h-32 lg:h-28 p-0.5   border-gray-200 "></div>
            <div className="h-32 lg:h-28 p-0.5   border-gray-200 "></div>
            <div className="h-32 lg:h-28 p-0.5   border-gray-200 "></div>
            <div className="h-32 lg:h-28 p-0.5   border-gray-200 ">
                <div className="rounded p-1.5 border-l-2 border-yellow-600 bg-yellow-50">
                <p className="text-xs font-normal text-gray-900 mb-px">School Friend’s Birthday Party</p>
                <p className="text-xs font-semibold text-yellow-600">10:00 - 11:45</p>
                </div>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 "></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 "></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 "></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 "></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 "></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 "></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 "></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 "></div>
        </div>

    </div>
)

export default CalendarDay;