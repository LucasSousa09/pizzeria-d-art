import { redirect } from "next/navigation";
import { getServerSession } from 'next-auth';

import type { AddressData } from '../../components/Form/FormAddress';

import { FormCheckout } from '@/components/Form/FormCheckout';

import { api } from "@/lib/axios";

type ProfileData = {
    phone: string | null
}

export default async function CheckoutPage(){
    const session = await getServerSession()

    if(session && session.user){
        const { data: addresses } : { data: AddressData[] } = await api.post('/get-addresses-data', {email: session.user.email})
        const { data: profile } : { data: ProfileData } = await api.post('/get-profile-data', {email: session.user.email})

        if(addresses.length === 0){
            redirect('/profile/add-address?error=missing+address')
        }

        if(profile.phone === null){
            redirect('/profile?error=missing+phone')
        }

        const mainAddress = addresses.filter(address => address.mainAddress === true)

        const checkoutData = {
            street: mainAddress[0].street,
            district: mainAddress[0].district,
            zipCode: mainAddress[0].zipCode,
            state: mainAddress[0].state,
            houseNumber: mainAddress[0].houseNumber,
            complement: mainAddress[0].complement,
            city: mainAddress[0].city,
            reference: mainAddress[0].reference
        }
        
        return (
            <div className="flex flex-col items-center justify-start min-h-screen mt-[60px] md:mt-[104px] 2xl:pb-16">
                <h1 className="text-primary font-bold mt-6 md:mt-12 mb-6 md:mb-0 text-4xl md:text-5xl">Checkout</h1>
                
                <FormCheckout checkoutProps={checkoutData}/>      
            </div> 
        )
    }

    redirect('/login?error=session+error+checkout')
}