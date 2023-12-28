import { prisma } from "../../../lib/prisma"

export async function POST(req: Request) {
    const body = await req.json()

    try{
        await prisma.user.update({
            where: {
                email: body.email
            },
            data: {
                cpf: body.cpf,
                phone: body.phone,
                street: body.street,
                district: body.district,
                zipCode: body.zipCode,
                houseNumber: body.houseNumber,
                complement: body.complement,
                city: body.city,
                state: body.state,
                reference: body.reference 
              }
        })

        
    }
    catch(err){
        return Response.json({error: err})
    }

    return Response.json({message: 'Atualização realizada com sucesso!'})
}