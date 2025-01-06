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

### Google OAuth ([DataBase.py](DataBase.py))  

Connecting to a user's Google account and fetching account information was done via Google OAuth2.0, which either returns a pre-existing non-expired access token, or generates an access token and refresh token if expired/nonavailable. The access token is fed back into OAuth2.0 to fetch user information such as email, name, and profile picture, and all user information and access (and refresh, if available) tokens are stored in the database. 

### Calendar Event Fetching ([DataBase.py](DataBase.py), [ArticleDatabase.db](ArticleDatabase.db])) 
![flowchart1](https://github.com/user-attachments/assets/25454ca7-1a85-4bc9-ac40-031477b79515)


### Route Computation ([System.py](System.py))  

#### Google Directions API

#### Google Geocoding API

#### Google Maps API


### Calendar UI

#### Route PopUps

#### PopUp Detailed View

