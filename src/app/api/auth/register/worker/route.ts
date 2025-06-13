import { NextResponse } from 'next/server'
import dbConnect  from '@/lib/mongodb'
import Worker from '@/models/Worker'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
    try {
        await dbConnect()
        const body = await req.json()

        const { name, phone, workerId, role, password } = body

        // Check if already exists
        const existing = await Worker.findOne({ $or: [{ phone }, { workerId }] })

        if (existing) {
            return NextResponse.json({ message: 'Worker already exists' }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newWorker = new Worker({
            name,
            phone,
            workerId,
            role,
            password: hashedPassword
        })

        await newWorker.save()

        return NextResponse.json({ message: 'Worker registered successfully' }, { status: 201 })
    } catch (error) {
        console.error('[REGISTER_WORKER_ERROR]', error)
        return NextResponse.json({ message: 'Server error' }, { status: 500 })
    }
}
