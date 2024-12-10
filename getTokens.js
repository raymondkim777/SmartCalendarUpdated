import { google } from 'googleapis';
import dotenv from 'dotenv';

// Load .env.local explicitly
dotenv.config({ path: '.env.local' });

const auth = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

async function getTokens(authCode) {
    try {
        const { tokens } = await auth.getToken(authCode);
        console.log('Access Token:', tokens.access_token);
        console.log('Refresh Token:', tokens.refresh_token);
        console.log('Full Token Response:', tokens);
        return tokens;
    } catch (error) {
        console.error('Error exchanging authorization code for tokens:', error.response?.data || error.message);
    }
}

// Replace with your actual authorization code
getTokens('4/0AeanS0ZM5Nk1hysuaZ1TYcuSndUwqcus-7DqShXB9y6UsrZPRetlUzSg9dW92bAqPhnvdA');
