import { WALK_INDEX, CAR_INDEX, RAIL_INDEX, SUB_INDEX, TRAIN_INDEX, TRAM_INDEX, BUS_INDEX } from '../../transportation';

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

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

    return routeData;
}


async function getPlaceName(coordinates) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&extra_computations=ADDRESS_DESCRIPTORS&key=${API_KEY}`;
    
    let data = await fetch(url);
    let placeData = await data.json();
    
    if (placeData.address_descriptor.landmarks.length != 0)
        return placeData.address_descriptor.landmarks[0].display_name.text;
    else if (placeData.address_descriptor.areas.length != 0)
        return placeData.address_descriptor.areas[0].display_name.text;

    // search specific address
    let new_url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${API_KEY}`;
    let new_data = await fetch(new_url);
    let addressData = await new_data.json();

    if (addressData.status == "OK" && addressData.results.length != 0) {
        let split_str = addressData.results[0].formatted_address.split(", ");
        let split_substr = split_str[0].split(" ");

        // true if not number
        if (isNaN(split_substr[0]))
            return split_str[0];

        return split_str[0].substring(split_substr[0].length + 1);
    }
    return "N/A";
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
    if (coordData.status != 'OK')
        return null;

    return coordData.results[0].geometry.location;
}

async function createMoveRoutes(eventsData, idx, routeDataObj) {
    const { routeType, routeData } = routeDataObj;
    const route = [];
    const steps = routeData.routes[0].legs[0].steps;
    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    
    let curTime = new Date(new Date(eventsData[idx + 1].get('start') - routeData.routes[0].legs[0].duration.value * 1000).toLocaleString('en-US', options));
    if (routeType === 'transit' && routeData.routes[0].legs[0].departure_time?.value) 
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
        } 
        else if (steps[j].travel_mode === "WALKING" || steps[j].travel_mode === "DRIVING") {
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

export { getShortestRoute, getPlaceName, getCoordinates, createMoveRoutes }