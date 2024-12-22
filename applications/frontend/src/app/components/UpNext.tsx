import React from 'react'

type CalendarEvent = {
  date: string;
  title: string;
}

type UpNextProps = {
  calendarEvents: CalendarEvent[];
}

export default function UpNext({ calendarEvents }: UpNextProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Up Next</h2>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={index} className="text-center text-xs font-semibold">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 35 }, (_, i) => i + 1).map((day) => {
          const date = new Date(2023, 10, day); // November 2023
          const dateString = date.toISOString().split('T')[0];
          const event = calendarEvents.find(e => e.date === dateString);
          return (
            <div
              key={day}
              className={`aspect-square flex items-center justify-center text-sm ${
                event ? 'bg-blue-600 text-white rounded-full' : ''
              }`}
            >
              {day <= 30 ? day : ''}
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Upcoming Events:</h3>
        <ul>
          {calendarEvents.map((event, index) => (
            <li key={index} className="mb-1 text-sm">
              {event.date.split('-')[2]} - {event.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}