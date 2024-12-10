import { google } from 'googleapis';

export async function GET(request) {
    try {
        const auth = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URI
        );

        const tokens = {
            access_token: process.env.ACCESS_TOKEN,
            refresh_token: process.env.REFRESH_TOKEN,
        };

        auth.setCredentials(tokens);

        // Refresh access token if necessary
        try {
            const refreshedTokens = await auth.refreshAccessToken();
            auth.setCredentials(refreshedTokens.credentials);
        } catch (refreshError) {
            console.error('Error refreshing access token:', refreshError.message);
            return new Response(
                JSON.stringify({ error: 'Failed to refresh access token' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const calendar = google.calendar({ version: 'v3', auth });

        const now = new Date();
        const oneYearLater = new Date();
        oneYearLater.setFullYear(now.getFullYear() + 1);

        const response = await calendar.events.list({
            calendarId: 'primary', // Fetch from the primary calendar
            timeMin: now.toISOString(), // Start from now
            timeMax: oneYearLater.toISOString(), // Up to one year from now
            maxResults: 100, // Adjust the number of results if needed
            singleEvents: true,
            orderBy: 'startTime',
        });

        return new Response(JSON.stringify(response.data.items), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('API Route Error:', error.message);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch calendar events' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
