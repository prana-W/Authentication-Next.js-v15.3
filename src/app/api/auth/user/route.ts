import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic'

export async function GET() {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
        return NextResponse.json({ user: null });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET!);
        return NextResponse.json({ user });
    } catch {
        return NextResponse.json({ user: null });
    }
}
