import { cookies } from 'next/headers';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // Await the cookies() call
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    if (!sessionToken) {
      return new Response(JSON.stringify({ user: null }), { status: 401 });
    }

    // Query the database for the user associated with the session token
    const { rows } = await sql`
      SELECT email FROM user_info WHERE access_token = ${sessionToken} LIMIT 1
    `;

    if (rows.length === 0) {
      return new Response(JSON.stringify({ user: null }), { status: 401 });
    }

    const user = { email: rows[0].email };
    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    console.error('Error retrieving user session:', error);
    return new Response(JSON.stringify({ user: null }), { status: 500 });
  }
}
