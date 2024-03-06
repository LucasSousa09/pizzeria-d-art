import { prisma } from '@/lib/prisma'
import bcript from 'bcrypt'

type reqData = {
    username: string
    email: string,
    password: string,
}

export async function POST(req: Request) {
    const body: reqData = await req.json()

    const { username, email, password } = body

    if( !email || !username || !password ){
        return new Response('Invalid Data', {
            status: 403
        })
    }

    const emailIsAlreadyRegistered = await prisma.user.findUnique({
        where: {
            email
        },
    })

    if(emailIsAlreadyRegistered){
        return new Response('This email is already registered', {
            status:400
        })
    }

    const hashedPassword = await bcript.hash(password, 10)

    await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: hashedPassword,
        }
    })

    return new Response('Account created successfully')
}