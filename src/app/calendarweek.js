// Inspiration: https://pagedone.io/blocks/application/calendar

const CalendarWeek = () => (
    <div className="flex flex-row w-full h-fit border-t border-b">
        {/* Times */}
        <div className="flex flex-col w-[14.2857%] h-fit divide-y">
            <div className="h-12 flex items-center justify-center  border-gray-200 text-sm font-medium  text-gray-900 transition-all duration-300"></div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end transition-all duration-300">
                <span className="text-xs font-semibold text-gray-400">07:00 am</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end transition-all duration-300">
                <span className="text-xs font-semibold text-gray-400">08:00 am</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end transition-all duration-300">
                <span className="text-xs font-semibold text-gray-400">09:00 am</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end transition-all duration-300">
                <span className="text-xs font-semibold text-gray-400">10:00 am</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end transition-all duration-300">
                <span className="text-xs font-semibold text-gray-400">11:00 am</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end transition-all duration-300">
                <span className="text-xs font-semibold text-gray-400">12:00 pm</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end transition-all duration-300">
                <span className="text-xs font-semibold text-gray-400">01:00 pm</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end transition-all duration-300">
                <span className="text-xs font-semibold text-gray-400">02:00 pm</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end transition-all duration-300">
                <span className="text-xs font-semibold text-gray-400">03:00 pm</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end transition-all duration-300">
                <span className="text-xs font-semibold text-gray-400">04:00 pm</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end transition-all duration-300">
                <span className="text-xs font-semibold text-gray-400">05:00 pm</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end transition-all duration-300">
                <span className="text-xs font-semibold text-gray-400">06:00 pm</span>
            </div>
            <div className="h-32 lg:h-28 p-0.5  border-gray-200 flex items-end transition-all duration-300">
                <span className="text-xs font-semibold text-gray-400">07:00 pm</span>
            </div>
        </div>

        {/* Column 1 */}
        <div className="flex flex-col w-[14.2857%] h-fit group divide-y">
            <div className="h-12 flex items-center justify-center  border-gray-200 text-sm font-medium  text-gray-900 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer">Dec 8</div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer">
                <div className="rounded p-1.5 border-l-2 border-yellow-600 bg-yellow-50">
                <p className="text-xs font-normal text-gray-900 mb-px">Breakfast with Dhruv Patel</p>
                <p className="text-xs font-semibold text-yellow-600">08:00 - 09:00</p>
                </div>
            </div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer">
                <div className="rounded p-1.5 border-l-2 border-green-600 bg-green-50">
                <p className="text-xs font-normal text-gray-900 mb-px">Dancing Zumba class</p>
                <p className="text-xs font-semibold text-green-600">09:30 - 10:00</p>
                </div>
            </div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col w-[14.2857%] h-fit group divide-y">
            <div className="h-12 flex items-center justify-center  border-gray-200 text-sm font-medium  text-gray-900 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer">Dec 9</div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer">
                <div className="rounded p-1.5 border-l-2 border-purple-600 bg-purple-50">
                <p className="text-xs font-normal text-gray-900 mb-px">Pickup the grandmother</p>
                <p className="text-xs font-semibold text-purple-600">06:00 - 07:30</p>
                </div>
            </div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer">
                <div className="rounded p-1.5 border-l-2 border-blue-600 bg-blue-50">
                <p className="text-xs font-normal text-gray-900 mb-px">Meeting with Project Manager </p>
                <p className="text-xs font-semibold text-blue-600">11:00 - 12:30</p>
                </div>
            </div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col w-[14.2857%] h-fit group divide-y">
            <div className="h-12 flex items-center justify-center  border-gray-200 text-sm font-medium  text-indigo-600 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer">Dec 10</div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer">
                <div className="rounded p-1.5 border-l-2 border-green-600 bg-green-50">
                <p className="text-xs font-normal text-gray-900 mb-px">Workout and Yoga Session</p>
                <p className="text-xs font-semibold text-green-600">06:00 - 07:55</p>
                </div>
            </div>
            <div className="h-32 lg:h-28 p-0.5   border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5   border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5   border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5   border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer">
                <div className="rounded p-1.5 border-l-2 border-yellow-600 bg-yellow-50">
                <p className="text-xs font-normal text-gray-900 mb-px">School Friend’s Birthday Party</p>
                <p className="text-xs font-semibold text-yellow-600">10:00 - 11:45</p>
                </div>
            </div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
        </div>

        {/* Column 4 */}
        <div className="flex flex-col w-[14.2857%] h-fit group divide-y border-gray-200">
            <div className="h-12 flex items-center justify-center  border-gray-200 text-sm font-medium  text-gray-900 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer">Dec 11</div>
            <div className="h-32 lg:h-28 p-0.5     transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer">
                <div className="rounded p-1.5 border-l-2 border-blue-600 bg-blue-50">
                <p className="text-xs font-normal text-gray-900 mb-px">Project Task Review</p>
                <p className="text-xs font-semibold text-blue-600">08:00 - 08:25</p>
                </div>
            </div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
        </div>

        {/* Column 5 */}
        <div className="flex flex-col w-[14.2857%] h-fit group divide-y">
            <div className="h-12 flex items-center justify-center  border-gray-200 text-sm font-medium  text-gray-900 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer">Dec 12</div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer">
                <div className="rounded p-1.5 border-l-2 border-purple-600 bg-purple-50">
                <p className="text-xs font-normal text-gray-900 mb-px">Doctor’s Appointment for Mother</p>
                <p className="text-xs font-semibold text-purple-600">09:00 - 10:45</p>
                </div>
            </div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
        </div>

        {/* Column 6 */}
        <div className="flex flex-col w-[14.2857%] h-fit group divide-y">
            <div className="h-12 flex items-center justify-center  border-gray-200 text-sm font-medium  text-gray-900 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer">Dec 13</div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer">
                <div className="rounded p-1.5 border-l-2 border-yellow-600 bg-yellow-50">
                <p className="text-xs font-normal text-gray-900 mb-px">Wake-Up Carl</p>
                <p className="text-xs font-semibold text-yellow-600">07:30 - 08:00</p>
                </div>
            </div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
            <div className="h-32 lg:h-28 p-0.5     border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 group-active:border-gray-300 duration-300 hover:cursor-pointer"></div>
        </div>

    </div>
)

export default CalendarWeek;