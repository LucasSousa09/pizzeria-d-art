import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
    const res = await request.json()
    
    try{
        await prisma.order.update({
            where: {
                id: res.orderId
            },
            data: {
                successfull: 'finished'
            }
        })
        
        return new Response('Order sucessfully updated')
    }
    catch(err){
        return new Response('Failure at updating order', {
            status: 402
        })
    }
}