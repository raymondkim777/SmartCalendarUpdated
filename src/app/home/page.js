import { google } from 'googleapis';
import { cookies } from "next/headers";
import { sql } from '@vercel/postgres';

import Header from "../header";
import PageComponent from "./pageComponent";
import { WALK_INDEX, CAR_INDEX, RAIL_INDEX, SUB_INDEX, TRAIN_INDEX, TRAM_INDEX, BUS_INDEX } from '../transportation';

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const EVENT_BW_TIME = 6;

async function fetchUser() {
    // console.log("in fetchUser, document.cookie is ", document.cookie)
    const cookieStore = await cookies();
    // console.log("in fetchUser, document.cookie is ", cookieStore.get('session_token'))
    const sessionToken = cookieStore.get('session_token')?.value;
    if (!sessionToken) {
        // console.log("no session token");
        return null;
    }
    // console.log("session token found");

    // Query the database for the user associated with the session token
    const { rows } = await sql`SELECT email, name, picture, notification FROM user_info WHERE access_token = ${sessionToken} LIMIT 1`;
    if (rows.length === 0) {
        // console.log("database empty");
        return null;
    }
    // console.log("database entry found");
    const user = { 
        email: rows[0].email, 
        name: rows[0].name,
        picture: rows[0].picture, 
        notification: rows[0].notification,
    };
    return user;
}

async function fetchEvents() { 
    try {
        const data = await connectToCalendar();
        if (!data) {
            // console.log("could not retrieve events from calendar");
            return [];
        }
        // console.log("retrieved events from calendar");

        // Transform events into the desired Map format
        const transformedEvents = data.map((event) => {
            const startDate = new Date(event.start.dateTime || event.start.date);
            const endDate = new Date(event.end.dateTime || event.end.date);
            const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const formattedStartDate = startDate.toLocaleString('en-US', options);
            const formattedEndDate = endDate.toLocaleString('en-US', options);

            return new Map([
                ['moveType', false],
                ['start', new Date(formattedStartDate)], 
                ['end', new Date(formattedEndDate)],
                ['title', event.summary || null],
                ['location', event.location || null],
                ['description', event.description || null],
            ]);
        });

        // setEvents(data); // For rendering original events
        // setProcessedEvents(transformedEvents); // For custom Map-based events
        return transformedEvents;
    } catch (err) {
        console.error('Fetch Events Error:', err.message);
        setError(err.message);
    }
}

async function connectToCalendar() {
    try {
        const auth = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URI
        );
        if (!(await fetchTokens(auth)))  {
            // console.log("could not fetch tokens");
            return null;
        }
        // console.log("fetched tokens");

        const calendar = google.calendar({ version: 'v3', auth });
        
        const oneMonthBefore = new Date();
        oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    
        const response = await calendar.events.list({
            calendarId: 'primary', // Fetch from the primary calendar
            timeMin: oneMonthBefore.toISOString(), // Start from now
            timeMax: oneMonthLater.toISOString(), // Up to one year from now
            maxResults: 100, // Adjust the number of results if needed
            singleEvents: true,
            orderBy: 'startTime',
        });
    
        return response.data.items;
    } 
    catch (error) {
        console.error('API Route Error:', error.message);
        return null; 
    }
}

async function fetchTokens(auth) {
    // Retrieve the access_token from cookies
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('session_token')?.value;

    if (!accessToken) {
        console.error('Access token cookie not found.');
        return false;
    }
    // console.log('Access token cookie found.');

    // Fetch user tokens from the database using the access token
    const { rows } = await sql`
        SELECT access_token, refresh_token, token_expiry
        FROM user_info
        WHERE access_token = ${accessToken}
    `;
    if (rows.length === 0) return false;

    const { access_token, refresh_token, token_expiry } = rows[0];

    // Set the retrieved tokens
    auth.setCredentials({
        access_token,
        refresh_token,
    });

    // Refresh the access token if it has expired
    if (new Date() > new Date(token_expiry)) {
        if (!(await refreshAccessToken(auth, accessToken))) return false;
    }
    return true;
}

async function refreshAccessToken(auth, accessToken) {
    try {
        const refreshedTokens = await auth.refreshAccessToken();
        auth.setCredentials(refreshedTokens.credentials);

        // Update the tokens in the database
        await sql`
        UPDATE user_info
        SET access_token = ${refreshedTokens.credentials.access_token},
            token_expiry = ${new Date(refreshedTokens.credentials.expiry_date).toISOString()}
        WHERE access_token = ${accessToken}
        `;
        // console.log('Access token refreshed and updated in the database.');
        return true;
    } catch (refreshError) {
        console.error('Error refreshing access token:', refreshError.message);
        return false;
    }
}

async function getShortestRoute(startLoc, endLoc, arrival_time) {
    const arrivalTimeInt = Math.trunc(arrival_time / 1000);

    let routeDataTransit = await getRouteData(startLoc, endLoc, arrivalTimeInt, "transit");
    if (!(routeDataTransit.status != 'OK')) return {routeType: 'transit', routeData: routeDataTransit};

    let routeDataDriving = await getRouteData(startLoc, endLoc, arrivalTimeInt, "driving");
    let routeDataWalking = await getRouteData(startLoc, endLoc, arrivalTimeInt, "walking");

    if (routeDataDriving.status != 'OK') {
        if (!(routeDataWalking.status != 'OK')) return {routeType: 'walking', routeData: routeDataWalking};
        return null;
    }
    if (routeDataWalking.status != 'OK') return {routeType: 'driving', routeData: routeDataDriving};
    // if both walking & driving are available

    // without this i have to spend 14 hours walking to an airport
    if (routeDataWalking.routes[0].legs[0].distance.value > 1000)
        return {routeType: 'driving', routeData: routeDataDriving};
    
    if (routeDataWalking.routes[0].legs[0].distance.value < routeDataDriving.routes[0].legs[0].distance.value)
        return {routeType: 'walking', routeData: routeDataWalking};
    return {routeType: 'driving', routeData: routeDataDriving};
}

async function getRouteData(startLoc, endLoc, arrivalTimeInt, mode="transit") {
    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${endLoc}&mode=${mode}&key=${API_KEY}&arrival_time=${arrivalTimeInt}`;
    let data = await fetch(url);
    if (!data.ok) {
        throw new Error(`HTTP Error: ${data.status}`)
    }
    let routeData = await data.json();
    // console.log(routeData);
    return routeData;
}


async function getPlaceName(coordinates) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&extra_computations=ADDRESS_DESCRIPTORS&key=${API_KEY}`;
    // console.log(url);
    let data = await fetch(url);
    if (!data.ok) {
        throw new Error(`HTTP Error: ${data.status}`)
    }
    let placeData = await data.json();
    // console.log(placeData);
    if (placeData.address_descriptor.landmarks.length != 0)
        return placeData.address_descriptor.landmarks[0].display_name.text;
    else if (placeData.address_descriptor.areas.length != 0)
        return placeData.address_descriptor.areas[0].display_name.text;
    return "Couldn't Find Name";
}

async function getCoordinates(roughAddress) {
    if (!roughAddress) return null;

    let addressURL = `${encodeURI(roughAddress)}`
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressURL}&key=${API_KEY}`
    let data = await fetch(url);
    if (!data.ok) {
        throw new Error(`HTTP Error: ${data.status}`)
    }
    let coordData = await data.json();
    if (coordData.status === 'ZERO_RESULTS')
        return null;
    return coordData.results[0].geometry.location;
}

async function createMoveRoutes(eventsData, idx, routeDataObj) {
    const { routeType, routeData } = routeDataObj;
    const route = [];
    const steps = routeData.routes[0].legs[0].steps;

    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    
    let curTime = new Date(new Date(eventsData[idx + 1].get('start') - routeData.routes[0].legs[0].duration.value * 1000).toLocaleString('en-US', options));
    if (routeType === 'transit') 
        curTime = new Date(new Date(routeData.routes[0].legs[0].departure_time.value * 1000).toLocaleString('en-US', options));

    for (let j = 0; j < steps.length; j++) {
        let tempMap = null;
        let nextTime = null;
        if (steps[j].travel_mode === "TRANSIT") {
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
            // adjust previous walk step end location to station name
            if (j > 0 && route[j - 1].get('type') == WALK_INDEX)
                route[j - 1].set('locatione', steps[j].transit_details.departure_stop.name);
        } else if (steps[j].travel_mode === "WALKING" || steps[j].travel_mode === "DRIVING") {
            // console.log("current step: ", steps[j]);
            nextTime = new Date(curTime.getTime() + steps[j].duration.value * 1000);

            let locations = await getPlaceName(steps[j].start_location);
            if (routeType === 'transit') 
                locations = j == 0 ? eventsData[idx].get('location') : steps[j - 1].transit_details.arrival_stop.name;
            
            let description = `About ${steps[j].duration.text}, ${steps[j].distance.text}`;
            if (steps[j].travel_mode === "DRIVING")
                description = steps[j].html_instructions;  //.replace(/<\/?[^>]+(>|$)/g, "");

            tempMap = new Map([
                ['start', curTime],
                ['end', nextTime],
                ['type', steps[j].travel_mode === "WALKING" ? WALK_INDEX : CAR_INDEX],
                ['name', steps[j].travel_mode === "WALKING" ? 'Walk' : 'Drive'],
                ['locations', locations],
                ['locatione', await getPlaceName(steps[j].end_location)],  // change next iteration if next step is transit
                ['coords', steps[j].start_location],
                ['coorde', steps[j].end_location],
                ['polyline', steps[j].polyline.points],
                ['bounds', routeData.routes[0].bounds],
                ['description', description],
            ]);
        } else {
            throw new Error("Travel Mode is Invalid");
        }
        curTime = nextTime;
        route.push(tempMap);
    }
    return route;
}

export default async function Home() {
    // let cookieStore = await cookies();
    // console.log("in home, document.cookie is ", cookieStore.get('session_token'))
    
    // init user
    const user = await fetchUser();
    // console.log(user);
    let eventsData = []
    if (user) eventsData = await fetchEvents();

    // console.log('eventsData: ', eventsData);

    // add coordinates to eventsData elements
    for (let i = 0; i < eventsData.length; i++) {
        eventsData[i].set('coordinate', await getCoordinates(eventsData[i].get('location')));
        // console.log(eventsData[i].get('coordinate'));
    }

    const moveRoutes = [];  // each item is list of transportation methods b/w two events

    for (let idx = 0; idx < eventsData.length - 1; idx++) {
        // console.log("events: ", eventsData[i].get('location'), "to ", eventsData[i + 1].get('location'))
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
        if (!routeDataObj) continue;
        // console.log("routeData: ", routeDataObj.routeData);

        // check if computed route fits within time
        const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        let startTime = new Date(new Date(eventsData[idx + 1].get('start') - routeDataObj.routeData.routes[0].legs[0].duration.value * 1000).toLocaleString('en-US', options));
        if (startTime < eventsData[idx].get('end'))
            continue;

        const route = await createMoveRoutes(eventsData, idx, routeDataObj);
        moveRoutes.push(route);
    }

    return (
        <div className='flex flex-col w-full h-screen overflow-hidden bg-stone-50 font-[family-name:var(--font-geist-sans)] font-semibold'>
            <Header
            user={user}
            />
            <PageComponent eventsData={eventsData} routeData={moveRoutes} />
        </div>
    )
}
