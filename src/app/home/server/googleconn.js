import { google } from 'googleapis';
import { cookies } from "next/headers";
import { sql } from '@vercel/postgres';

const MONTH_TIME = 3;

async function fetchUser() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;
    if (!sessionToken) return null;

    // Query the database for the user associated with the session token
    const { rows } = await sql`SELECT email, name, picture, notification FROM user_info WHERE access_token = ${sessionToken} LIMIT 1`;
    if (rows.length === 0) return null;
    
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
        if (!data) return [];

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

        return transformedEvents;
    } 
    catch (err) {
        console.error('Fetch Events Error:', err.message);
        setError(err.message);
    }
}

async function connectToCalendar() {
    try {
        const auth = await new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URI
        );
        if (!(await fetchTokens(auth))) return null;

        const calendar = await google.calendar({ version: 'v3', auth });
        
        const beforeTime = new Date();
        beforeTime.setMonth(beforeTime.getMonth() - MONTH_TIME);
        const afterTime = new Date();
        afterTime.setMonth(afterTime.getMonth() + MONTH_TIME);
    
        const response = await calendar.events.list({
            calendarId: 'primary', // Fetch from the primary calendar
            timeMin: beforeTime.toISOString(), 
            timeMax: afterTime.toISOString(), 
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

        return true;
    } 
    catch (refreshError) {
        console.error('Error refreshing access token:', refreshError.message);
        return false;
    }
}

export { fetchUser, fetchEvents }