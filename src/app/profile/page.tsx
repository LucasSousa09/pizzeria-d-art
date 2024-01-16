import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { PencilSimple } from "@phosphor-icons/react/dist/ssr";

import { ProfileBox } from "../../components/ProfileBox";
import { PurchasedItem } from "../../components/PurchasedItem";
import { prisma } from "@/lib/prisma";

export type Pizza = {
    id: string,
    pizzaName: string,
    price: number,
    pizzaImg: string,
    quantity: number
}

const payment = {
    money: 'Dinheiro',
    pix: 'PIX',
    credit: 'Cartão de Crédito',
}

const pizzaStatus = {
    pending: 'Em andamento',
    finished: 'Concluída',
    canceled: 'Cancelada'
}



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
    

    if(session){
        return (
            <>
                <ProfileBox label='Meus Pedidos'>
                    {
                        orders.length > 0 && (
                            orders.map(order => <PurchasedItem 
                                                    key={order.id} 
                                                    createdAt={order.createdAt} 
                                                    pizzaImage={order.firstPizzaImg} 
                                                    totalPrice={order.totalPrice} 
                                                    paymentType={payment[order.paymentMethod as 'money' | 'credit' | 'pix'] }
                                                    pizzas={JSON.parse(order.pizzas)}
                                                    status={pizzaStatus[order.successfull as 'pending' | 'finished'| 'canceled']}
                                                />)
                        ) 
                    }
                </ProfileBox>
    
                <ProfileBox label='Informações Pessoais'>
                    <Link href='/profile/edit' className="hover:brightness-125 active:scale-95 bg-primary text-white px-5 py-3 font-medium text-lg md:text-2xl flex gap-3 items-center rounded">
                       <PencilSimple className="h-5 w-5 md:h-[28px] md:w-[28px]" weight="bold" /> 
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