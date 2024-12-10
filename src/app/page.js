'use client';

import { useEffect, useState } from 'react';

export default function CalendarPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const res = await fetch('/api/calendar');
                if (res.ok) {
                    const data = await res.json();
                    setEvents(data);
                } else {
                    console.error('Failed to fetch events');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchEvents();
    }, []);

    return (
        <div>
            <h1>Google Calendar Events</h1>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <strong>{event.summary}</strong> <br />
                        <em>{new Date(event.start.dateTime || event.start.date).toLocaleString()}</em> <br />
                        {event.location && <p><strong>Location:</strong> {event.location}</p>}
                        {event.description && <p><strong>Description:</strong> {event.description}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
