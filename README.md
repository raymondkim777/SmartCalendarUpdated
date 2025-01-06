# Smart Calendar That Computes Shortest Routes Between Events Using Public Transport

This website functions as a calendar widget that connects to a user's Google account and fetches events from their Google Calendar. It displays the fetched events in an easily navigable calendar UI, and the user can click each event for a popup view showing event duration and a location display. The calendar also computes the shortest route between two adjacent events. If a timely route exists, it is displayed between the two calendar events as a special event, which the user can click to show a popup detailing specific steps of the route. Each step can be clicked to expand a detailed view displaying the route on an interactive maps view. 

## Periods of Development  
- 12/9/2024 ~ 12/19/2024

## Development Environment  
- React + TailwindCSS
- NextJS
- PostgreSQL

## Core Features

### Vercel Deployment and Neon PostgreSQL Database

The website was deployed on a public domain through Vercel. A Neon database was also set up and conneted to the GitHub repository through Vercel. Neon was selected as it offered reasonable usage for free, and also utilized PostgreSQL, a popular database language we felt was important to learn and familiarize with. 

### Calendar UI

#### Route PopUps

#### PopUp Detailed View


### Google OAuth User Info & Calendar Event Fetching

Connecting to a user's Google account and fetching account information was done via Google OAuth2.0, which either returns a pre-existing non-expired access token, or generates an access token and refresh token if expired/nonavailable. The access token is fed back into OAuth2.0 to fetch user information such as email, name, and profile picture, and all user information and access (and refresh, if available) tokens are stored in the database. 

![flowchart1](https://github.com/user-attachments/assets/25454ca7-1a85-4bc9-ac40-031477b79515)

### Route Computation

Reading adjacent calendar events and computing valid routes was done via the Google Maps API Platform, which contains both a Directions API and a Geocoding API. 

#### Google Directions API ([Documentation](https://developers.google.com/maps/documentation/directions))

The Directions API was used to compute valid routes between an origin and destination. If two adjacent events both contained location data, the location strings were fed into the origin/destination parameters to receive a JSON object containing route data. The object contains a `route` list containing different routes in descending optimal order, with each route containing a `steps` list denoting each intermediary step of the route. 

Optional parameters were also used for clarity. Directions API has a `mode` parameter with four possible values: `driving`, `walking`, `bicycling`, and `transit`, that specifies which mode of transport should be used. The website prioritizes transit results, to uphold their accessible and sustainable nature. If no results or invalid results are returned, the website reverts to either driving or walking based on a combination of distance and total travel time.

Directions API also has an `arrival_time` parameter to specify the latest arrival time a route should have. In this case, the arrival time should be the starting time of the second event, to ensure the user arrives on time. If any of the final computed routes have a departure time later than the finishing time of the first event, it is considered valid and displayed on the calendar UI; otherwise, no timely route exists and no route is displayed. 

One minor note is the JSON structure of `transit` route data, as it contains additional information. Transit routes generally consist of alternating transit and walking steps, where the user has to walk from one station to another. The transit steps have specific departure and arrival times and clearly defined durations, which were used to more accurately compute the total travel time. Transit steps also contain specific departure and arrival stop names, as well as headsigns (the specific name of the bus/subway/train) and vehicle type. 

#### Google Geocoding API ([Documentation](https://developers.google.com/maps/documentation/geocoding))

The Directions API returns the locations of each step of its route in latitude/longitude coordinates. Thus in order to display each route step in our UI, we feed the coordinates into the Geocoding API to turn them into readable location strings. 

The Geocoding API returns the raw address of the location by default. Though accurate, this is not very applicable from a usability standpoint; it is easier for a user to go to the station near the "World Trade Center" than "285 Fulton Street Manhattan, New York", though both denote the same location. Raw addresses also do not line up with transit station naming conventions; the aforementioned station would be aptly named and thus known as the "World Trade Center" station. 

Thus an optional parameter `extra_computations` was used to return address descriptors instead of address components. Address descriptors are additional information that help describe a location, provided as either landmarks or areas. Landmarks refer to specific buildings or monuments of note (ex. World Trade Center), whereas areas refer to the most notable container (ex. Carleton College). Landmarks were used if available, and areas if not. If no suitable landmark/areas were found, a truncated version of the raw address was used instead. 

One note is regarding transit stops. As mentioned before, transit steps contain the specific station names for the departure and arrival stops, which were used in place of the Geocoding API results for clarity. 

#### Google Maps API ([Documentation](https://developers.google.com/maps))

The default Google Maps API platform supplies the tools necessary to implement an interactive Google Maps widget into the website. This tool was used within the popup menus and detailed views to show either the event location (for events) or display the actual route (for route steps). 

Each step within each route of the Directions API contains a `polyline` field with an encoded list of points that formulate components of a polyline that make up the route. As Google themselves do not provide an easily accessible polyline decoder, an efficient third-party [decoder](https://github.com/jhermsmeier/node-google-polyline/tree/master) written by [jhermsmeier](https://github.com/jhermsmeier) was used instead to extract each lat/lng coordinate. These were used to create a new polyline that was then displayed on the Maps widget itself. Additional markers were used to clearly denote the start and end points of the route for clarity. 
