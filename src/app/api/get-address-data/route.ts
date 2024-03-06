import { prisma } from '../../../lib/prisma'

type bodyData = {
    addressId: string
}

export async function POST(req: Request) {
    const { addressId }: bodyData = await req.json()
    
    if( addressId === "" ){
        return new Response('Address not found', {
            status: 404
        })
    }

    try{
        const addressData = await prisma.address.findUnique({
            where: {
                id: addressId
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
