import PageComponent from "./pageComponent";
import { WALK_INDEX, CAR_INDEX, RAIL_INDEX, SUB_INDEX, TRAIN_INDEX, TRAM_INDEX, BUS_INDEX } from '../transportation';

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

async function getRouteData(start, end, arrival_time, mode="transit") {
    const arrivalTimeInt = Math.trunc(arrival_time / 1000);

    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&mode=${mode}&key=${apiKey}&arrival_time=${arrivalTimeInt}`;
    let data = await fetch(url);
    let routeData = await data.json();
    console.log(routeData);
    return routeData;
}

async function getPlaceName(coordinates) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&extra_computations=ADDRESS_DESCRIPTORS&key=${apiKey}`;
    console.log(url);
    let data = await fetch(url);
    let placeData = await data.json();
    console.log(placeData);
    return placeData.address_descriptor.landmarks[0].display_name.text;
}

export default async function Home() {
    // events array is in locale time
    const eventsData = [ 
        new Map([
            ['moveType', false],
            ['start', new Date('Dec 14, 2024 10:00:00')],
            ['end', new Date('Dec 14, 2024 11:00:00')],
            ['title', 'Daily Standup Meeting'],
            ['location', 'Hudson-Bergen Light Rail HQ'],
            ['description', 'Some Description'],
        ]),
        new Map([
            ['moveType', false],
            ['start', new Date('Dec 14, 2024 12:00:00')],
            ['end', new Date('Dec 14, 2024 13:30:00')],
            ['title', 'Breakfast with Friend'],
            ['location', 'Woolworth Bldg'],
            ['description', 'Some Description'],
        ]),
    ];

    const moveRoutes2 = [];  // each item is list of transportation methods b/w two events

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
                    ['locations', await getPlaceName(steps[j].start_location)],
                    ['locatione', await getPlaceName(steps[j].end_location)],
                    ['coords', steps[j].start_location],
                    ['coorde', steps[j].end_location],
                    ['description', `About ${steps[j].duration.text}, ${steps[j].distance.text}`],
                ]);
                console.log(tempMap);
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
                    ['description', steps[j].html_instructions],
                ]);
            } else {
                throw new Error("Travel Mode is Invalid");
            }
            curTime = nextTime;
            route.push(tempMap);
        }
        moveRoutes2.push(route);
    }
    
    const moveRoutes = [  // each item is list of transportation methods b/w two events
        [
            new Map([
                ['start', new Date('Dec 14, 2024 11:05:00')],
                ['end', new Date('Dec 14, 2024 11:14:00')],
                ['type', WALK_INDEX],
                ['name', 'Walk'],
                ['locations', 'Hudson-Bergen Light Rail HQ'],
                ['locatione', 'Pacific Ave at Communipaw Ave'],
                ['description', 'About 9 min, 0.4 mi'],
            ]),
            new Map([
                ['start', new Date('Dec 14, 2024 11:14:00')],
                ['end', new Date('Dec 14, 2024 11:22:00')],
                ['type', RAIL_INDEX],
                ['name', '1 Jersey City Exchange PI via River Terminal'],
                ['locations', 'Pacific Ave at Communipaw Ave'],
                ['locatione', 'C Columbus Drive at Hudon St'],
                ['description', 'Service run by Nj Transit Bus'],
            ]),
            new Map([
                ['start', new Date('Dec 14, 2024 11:22:00')],
                ['end', new Date('Dec 14, 2024 11:23:00')],
                ['type', WALK_INDEX],
                ['name', 'Walk'],
                ['locations', 'C Columbus Drive at Hudon St'],
                ['locatione', 'Exchange Place'],
                ['description', 'About 1 min'],
            ]),
            new Map([
                ['start', new Date('Dec 14, 2024 11:40:00')],
                ['end', new Date('Dec 14, 2024 11:45:00')],
                ['type', SUB_INDEX],
                ['name', 'World Trade Center'],
                ['locations', 'Exchange Place'],
                ['locatione', 'World Trade Center'],
                ['description', 'Service run by Port Authority Trans-Hudson Corporation'],
            ]),
            new Map([
                ['start', new Date('Dec 14, 2024 11:45:00')],
                ['end', new Date('Dec 14, 2024 11:49:00')],
                ['type', WALK_INDEX],
                ['name', 'Walk'],
                ['locations', 'World Trade Center'],
                ['locatione', 'Woolworth Bldg'],
                ['description', 'About 4 min, 0.2 mi'],
            ]),
        ]
    ];
    return (
        <PageComponent eventsData={eventsData} routeData={moveRoutes2} />
    )
}