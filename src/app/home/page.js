import PageComponent from "./pageComponent";

export default async function Home() {
    const eventsData = [ 
        new Map([
            ['moveType', false],
            ['start', new Date('Dec 14, 2024 10:00:00')],
            ['end', new Date('Dec 14, 2024 11:00:00')],
            ['title', 'Daily Standup Meeting'],
            ['location', 'Some Random Place'],
            ['description', 'Some Description'],
        ]),
        new Map([
            ['moveType', false],
            ['start', new Date('Dec 14, 2024 12:00:00')],
            ['end', new Date('Dec 14, 2024 13:30:00')],
            ['title', 'Breakfast with Friend'],
            ['location', 'Some Random Place'],
            ['description', 'Some Description'],
        ]),
    ]
    
    const moveRoutes = [  // each item is list of transportation methods b/w two events
        [
            new Map([
                ['start', new Date('Dec 11, 2024 11:05:00')],
                ['end', new Date('Dec 11, 2024 11:14:00')],
                ['type', WALK_INDEX],
                ['name', 'Walk'],
                ['locations', 'Hudson-Bergen Light Rail HQ'],
                ['locatione', 'Pacific Ave at Communipaw Ave'],
                ['description', 'About 9 min, 0.4 mi'],
            ]),
            new Map([
                ['start', new Date('Dec 11, 2024 11:14:00')],
                ['end', new Date('Dec 11, 2024 11:22:00')],
                ['type', RAIL_INDEX],
                ['name', '1 Jersey City Exchange PI via River Terminal'],
                ['locations', 'Pacific Ave at Communipaw Ave'],
                ['locatione', 'C Columbus Drive at Hudon St'],
                ['description', 'Service run by Nj Transit Bus'],
            ]),
            new Map([
                ['start', new Date('Dec 11, 2024 11:22:00')],
                ['end', new Date('Dec 11, 2024 11:23:00')],
                ['type', WALK_INDEX],
                ['name', 'Walk'],
                ['locations', 'C Columbus Drive at Hudon St'],
                ['locatione', 'Exchange Place'],
                ['description', 'About 1 min'],
            ]),
            new Map([
                ['start', new Date('Dec 11, 2024 11:40:00')],
                ['end', new Date('Dec 11, 2024 11:45:00')],
                ['type', SUB_INDEX],
                ['name', 'World Trade Center'],
                ['locations', 'Exchange Place'],
                ['locatione', 'World Trade Center'],
                ['description', 'Service run by Port Authority Trans-Hudson Corporation'],
            ]),
            new Map([
                ['start', new Date('Dec 11, 2024 11:45:00')],
                ['end', new Date('Dec 11, 2024 11:49:00')],
                ['type', WALK_INDEX],
                ['name', 'Walk'],
                ['locations', 'World Trade Center'],
                ['locatione', 'Woolworth Bldg'],
                ['description', 'About 4 min, 0.2 mi'],
            ]),
        ]
    ];



    const start = 'Montreal';
    const end = 'Toronto';
    const mode = 'driving'

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&mode=${mode}&key=${apiKey}`;
    let data = await fetch(url);
    let routeData = await data.json();
    return (
        <PageComponent eventsData={eventsData} routeData={routeData} />
    )
}