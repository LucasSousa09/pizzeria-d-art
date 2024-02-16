import { redirect } from "next/navigation";
import { getServerSession } from 'next-auth';

import { getProfileData } from '@/utils/getProfileData';

import type { ProfileDataProps } from '../profile/edit/page';

import { FormCheckout } from '@/components/Form/FormCheckout';

export default async function CheckoutPage(){
    const session = await getServerSession()

    if(session){
        const data:ProfileDataProps = await getProfileData(session?.user?.email || '')

        const checkoutData = {
            street: data?.street,
            district: data?.district,
            zipCode: data?.zipCode,
            state: data?.state,
            houseNumber: data?.houseNumber,
            complement: data?.complement,
            city: data?.city,
            reference: data?.reference
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