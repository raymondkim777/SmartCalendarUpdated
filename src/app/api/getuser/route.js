import { getFirstUser } from '../../lib/userinfo';

export async function GET(req) {
    try {
        const firstUser = await getFirstUser();

        if (!firstUser) {
            return new Response(JSON.stringify({ error: 'No user found.' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(firstUser), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } 
    catch (error) {
        console.error('Error fetching user information:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch user information.' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
