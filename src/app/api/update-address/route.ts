import {prisma} from '../../../lib/prisma'
import type { AddressData } from "@/components/Form/FormAddress";

export async function PATCH(request: Request) {
    const body: AddressData = await request.json()

    try{
        await prisma.address.update({
            where: {
                id: body.id
            },
            data: {
                city: body.city,
                complement: body.complement,
                district: body.district,
                reference: body.reference,
                state: body.state,
                street: body.street,
                zipCode: body.zipCode,
                houseNumber: body.houseNumber
            }
        })

        return new Response('Address updated with success', {
            status: 200
        })
    }
    catch(err){
        return new Response(JSON.stringify(err), {
            status: 500
        })
    }
}