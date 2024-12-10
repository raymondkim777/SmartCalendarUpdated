'use client';

import { useEffect, useState } from 'react';

export default function CalendarPage() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch('/api/calendar');
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                const data = await response.json();
                setEvents(data);
            } catch (err) {
                console.error('Fetch Events Error:', err.message);
                setError(err.message);
            }
        }

        fetchEvents();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Google Calendar Events</h1>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <strong>{event.summary}</strong> <br />
                        {new Date(event.start.dateTime || event.start.date).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}
