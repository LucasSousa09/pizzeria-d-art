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
        const addressData = await prisma.address.findMany({
            where: {
                userEmail: email
            }
        })

        return new Response(JSON.stringify(addressData), {
            status: 200
        })
    }
    catch(err){
        return new Response(JSON.stringify(err), {
            status: 500
        })
    }    
}
