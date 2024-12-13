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