import { fetchUser, fetchEvents } from './server/googleconn';
import { getShortestRoute, getCoordinates, createMoveRoutes } from './server/routecalc';
import Header from "../header";
import PageComponent from "./pageComponent";
import { useMemo } from 'react';

const EVENT_BW_TIME = 6;  // hours

async function getEvents(user) {
    let eventsData = []
    if (user) eventsData = await fetchEvents();
    console.log("after fetchevents")

    // add coordinates to eventsData elements
    for (let i = 0; i < eventsData.length; i++) {
        eventsData[i].set('coordinate', await getCoordinates(eventsData[i].get('location')));
    }
    console.log("after getcoordinates")
    return eventsData;
}

async function computeRoutes(eventsData) {
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
        console.log('after getshortestroute')

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

        console.log('after createmoveroutes')
    }

    console.log("about to render")
    return moveRoutes;
}

export default async function Home() {
    console.log("before fetchuser")
    const user = await useMemo(async () => await fetchUser());
    console.log("after fetchuser")

    const eventsData = await useMemo(async () => await getEvents(user), [user]);
    const moveRoutes = await useMemo(async () => await computeRoutes(eventsData), [eventsData]);

    return (
        <div className='flex flex-col w-full h-screen overflow-hidden bg-stone-50 font-[family-name:var(--font-geist-sans)] font-semibold'>
            <Header user={user} />
            <PageComponent eventsData={eventsData} routeData={moveRoutes} />
        </div>
    )
}
