// src/app/api/adddata/route.js

import { addUser } from '../../lib/userinfo';

export async function GET() {
    try {
        // Example: Add a user when visiting the endpoint
        const newUser = await addUser('John J', 'john.doe@exam.com', true, "bisijsnjihfdsfbiss", "bkbjfsfnj3odw23", "1xxssffx3527927");

        // HTML response to display the added user details
        const responseHtml = `
            <html>
            <head>
                <title>New User Added</title>
            </head>
            <body>
                <h1>New User Added</h1>
                <p><strong>ID:</strong> ${newUser.id}</p>
                <p><strong>Name:</strong> ${newUser.name}</p>
                <p><strong>Email:</strong> ${newUser.email}</p>
                <p><strong>Notification:</strong> ${newUser.notification ? 'Enabled' : 'Disabled'}</p>
            </body>
            </html>
        `;

        return new Response(responseHtml, {
            status: 200,
            headers: { 'Content-Type': 'text/html' },
        });
    } catch (error) {
        console.error('Error adding user:', error.message);

        // HTML error response
        const errorHtml = `
            <html>
            <head>
                <title>Error</title>
            </head>
            <body>
                <h1>Error Adding User</h1>
                <p>${error.message}</p>
            </body>
            </html>
        `;

        return new Response(errorHtml, {
            status: 500,
            headers: { 'Content-Type': 'text/html' },
        });
    }
}
