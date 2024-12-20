import { fetchUser, fetchEvents } from './server/googleconn';
import { getShortestRoute, getCoordinates, createMoveRoutes } from './server/routecalc';
import Header from "../header";
import PageComponent from "./pageComponent";

const EVENT_BW_TIME = 6;  // hours

export default async function Home() {
    const user = await fetchUser();

    let eventsData = []
    if (user) eventsData = await fetchEvents();

    // add coordinates to eventsData elements
    for (let i = 0; i < eventsData.length; i++) {
        eventsData[i].set('coordinate', await getCoordinates(eventsData[i].get('location')));
    }

    const moveRoutes = [];  // each item is list of transportation methods b/w two events

    for (let idx = 0; idx < eventsData.length - 1; idx++) {
        // skip if locations invalid or if travel b/w two events is impossible
        if (eventsData[idx + 1].get('start') - eventsData[idx].get('end') >= 1000 * 60 * 60 * EVENT_BW_TIME)
            continue;
        if (!eventsData[idx + 1].get('location'))
            continue;
        if (!eventsData[idx].get('location'))
            continue;

        let routeDataObj = await getShortestRoute(
            eventsData[idx].get('location'),
            eventsData[idx + 1].get('location'),
            eventsData[idx + 1].get('start')
        );

        // if API can't compute route
        if (!routeDataObj) continue;

        // check if computed route fits within time
        const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        let startTime = new Date(new Date(eventsData[idx + 1].get('start') - routeDataObj.routeData.routes[0].legs[0].duration.value * 1000).toLocaleString('en-US', options));
        if (startTime < eventsData[idx].get('end'))
            continue;

        // format computed route
        const route = await createMoveRoutes(eventsData, idx, routeDataObj);
        moveRoutes.push(route);
    }

     // Convert moveRoutes containing Map objects to plain objects
     const convertedRoutes = moveRoutes.map((routeList) =>
     routeList.map((route) =>
     route instanceof Map ? Object.fromEntries(route) : route
     )
     );
    // Pass the converted routes to the API
    if (convertedRoutes.length > 0 && user.notification === true) {
        try {
        const baseUrl = `https://smart-calendar-lyart.vercel.app`;
        const apiUrl = `${baseUrl}/api/sendemail`;
    
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ routes: convertedRoutes, user: user.email }), // Include user email
        });
    
        if (response.ok) {
            const result = await response.json();
            console.log('API response:', result);
        } else {
            console.error('Failed to send routes to the API:', await response.text());
        }
        } catch (error) {
        console.error('Error calling the API:', error);
        }
    } else {
        console.log('Email notification not sent: user.notification is false or no routes provided.');
    }
            

    return (
        <div className='flex flex-col w-full h-screen overflow-hidden bg-stone-50 font-[family-name:var(--font-geist-sans)] font-semibold'>
            <Header user={user} />
            <PageComponent eventsData={eventsData} routeData={moveRoutes} />
        </div>
    )
}
