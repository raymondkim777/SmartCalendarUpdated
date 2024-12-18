import { cookies } from 'next/headers';
import { sql } from '@vercel/postgres';
import { google } from 'googleapis';

export async function GET(request) {
  try {
    // Retrieve the access_token from cookies
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('session_token')?.value;

    if (!accessToken) {
      console.error('Access token cookie not found.');
      return new Response(
        JSON.stringify({ error: 'Access token is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    console.error('Access token cookie found.');

    // Fetch user tokens from the database using the access token
    const { rows } = await sql`
      SELECT access_token, refresh_token, token_expiry
      FROM user_info
      WHERE access_token = ${accessToken}
    `;

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No tokens found for the provided access token' }),
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
      refresh_token,
    });

    // Refresh the access token if it has expired
    try {
      if (new Date() > new Date(token_expiry)) {
        const refreshedTokens = await auth.refreshAccessToken();
        auth.setCredentials(refreshedTokens.credentials);

        // Update the tokens in the database
        await sql`
          UPDATE user_info
          SET access_token = ${refreshedTokens.credentials.access_token},
              refresh_token = ${refreshedTokens.credentials.refresh_token || refresh_token},
              token_expiry = ${new Date(refreshedTokens.credentials.expiry_date).toISOString()}
          WHERE access_token = ${accessToken}
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
