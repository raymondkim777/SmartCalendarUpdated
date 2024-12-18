import { google } from 'googleapis';
import { cookies } from "next/headers";
import { sql } from '@vercel/postgres';

import Header from "../header";
import PageComponent from "./pageComponent";
import { WALK_INDEX, CAR_INDEX, RAIL_INDEX, SUB_INDEX, TRAIN_INDEX, TRAM_INDEX, BUS_INDEX } from '../transportation';

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

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

async function connectToCalendar() {
    try {
        // Retrieve the access_token from cookies
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('session_token')?.value;

        if (!accessToken) {
            console.error('Access token cookie not found.');
            return null;
        }
        // console.log('Access token cookie found.');
    
        // Fetch user tokens from the database using the access token
        const { rows } = await sql`
            SELECT access_token, refresh_token, token_expiry
            FROM user_info
            WHERE access_token = ${accessToken}
        `;
        if (rows.length === 0) return null;
    
        const { access_token, refresh_token, token_expiry } = rows[0];
    
        const auth = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URI
        );
    
        // Set the retrieved tokens
        auth.setCredentials({
            access_token,
            refresh_token,
        });
    
        // Refresh the access token if it has expired
        try {
            if (new Date() > new Date(token_expiry)) {
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
            }
        } catch (refreshError) {
            console.error('Error refreshing access token:', refreshError.message);
            return null;
        }
    
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

async function fetchEvents() { 
    try {
        // const getCookie = (name) => {
        //     const value = `; ${document.cookie}`;
        //     const parts = value.split(`; ${name}=`);
        //     if (parts.length === 2) return parts.pop().split(';').shift();
        //     return null;
        // }

        // const accessToken = getCookie('session_token');
        // if (!accessToken) {
        //     console.log('Access token cookie not found.');
        //     return;
        // }

        const data = await connectToCalendar();
        if (!data) {
            return [];
        }

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

async function getRouteData(start, end, arrival_time, mode="transit") {
    const arrivalTimeInt = Math.trunc(arrival_time / 1000);

    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&mode=${mode}&key=${apiKey}&arrival_time=${arrivalTimeInt}`;
    let data = await fetch(url);
    if (!data.ok) {
        throw new Error(`HTTP Error: ${data.status}`)
    }
    let routeData = await data.json();
    // console.log(routeData);
    return routeData;
}

async function getPlaceName(coordinates) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&extra_computations=ADDRESS_DESCRIPTORS&key=${apiKey}`;
    // console.log(url);
    let data = await fetch(url);
    if (!data.ok) {
        throw new Error(`HTTP Error: ${data.status}`)
    }
    let placeData = await data.json();
    // console.log(placeData);
    return placeData.address_descriptor.landmarks[0].display_name.text;
}

async function getCoordinates(roughAddress) {
    if (!roughAddress) return null;

    let addressURL = `${encodeURI(roughAddress)}`
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressURL}&key=${apiKey}`
    let data = await fetch(url);
    if (!data.ok) {
        throw new Error(`HTTP Error: ${data.status}`)
    }
    let coordData = await data.json();
    return coordData.results[0].geometry.location;
}

export default async function Home() {
    // console.log("in home, document.cookie is ", document.cookie)
    let cookieStore = await cookies();
    // console.log("in home, document.cookie is ", cookieStore.get('session_token'))
    // init user
    const user = await fetchUser();
    // console.log(user);
    let eventsData = []
    if (user) eventsData = await fetchEvents();
    // const eventsData = [
    //     new Map([
    //         ['moveType', false],
    //         ['start', new Date('Dec 16, 2024 10:00:00')],
    //         ['end', new Date('Dec 16, 2024 11:00:00')],
    //         ['title', 'Daily Standup Meeting'],
    //         ['location', 'Hudson-Bergen Light Rail HQ'],
    //         ['description', 'Some Description'],
    //     ]),
    //     new Map([
    //         ['moveType', false],
    //         ['start', new Date('Dec 16, 2024 12:00:00')],
    //         ['end', new Date('Dec 16, 2024 13:30:00')],
    //         ['title', 'Breakfast with Friend'],
    //         ['location', 'Woolworth Bldg'],
    //         ['description', 'Some Description'],
    //     ]),
    // ];

    // console.log('eventsData: ', eventsData);

    // add coordinates to eventsData elements
    for (let i = 0; i < eventsData.length; i++) {
        eventsData[i].set('coordinate', await getCoordinates(eventsData[i].get('location')));
        // console.log(eventsData[i].get('coordinate'));
    }

    const moveRoutes = [];  // each item is list of transportation methods b/w two events

    for (let i = 0; i < eventsData.length - 1; i++) {
        // console.log("events: ", eventsData[i].get('location'), "to ", eventsData[i + 1].get('location'))
        if (eventsData[i + 1].get('start') - eventsData[i].get('end') >= 1000 * 60 * 60 * 6)
            continue;
        if (!eventsData[i + 1].get('location'))
            continue;
        if (!eventsData[i].get('location'))
            continue;

        let routeData = await getRouteData(
            eventsData[i].get('location'),
            eventsData[i + 1].get('location'),
            eventsData[i + 1].get('start')
        );
        if (routeData.status === 'ZERO_RESULTS') continue;
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
                if (j > 0 && route[j - 1].get('type') == WALK_INDEX)
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
            />
            <PageComponent eventsData={eventsData} routeData={moveRoutes} />
        </div>
    )
}
