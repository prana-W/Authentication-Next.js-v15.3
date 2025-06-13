import {NextResponse} from 'next/server'
import dbConnect from '@/lib/mongodb'
import {Resident, Worker, Manager} from '@/models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// @ts-ignore
const JWT_SECRET:string = process.env?.JWT_SECRET

export async function POST(req: Request) {
    await dbConnect()

    const body = await req.json()
    const {phone, password, role} = body

    let user
    let userType

    switch (role) {
        case 'worker':
            user = await Worker.findOne({phone})
            userType = 'worker'
            break
        case 'resident':
            user = await Resident.findOne({phone})
            userType = 'resident'
            break
        case 'manager':
            user = await Manager.findOne({phone})
            userType = 'manager'
            break
        default:
            return NextResponse.json({error: 'Invalid role'}, {status: 400})
    }

    if (!user) {
        return NextResponse.json({error: `${userType} not found`}, {status: 401})
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password)

    if (!isPasswordCorrect) {
        return NextResponse.json({error: 'Password is incorrect'}, {status: 401})
    }


    const token = jwt.sign(
        {
            id: user._id,
            name: user.name,
            phone: user.phone,
            role: userType,
        },
        JWT_SECRET,
        {expiresIn: '7d'}
    )

    const response = NextResponse.json({
        message: 'Login successful',
        user: {
            name: user.name,
            role: userType,
            phone: user.phone,
            _id: user._id,
        },
    })

    response.cookies.set('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7
    })

    return response
}
