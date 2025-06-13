import { cookies } from 'next/headers';

export async function POST() {
    const cookieStore = cookies();

    (await cookieStore).set('token', '', {
        path: '/',
        maxAge: 0
    });

    return Response.json({ message: 'Logged out and cookie cleared' });
}
