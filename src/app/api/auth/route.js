
import { google } from 'googleapis';
import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';


async function saveUserTokens(email, accessToken, refreshToken, tokenExpiry) {
  try {
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


      console.log('User tokens updated successfully.');
    } else {
      // Insert new user
      await sql`
            INSERT INTO user_info (name, email, access_token, refresh_token, token_expiry, notification)
            VALUES ('', ${email}, ${accessToken}, ${refreshToken}, ${tokenExpiry}, false)
            RETURNING *;
        `;
      console.log('New user tokens saved successfully.');
    }
  } catch (error) {
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
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Extract email from Google's API
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });

    const userInfo = await oauth2.userinfo.get();
    const email = userInfo.data.email;

    if (!email) {
      throw new Error('Failed to retrieve user email from Google.');
    }
    console.log('email', email);
    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token);
    console.log('Expiry Date:', tokens.expiry_date);


    // Save tokens to database
    await saveUserTokens(
      email,
      tokens.access_token,
      tokens.refresh_token,
      tokens.expiry_date
    );

    const response = NextResponse.redirect('http://localhost:3000/home');

    // Set session token in cookies
    response.headers.set(
      'Set-Cookie',
      `session_token=${tokens.access_token}; Secure; Path=/; Max-Age=3600`
    );

    console.log('Tokens saved for user:', email);

    console.log("we should see after this api endpoint is called, whether we have cookies set on the FE!")

    return response;
  } catch (error) {
    console.error('Error during OAuth process:', error);
    return new Response('Authentication failed', { status: 500 });
  }
}


