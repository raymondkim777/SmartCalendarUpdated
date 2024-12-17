"use client"

import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMap = ({ coordinates }) => {
    const mapRef = React.useRef(null);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
                version: 'weekly'
            });

            const { Map } = await loader.importLibrary('maps');
            // marker
            const { AdvancedMarkerElement } = await loader.importLibrary('marker');

            // map options
            const mapOptions = {
                center: coordinates, 
                zoom: 17, 
                mapId: 'DETAIL_MAP_VIEW',
                disableDefaultUI: true,
            }

            // setup map
            const map = new Map(mapRef.current, mapOptions);

            // put up marker
            const marker = new AdvancedMarkerElement({
                map: map, 
                position: coordinates,
            })
        }

        initMap();
    }, []);

    return (
        <div className='w-full h-full' ref={mapRef} />
    )
}

export default GoogleMap;