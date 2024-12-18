import Header from "../header";
import PageComponent from "./pageComponent";
import { WALK_INDEX, CAR_INDEX, RAIL_INDEX, SUB_INDEX, TRAIN_INDEX, TRAM_INDEX, BUS_INDEX } from '../transportation';

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

async function fetchUser() {
    console.log("in fetchUser, document.cookie is ", document.cookie)
    try {
        const res = await fetch('http://localhost:3000/api/auth/session'); // API route to get session info
        if (res.ok) {
            const data = await res.json();
            return data.user;
        }
    } catch (error) {
        console.error('Failed to fetch user session:', error);
    }
    return null;
}

const handleLogout = async () => {
    try {
        await fetch('http://localhost:3000/api/auth/logout', { method: 'POST' });
        router.push('/home'); // Redirect to home page
    } catch (error) {
        console.error('Failed to logout:', error);
    }
};

async function getRouteData(start, end, arrival_time, mode="transit") {
    const arrivalTimeInt = Math.trunc(arrival_time / 1000);

    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&mode=${mode}&key=${apiKey}&arrival_time=${arrivalTimeInt}`;
    let data = await fetch(url);
    if (!data.ok) {
        throw new Error(`HTTP Error: ${data.status}`)
    }
    let routeData = await data.json();
    console.log(routeData);
    return routeData;
}

async function getPlaceName(coordinates) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&extra_computations=ADDRESS_DESCRIPTORS&key=${apiKey}`;
    console.log(url);
    let data = await fetch(url);
    if (!data.ok) {
        throw new Error(`HTTP Error: ${data.status}`)
    }
    let placeData = await data.json();
    console.log(placeData);
    return placeData.address_descriptor.landmarks[0].display_name.text;
}

async function getCoordinates(roughAddress) {
    let addressURL = `${encodeURI(roughAddress)}`
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressURL}&key=${apiKey}`
    let data = await fetch(url);
    if (!data.ok) {
        throw new Error(`HTTP Error: ${data.status}`)
    }
    let coordData = await data.json();
    console.log(coordData);
    return coordData.results[0].geometry.location;
}

export default async function Home() {
    console.log("in home, document.cookie is ", document.cookie)
    // init user
    const user = await fetchUser();
    console.log(user);

    // events array is in locale time
    const eventsData = [
        new Map([
            ['moveType', false],
            ['start', new Date('Dec 16, 2024 10:00:00')],
            ['end', new Date('Dec 16, 2024 11:00:00')],
            ['title', 'Daily Standup Meeting'],
            ['location', 'Hudson-Bergen Light Rail HQ'],
            ['description', 'Some Description'],
        ]),
        new Map([
            ['moveType', false],
            ['start', new Date('Dec 16, 2024 12:00:00')],
            ['end', new Date('Dec 16, 2024 13:30:00')],
            ['title', 'Breakfast with Friend'],
            ['location', 'Woolworth Bldg'],
            ['description', 'Some Description'],
        ]),
    ];

    // add coordinates to eventsData elements
    for (let i = 0; i < eventsData.length; i++) {
        eventsData[i].set('coordinate', await getCoordinates(eventsData[i].get('location')));
        console.log(eventsData[i].get('coordinate'));
    }

    const moveRoutes = [];  // each item is list of transportation methods b/w two events

    for (let i = 0; i < eventsData.length - 1; i++) {
        let routeData = await getRouteData(
            eventsData[i].get('location'),
            eventsData[i + 1].get('location'),
            eventsData[i + 1].get('start')
        );

        const route = [];
        const steps = routeData.routes[0].legs[0].steps;

        const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        let curTime = new Date(new Date(routeData.routes[0].legs[0].departure_time.value * 1000).toLocaleString('en-US', options));

        for (let j = 0; j < steps.length; j++) {
            let tempMap = null;
            let nextTime = null;
            if (steps[j].travel_mode === "WALKING") {
                nextTime = new Date(curTime.getTime() + steps[j].duration.value * 1000);
                tempMap = new Map([
                    ['start', curTime],
                    ['end', nextTime],
                    ['type', WALK_INDEX],
                    ['name', 'Walk'],
                    ['locations', j == 0 ? eventsData[i].get('location') : steps[j - 1].transit_details.arrival_stop.name],
                    ['locatione', await getPlaceName(steps[j].end_location)],  // change next iteration, setting this just in case
                    ['coords', steps[j].start_location],
                    ['coorde', steps[j].end_location],
                    ['polyline', steps[j].polyline.points],
                    ['bounds', routeData.routes[0].bounds],
                    ['description', `About ${steps[j].duration.text}, ${steps[j].distance.text}`],
                ]);
            } else if (steps[j].travel_mode === "TRANSIT") {
                curTime = new Date(new Date(steps[j].transit_details.departure_time.value * 1000).toLocaleString('en-US', options));
                nextTime = new Date(new Date(steps[j].transit_details.arrival_time.value * 1000).toLocaleString('en-US', options));

                let tType = steps[j].transit_details.line.vehicle.type;
                let tIdx =
                tType === 'BUS' ? BUS_INDEX :
                tType === 'CABLE_CAR' ? BUS_INDEX :
                tType === 'COMMUTER_TRAIN' ? TRAIN_INDEX :
                tType === 'HEAVY_RAIL' ? RAIL_INDEX :
                tType === 'HIGH_SPEED_TRAIN' ? TRAIN_INDEX :
                tType === 'INTERCITY_BUS' ? BUS_INDEX :
                tType === 'LONG_DISTANCE_TRAIN' ? BUS_INDEX :
                tType === 'METRO_RAIL' ? RAIL_INDEX :
                tType === 'MONORAIL' ? RAIL_INDEX :
                tType === 'RAIL' ? RAIL_INDEX :
                tType === 'SUBWAY' ? SUB_INDEX :
                tType === 'TRAM' ? TRAM_INDEX :
                BUS_INDEX;  // default to bus icon

                tempMap = new Map([
                    ['start', curTime],
                    ['end', nextTime],
                    ['type', tIdx],
                    ['name', steps[j].transit_details.headsign],
                    ['locations', steps[j].transit_details.departure_stop.name],
                    ['locatione', steps[j].transit_details.arrival_stop.name],
                    ['coords', steps[j].start_location],
                    ['coorde', steps[j].end_location],
                    ['polyline', steps[j].polyline.points],
                    ['bounds', routeData.routes[0].bounds],
                    ['description', steps[j].html_instructions],
                ]);
                route[j - 1].set('locatione', steps[j].transit_details.departure_stop.name);
            } else {
                throw new Error("Travel Mode is Invalid");
            }
            curTime = nextTime;
            route.push(tempMap);
        }
        moveRoutes.push(route);
    }

    return (
        <div className='flex flex-col w-full h-screen overflow-hidden bg-stone-50 font-[family-name:var(--font-geist-sans)] font-semibold'>
            <Header
            user={user}
            // handleLogout={handleLogout}
            />
            <PageComponent eventsData={eventsData} routeData={moveRoutes} />
        </div>
    )
}
