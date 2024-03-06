import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

import type { CartItemProps } from '../../../contexts/CartContextProvider'

export async function POST(req: Request) {
    const session = await getServerSession()

    try{
        const userId = await prisma.user.findUnique({
            where: {
                email: session?.user?.email || ''
            },
            select: {
                id: true
            }
        })

        const body: {cart: CartItemProps[], paymentMethod: string} = await req.json()

        const totalPrice = body.cart.reduce((acc, cur) => acc + (cur.price * cur.quantity),0)

        const orderId = await prisma.order.create({
            data: {
                pizzas: JSON.stringify(body.cart),
                successfull: 'pending',
                firstPizzaImg: body.cart[0].pizzaImg,
                totalPrice,
                paymentMethod: body.paymentMethod,
                orderId: userId?.id || ''
            },
            select: {
                id: true
            }
        })

        return Response.json({orderId})
    }
    catch(err){
        return new Response(JSON.stringify(err), {
            status: 402
        })
    }
}