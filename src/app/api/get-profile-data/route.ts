import { prisma } from '../../../lib/prisma'

type bodyData = {
    email: string | null | undefined
}

export async function POST(req: Request) {
    const {email}: bodyData = await req.json()
    
    if( email === null || email === undefined){
        return new Response('Email Invalid', {
            status: 403
        })
    }

    try{
        const profileData = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
    
    
        return new Response(JSON.stringify(profileData), {
            status: 200
        })
    }
    catch(err){
        return new Response(JSON.stringify(err), {
            status: 500
        })
    }    
}

// import { z } from 'zod'
// import { prisma } from '@/lib/prisma'

// type bodyData = {
//     email: string | null | undefined
// }

// const emailValidationSchema = z.string().email()

// export async function GET(req: Request, context: { params: { email: string } }) {
//     const { email } = context.params

//     try{
//         //Check if email is valid
//         emailValidationSchema.parse(email)

//         //If email is valid search for user data
//         const profileData = await prisma.user.findUnique({
//             where: {
//                 email: email
//             }
//         })

//         //If user is not found return 'User not found'
//         if(profileData === null){
//             return new Response('User not found', {
//                 status: 404
//             })    
//         }
        
//         // If user is found reuturn user
//         return new Response(JSON.stringify(profileData), {
//             status: 200
//         })
//     }
//     catch(err){
//         return new Response(JSON.stringify(err), {
//             status: 500
//         })
//     } 
// }