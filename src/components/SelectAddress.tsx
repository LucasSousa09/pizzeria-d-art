'use client'

import { CaretDown, Plus } from "@phosphor-icons/react";
import Link from "next/link";

type Address = {
    id: string,
    street: string,
    district: string,
    zipCode: string,
    houseNumber: number,
    complement: string | null,
    city: string,
    state:  string,
    reference: string,
    addressId: string,
}

type SelectAddressesProps = {
    addressesData: Address[]
}

export function SelectAddress({addressesData}: SelectAddressesProps) {
    return (
        <div className="flex flex-col w-full">
            
            <header className="flex items-center justify-between w-full text-white">
                <strong className="text-white text-base font-medium leading-relaxed">
                    Endereços
                </strong>
                <button type="button"> <Plus weight="bold" /> </button>
            </header>
            
            <button className="flex justify-between items-center w-full border border-white text-white rounded px-3 py-2 mt-1 text-xs" >
                <span>
                    Lugar nenhum, nº:00
                </span>
                <CaretDown weight="bold" />
            </button>
        </div>
    )
}

        // <div className="flex flex-col w-full">
        //     <div className="flex items-center justify-between w-full text-white">
        //         <label 
        //             htmlFor="addresses"
        //             className="text-white text-base font-medium leading-relaxed"
        //         >
        //             Endereços
        //         </label>
        //         <button 
        //             type="button"
        //         >
        //             <Plus weight="bold" />
        //         </button>
        //     </div>
        //     <select name="addresses" id="addresses" className="bg-primary border-white border rounded text-white text-xs px-2 py-1 mt-1">
        //         <option value="0">
        //             <Link href="/profile/edit/new-address">
        //                 Adicione um novo endereço
        //             </Link>
        //         </option>
        //         {
        //             data.addressesData.map((address, idx) => (
        //                 <option key={address.id} value={idx+1}>
        //                     <Link href={`/profile/edit/${address.id}`}>
        //                         { address.street + ' nº: ' + address.houseNumber }
        //                     </Link>
        //                 </option>
        //             ))
        //         }
        //     </select>
        // </div>