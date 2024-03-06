import { prisma } from "../../../lib/prisma"

export async function PATCH(req: Request) {
    const body: {mainAddress: string} = await req.json()

    const { mainAddress } = body

    const street = mainAddress.split(';')[0]

    const houseNumber = Number(mainAddress.split(';')[1].split(':')[1])

    try{
        await prisma.address.updateMany({
            where: {
                mainAddress: true
            },
            data: {
                mainAddress: false
            }
        })
        
        await prisma.address.updateMany({
            where: {
                street: street,
                houseNumber: houseNumber
            },
            data: {
                mainAddress: true
            },
        })
    }
    
    catch(err){
        return Response.json({error: err})
    }
    return Response.json({message: 'Atualização realizada com sucesso!'})

}