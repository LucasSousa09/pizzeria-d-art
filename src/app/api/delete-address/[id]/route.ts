import { prisma } from '@/lib/prisma'

export async function DELETE(request: Request, context: { params: { id: string } }) {
    try{
        await prisma.address.delete({
            where: {
                id: context.params.id,
                mainAddress: false
            },
            select: {
                mainAddress: true
            }
        })

        return new Response('Address deleted successfully', {
            status: 201
        })
    }
    catch(err: any){
        if(err.meta.cause === "Record to delete does not exist."){
            return new Response('Por favor, selecione outro endereço como principal, antes de excluir o atual',{
                status: 406
            })
        }

        return new Response(JSON.stringify(err), {
            status: 500
        })
    }
}
