import { sql } from'@vercel/postgres';

export async function getUserInfo(user_id) {
    try {
        const data = await sql`SELECT * FROM user_info WHERE id = '${user_id}'`;
        console.log(data);
        return data
    } catch (error) {
        throw new Error(error);
    }
}
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