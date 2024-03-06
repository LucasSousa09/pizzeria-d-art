import { prisma } from "../../../lib/prisma"

export async function PATCH(req: Request) {
    const body = await req.json()

    try{
        await prisma.user.update({
            where: {
                email: body.email
            },
            data: {
                cpf: body.cpf,
                phone: body.phone,
                username: body.username,
                mainAddress: body.mainAddress, 
            }
        })
        
        return new Response(null, {
            status: 204
        })
    }

    catch(err: any){
        if(err.code === "P2002"){
            return new Response("This CPF is already registered", {
                status: 400
            })
        }

        return new Response(JSON.stringify(err), {
            status: 500
        })
    }

}