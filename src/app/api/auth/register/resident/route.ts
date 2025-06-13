import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Resident from '@/models/Resident'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
    try {
        await connectDB()

        const body = await req.json()
        const { name, email, phone, flatNumber, address, password, userType } = body

        const existingUser = await Resident.findOne({ phone })
        if (existingUser) {
            return NextResponse.json({ message: 'Email is already registered' }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newResident = new Resident({
            name,
            email,
            phone,
            flatNumber,
            address,
            password : hashedPassword,
            userType,
        })

        await newResident.save()

        return NextResponse.json({ message: 'Resident registered successfully' }, { status: 201 })
    } catch (error) {
        console.error('Error in registration:', error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}
