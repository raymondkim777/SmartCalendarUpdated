import { google } from 'googleapis';
import { sql } from '@vercel/postgres';

export async function GET(request) {
    try {
        // Extract email from the request's query parameters or cookies
        // const { searchParams } = new URL(request.url);
        // const email = searchParams.get('email'); // Option 1: Query parameter
        const email = request.cookies.get('user_email'); // Option 2: Cookie (use if cookies are set)

        if (!email) {
            return new Response(
                JSON.stringify({ error: 'Email is required to fetch tokens' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Fetch user tokens from the database
        const { rows } = await sql`
            SELECT access_token, refresh_token, token_expiry
            FROM user_info
            WHERE email = ${email}
        `;

        if (rows.length === 0) {
            return new Response(
                JSON.stringify({ error: 'No tokens found for the specified user' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const { access_token, refresh_token, token_expiry } = rows[0];

        const auth = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URI
        );

        // Set the retrieved tokens
        auth.setCredentials({
            access_token,
            refresh_token
        });

        // Refresh access token if necessary
        try {
            if (new Date() > new Date(token_expiry)) {
                const refreshedTokens = await auth.refreshAccessToken();
                auth.setCredentials(refreshedTokens.credentials);

                // Update the tokens in the database
                await sql`
                    UPDATE user_info
                    SET access_token = ${refreshedTokens.credentials.access_token},
                        refresh_token = ${refreshedTokens.credentials.refresh_token || refresh_token},
                        token_expiry = ${refreshedTokens.credentials.expiry_date}
                    WHERE email = ${email}
                `;
                console.log('Access token refreshed and updated in the database.');
            }
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
