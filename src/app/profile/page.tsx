import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { PencilSimple } from "@phosphor-icons/react/dist/ssr";

import { ProfileBox } from "../../components/ProfileBox";
import { PurchasedItem } from "../../components/PurchasedItem";
import { prisma } from "@/lib/prisma";

export default async function Profile(){
    const session = await getServerSession()

    const userId = await prisma.user.findUnique({
        where: {
            email: session?.user?.email || ''
        },
        select: {
            id: true
        }
    })

    
    const orders = await prisma.order.findMany({
        where: {
            orderId: userId?.id || ''
        }
    })
    
    console.log(orders)

    if(session){
        return (
            <>
                <ProfileBox label='Meus Pedidos'>
                    {
                        orders.length > 0 && (
                            orders.map(order => <PurchasedItem key={order.id} createdAt={order.createdAt} pizzaImg={order.firstPizzaImg} totalPrice={order.totalPrice} />)
                        ) 
                    }
                </ProfileBox>
    
                <ProfileBox label='Informações Pessoais'>
                    <Link href='/profile/edit' className="hover:brightness-125 active:scale-95 bg-primary text-white px-5 py-3 font-medium text-2xl flex gap-3 items-center rounded">
                       <PencilSimple weight="bold" size={28} /> 
                       Mais Informações
                    </Link>
                </ProfileBox>
            </>
        )
    }
    else {
        redirect('/login')
    }
}