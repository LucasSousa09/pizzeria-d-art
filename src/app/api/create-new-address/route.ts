import { prisma } from "@/lib/prisma"; 
import { getServerSession } from "next-auth";

import type { AddressData } from '../../../components/Form/FormAddress'

export async function POST(req: Request) {
    const body: AddressData = await  req.json()
    const session = await getServerSession()

    try{
        if(session === null || session.user === undefined){
            return new Response('User not found', {
                status: 500
            })
        }

        const hasAddresses = await prisma.user.findUnique({
            where: {
                email: session.user.email || ""
            },
            include: {
                addresses: true
            }
        })

        const address = await prisma.address.create({
            data: {
                city: body.city,
                complement: body.complement || "",
                district: body.district,
                houseNumber: body.houseNumber,
                reference: body.reference,
                state: body.state,
                street: body.street,
                zipCode: body.zipCode,
                userEmail: session.user.email || "",
                mainAddress: hasAddresses?.addresses.length === 0 ? (true) : (false)
            },
            select: {
                street: true,
                houseNumber: true
            }
        })

        if(hasAddresses?.addresses.length === 0){
            await prisma.user.update({
                where: {
                    email: session.user.email || "",
                },
                data: {
                    mainAddress: address.street + "; nº:" + address.houseNumber
                }
            })
        }

        return new Response('Endereço adicionado com sucesso')
    }
    catch(err){
        return new Response(JSON.stringify(err), {
            status: 500
        }) 
    }
}