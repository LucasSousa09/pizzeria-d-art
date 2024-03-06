import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Plus } from "@phosphor-icons/react/dist/ssr";

import { ProfileBox } from "../../components/ProfileBox";
import { FormProfile } from "../../components/Form/FormProfile";

import { api } from "@/lib/axios";
import { prisma } from "@/lib/prisma";

import type { AddressData } from '../../components/Form/FormAddress' 
import { OrdersBox } from "@/components/OrdersBox";
import { AddressesBox } from "@/components/AddressesBox";

export type Pizza = {
    id: string,
    pizzaName: string,
    price: number,
    pizzaImg: string,
    quantity: number
}

type ProfileData = {
        id: string,
        email: string,
        username: string,
        avatar: string | null,
        cpf: string | null,
        phone: string | null,
        mainAddress: string | null
}

export default async function Profile(){
    const session = await getServerSession()

    if(session === null || session.user === undefined){
        redirect('/login?error=session+error')
    }
    
    const { data: profileData, status } :  { data: ProfileData, status: number } = await api.post('/get-profile-data',{email: session.user.email})
    const { data: addressesData, status: addressesStatus } : {data: AddressData[], status: number } = await api.post('/get-addresses-data', {email: session.user.email})

    if(status === 403 || addressesStatus === 403){
        redirect('/profile?error=user+not+found')
    }

    if(status === 500 || addressesStatus === 500){
        redirect('/profile?error=random+error')
    }


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

    const addressIdStreetAndNumber = addressesData.map(address => {
        return {
            id: address.id,
            street: address.street,
            houseNumber: address.houseNumber
        }
    })
    
    return (
        <>
            <h1 className="mt-5 mb-6 md:mb-12 text-3xl md:text-4xl xl:5xl text-primary font-bold">Meu Perfil</h1>

        
            <div className="flex flex-col lg:flex-row gap-x-12 w-full max-w-full px-3 sm:px-5 md:px-6">            
                <FormProfile profileData={profileData} addressIdStreetAndNumber={addressIdStreetAndNumber}/>

                <div className="flex flex-col lg:flex-1 lg:max-w-[66%] xl:max-w-[68%] 2xl:max-w-[1400px]">
                    <ProfileBox label='Meus Pedidos'>
                        <OrdersBox orders={orders} />
                    </ProfileBox>
        
                    <ProfileBox label='Endereços'>
                        <div className="w-full">
                            <AddressesBox addresses={addressesData} />

                            {/* Link para adicionar novo endereço */}
                            <div className="flex gap-2">
                                <Link 
                                    href='/profile/add-address' 
                                    className={
                                        "bg-primary text-white px-5 py-3 font-medium text-base md:text-lg flex gap-3 items-center rounded max-w-fit " +
                                        "hover:brightness-125 active:scale-95"
                                    }
                                >
                                    <Plus className="h-4 w-4 md:h-5 md:w-5" weight="bold" /> 
                                    Adicionar endereço
                                </Link>
                            </div>
                        </div>
                    </ProfileBox>
                </div>
            </div>
        </>
    )
}