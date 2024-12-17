import PageComponent from "./pageComponent";

export default async function Home() {
    const eventsData = [ 
        new Map([
            ['moveType', false],
            ['start', new Date('Dec 11, 2024 10:00:00')],
            ['end', new Date('Dec 11, 2024 11:00:00')],
            ['title', 'Daily Standup Meeting'],
            ['location', 'Some Random Place'],
            ['description', 'Some Description'],
        ]),
        new Map([
            ['moveType', false],
            ['start', new Date('Dec 12, 2024 9:00:00')],
            ['end', new Date('Dec 12, 2024 9:30:00')],
            ['title', 'Breakfast with Friend'],
            ['location', 'Some Random Place'],
            ['description', 'Some Description'],
        ]),
        new Map([
            ['moveType', false],
            ['start', new Date('Dec 12, 2024 9:30:00')],
            ['end', new Date('Dec 12, 2024 10:00:00')],
            ['title', 'Badminton Class'],
            ['location', 'Some Random Place'],
            ['description', 'Some Description'],
        ]),
        new Map([
            ['moveType', false],
            ['start', new Date('Dec 12, 2024 10:00:00')],
            ['end', new Date('Dec 12, 2024 11:00:00')],
            ['title', 'Eat Lunch'],
            ['location', 'Some Random Place'],
            ['description', 'Some Description'],
        ]),
        new Map([
            ['moveType', false],
            ['start', new Date('Dec 12, 2024 11:00:00')],
            ['end', new Date('Dec 12, 2024 13:00:00')],
            ['title', 'Stare at a Dog'],
            ['location', 'Some Random Place'],
            ['description', 'Some Description'],
        ]),
        new Map([
            ['moveType', false],
            ['start', new Date('Dec 12, 2024 17:00:00')],
            ['end', new Date('Dec 13, 2024 3:00:00')],
            ['title', 'Pickup Family'],
            ['location', 'Some Random Place'],
            ['description', 'Some Description'],
        ]),
        new Map([
            ['moveType', false],
            ['start', new Date('Dec 13, 2024 11:00:00')],
            ['end', new Date('Dec 13, 2024 12:30:00')],
            ['title', 'Meeting with Project Manager Long Title Very Long Ooooooh'],
            ['location', 'Some Random Place Thats Very Long Ooooooh Look at this Long Address Wow How Will This Render I Have No Idea I Hope Nothing Breaks Oh Look At That It Broke'],
            ['description', 'Some Description Thats Very Long Wooooow Will This Break As Well I Really Hope Not and Oh Look At That It Broke'],
        ]),
        new Map([
            ['moveType', false],
            ['start', new Date('Dec 14, 2024 6:00:00')],
            ['end', new Date('Dec 14, 2024 7:55:00')],
            ['title', 'Workout and Yoga Session'],
            ['location', 'Some Random Place'],
            ['description', 'Some Description'],
        ]),
        new Map([
            ['moveType', false],
            ['start', new Date('Dec 14, 2024 10:00:00')],
            ['end', new Date('Dec 14, 2024 13:45:00')],
            ['title', 'School Friend Birthday Party'],
            ['location', 'Some Random Place'],
            ['description', 'Some Description'],
        ]),
        new Map([
            ['moveType', false],
            ['start', new Date('Dec 15, 2024 8:00:00')],
            ['end', new Date('Dec 15, 2024 8:25:00')],
            ['title', 'Project Task Review'],
            ['location', 'Some Random Place'],
            ['description', 'Some Description'],
        ]),
        new Map([
            ['moveType', false],
            ['start', new Date('Dec 16, 2024 9:00:00')],
            ['end', new Date('Dec 16, 2024 10:45:00')],
            ['title', 'Doctor Appointment'],
            ['location', 'Some Random Place'],
            ['description', 'Some Description'],
        ]),
    ]

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