export const dynamic = 'force-dynamic'

import {cookies} from 'next/headers'
import jwt from 'jsonwebtoken'

async function getUserFromToken() {
    const token = (await cookies()).get('token')?.value
    if (!token) return null
    try {

        const user = jwt.verify(token, process.env.JWT_SECRET!)
        return user
    } catch {
        return {
            name: 'Unauthorized',
            role: 'guest'
        }
    }
}

export default getUserFromToken
