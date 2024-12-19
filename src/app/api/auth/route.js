import { google } from 'googleapis';
import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

async function saveUserTokens(userInfo, accessToken, refreshToken, tokenExpiry) {
    try {
        const { email, name, picture } = userInfo;
        // Check if user already exists
        const { rows } = await sql`
            SELECT * FROM user_info 
            WHERE email = ${email} LIMIT 1
        `;

        if (rows.length > 0) {
            // Update existing user
            await sql`
                UPDATE user_info
                SET 
                    access_token = ${accessToken},
                    notification = false
                WHERE email = ${email}
                RETURNING *;
            `;

        } else {
            // Insert new user
            await sql`
                INSERT INTO user_info (name, email, picture, access_token, refresh_token, token_expiry, notification)
                VALUES (${name}, ${email}, ${picture}, ${accessToken}, ${refreshToken}, ${tokenExpiry}, false)
                RETURNING *;
            `;
        }
    } 
    catch (error) {
        console.error('Failed to save tokens:', error.message);
        throw new Error('Database operation failed.');
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
        return new Response('Authorization code is missing.', { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    );

    try {
        console.log("gonna get tokens, starting try block")
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // Extract email from Google's API
        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2',
        });

        console.log("about to get user info")

        const userInfo = await oauth2.userinfo.get();
        const email = userInfo.data.email;
        const name = userInfo.data.name
        const picture = userInfo.data.picture;

        if (!email) {
            throw new Error('Failed to retrieve user email from Google.');
        }

        console.log("retrieved user email", email);

        // Save tokens to database
        await saveUserTokens(
            { email, name, picture }, 
            tokens.access_token,
            tokens.refresh_token,
            tokens.expiry_date
        );

        console.log("saved user tokens")

        const response = NextResponse.redirect('http://localhost:3000/home');
        console.log("formed redirect response")

        // Set session token in cookies
        response.headers.set(
            'Set-Cookie',
            `session_token=${tokens.access_token}; Secure; Path=/; Max-Age=3600`
        );

        console.log("returning response")

        return response;
    } 
    catch (error) {
        console.error('Error during OAuth process:', error);
        return new Response('Authentication failed', { status: 500 });
    }
}