import { FormAddress } from "@/components/Form/FormAddress";
import { api } from "@/lib/axios";

import type { AddressData } from "@/components/Form/FormAddress";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export default async function EditAddress({params}: {params: {id: string}}){
    const { data: address }: {data: AddressData} = await api.post('/get-address-data', {addressId: params.id})



    return (
        <>
            <div className="mt-5 mb-6 flex items-center gap-6">
                <Link href="/profile">
                    <ArrowLeft className="text-primary h-6 w-6 hover:opacity-80" weight="bold" />
                </Link>
                <h1 className="text-3xl md:text-4xl xl:5xl text-primary font-bold">Endereço</h1>
            </div>

            <FormAddress 
                id={address.id}
                city={address.city}
                district={address.district}
                houseNumber={address.houseNumber}
                reference={address.reference}
                state={address.state}
                street={address.street}
                zipCode={address.zipCode}
                complement={address.complement}
                mainAddress={address.mainAddress}
            />
        </>
    )
}