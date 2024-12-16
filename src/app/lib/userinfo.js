import { sql } from '@vercel/postgres';

export async function getFirstUser() {
    try {
        
        const { rows } = await sql`SELECT * FROM user_info ORDER BY id ASC LIMIT 5`;
        if (rows.length === 0) {
            throw new Error('No users found in the database.');
        }
        return rows;
        
    } catch (error) {
        console.error('Database query failed:', error.message);
        throw new Error('Failed to fetch the first user.');
    }
}


export async function getUserByEmail(email) {
    try {
        const { rows } = await sql`SELECT * FROM user_info WHERE email = ${email} LIMIT 1`;
        if (rows.length === 0) {
            throw new Error(`No user found with email: ${email}`);
        }
        return rows; // Return the first matching user
    } catch (error) {
        console.error('Database query failed:', error.message);
        throw new Error(`Failed to fetch user with email: ${email}`);
    }
}



export async function addUser(name, email, notification = false, accessToken, refreshToken, tokenExpiry) {
    try {
        // Check if the user already exists
        const existingUser = await sql`
            SELECT * FROM user_info WHERE email = ${email}
        `;

        if (existingUser.rows.length > 0) {
            // User exists, update their data
            const result = await sql`
                UPDATE user_info
                SET access_token = ${accessToken},
                    refresh_token = ${refreshToken},
                    token_expiry = ${tokenExpiry},
                    notification = ${notification}
                WHERE email = ${email}
                RETURNING *;
            `;
            return result.rows[0]; // Return the updated user
        } else {
            // User doesn't exist, insert a new record
            const result = await sql`
                INSERT INTO user_info (name, email, access_token, refresh_token, token_expiry, notification)
                VALUES (${name}, ${email}, ${accessToken}, ${refreshToken}, ${tokenExpiry}, ${notification})
                RETURNING *;
            `;
            return result.rows[0]; // Return the newly added user
        }
    } catch (error) {
        console.error('Error inserting or updating data:', error.message);
        throw new Error('Failed to add or update user in the database.');
    }
}

