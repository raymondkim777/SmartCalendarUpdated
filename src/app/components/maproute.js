"use client"

import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMapRoute = ({ directions, bounds, start, end }) => {
    let polyline = require( 'google-polyline' );


    const mapRef = React.useRef(null);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
                version: 'weekly'
            });

            const { Map } = await loader.importLibrary('maps');
            const { AdvancedMarkerElement } = await loader.importLibrary('marker');
            const { Polyline } = await loader.importLibrary('maps');
            const { LatLngBounds } = await loader.importLibrary('core');

            // map options
            const mapOptions = {
                mapId: 'DETAIL_ROUTE_VIEW',
                disableDefaultUI: false,
            };

            // setup map
            const map = new Map(mapRef.current, mapOptions);

            // put up marker
            const markerStart = new AdvancedMarkerElement({
                map: map, 
                position: start,
                title: "From",
            });
            const markerEnd = new AdvancedMarkerElement({
                map: map, 
                position: end,
                title: "To",
            });

            // draw polyline
            const pathPoints = polyline.decode(directions);
            const pathCoordinates = [];

            const boundsObject = new LatLngBounds();

            for (let i = 0; i < pathPoints.length; i++) {
                let coordinates = {lat: pathPoints[i][0], lng: pathPoints[i][1]};
                pathCoordinates.push(coordinates);
                boundsObject.extend(coordinates);
            }
            map.fitBounds(boundsObject);

            const path = new Polyline({
                path: pathCoordinates, 
                geodesic: true, 
                strokeColor: "#FF0000", 
                strokeOpacity: 1.0, 
                strokeWeight: 4,
            });
            path.setMap(map);
        }

        initMap();
    }, [directions]);

    return (
        <div className='w-full h-36 lg:h-44 xl:h-72' ref={mapRef} />
    )
}

export default GoogleMapRoute;