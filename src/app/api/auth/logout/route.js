import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        // Simulate awaiting cookie deletion by building the Set-Cookie header
        const deleteCookie = async () => {
            return 'session_token=; Path=/; HttpOnly; Secure; Max-Age=0';
        };

        // Await the cookie deletion logic
        const cookieHeader = await deleteCookie();

        // Create a response with the Set-Cookie header
        const response = NextResponse.redirect(process.env.NEXTAUTH_URL);
        response.headers.set('Set-Cookie', cookieHeader);

        return response;
    } catch (error) {
        console.error('Error during logout:', error);
        return new NextResponse(JSON.stringify({ error: 'Logout failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
