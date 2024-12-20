import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req) {
    try {
        const { notifEnabled } = await req.json(); // Parse JSON body
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('session_token')?.value;

        if (!accessToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Update database
        await sql`
        UPDATE user_info
        SET notification = ${notifEnabled}
        WHERE access_token = ${accessToken}
        `;

        return NextResponse.json({ message: 'Settings updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Database update error:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
