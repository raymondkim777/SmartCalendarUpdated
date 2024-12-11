import { useRouter } from 'next/router';
import React from 'react';

const CalendarWeek = () => {
  const router = useRouter();
  const { startDate } = router.query;

  if (!startDate) {
    return <div>Loading...</div>;
  }

  // Calculate the week dates
  const getWeekDates = (start) => {
    const startDateObj = new Date(start);
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDateObj);
      date.setDate(startDateObj.getDate() + i);
      weekDates.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        fullDate: date.toISOString().split('T')[0],
      });
    }
    return weekDates;
  };

  const weekDates = getWeekDates(startDate);

  return (
    <div className="flex flex-row w-full h-fit border-t border-b">
      {/* Times */}
      <div className="flex flex-col w-[14.2857%] h-fit divide-y">
        {/* Time slots */}
        {Array.from({ length: 13 }).map((_, index) => (
          <div
            key={index}
            className="h-32 lg:h-28 p-0.5 border-gray-200 flex items-end transition-all duration-300"
          >
            <span className="text-xs font-semibold text-gray-400">
              {new Date(0, 0, 0, 7 + index).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        ))}
      </div>

      {/* Weekly Columns */}
      {weekDates.map((day, idx) => (
        <div key={idx} className="flex flex-col w-[14.2857%] h-fit group divide-y">
          {/* Header */}
          <div className="h-12 flex items-center justify-center border-gray-200 text-sm font-medium text-gray-900 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 duration-300 hover:cursor-pointer">
            {`${day.day} ${day.date}`}
          </div>

          {/* Time slots */}
          {Array.from({ length: 13 }).map((_, index) => (
            <div
              key={index}
              className="h-32 lg:h-28 p-0.5 border-gray-200 transition-all group-hover:bg-gray-200 group-active:bg-gray-300 duration-300 hover:cursor-pointer"
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CalendarWeek;
