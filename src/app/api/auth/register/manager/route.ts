import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Manager from '@/models/Manager'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
    try {
        await connectDB()

        const body = await req.json()
        const { name, email, phone, managerId, password, userType } = body

        // Check for existing manager by email or managerId
        const existingManager = await Manager.findOne({
            $or: [{ email }, { managerId }]
        })
        if (existingManager) {
            return NextResponse.json(
                { message: 'Email or Manager ID already registered' },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newManager = new Manager({
            name,
            email,
            phone,
            managerId,
            password: hashedPassword,
            userType,
        })

        await newManager.save()

        return NextResponse.json(
            { message: 'Manager registered successfully' },
            { status: 201 }
        )
    } catch (error: any) {
        console.error('Manager Registration Error:', error)
        if (error.code === 11000) {
            return NextResponse.json(
                {
                    message:
                        'Duplicate field: ' +
                        Object.keys(error.keyValue).join(', '),
                },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
