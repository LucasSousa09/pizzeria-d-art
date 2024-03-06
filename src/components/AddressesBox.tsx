'use client'

import { PencilSimple } from '@phosphor-icons/react/dist/ssr'
import type { AddressData } from './Form/FormAddress'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash } from '@phosphor-icons/react'
import { api } from '@/lib/axios'
import { toast } from 'react-toastify'

type AdressesBoxProps = {
    addresses: AddressData[]
}

export function AddressesBox({addresses}: AdressesBoxProps){
    const [showDeleteButton, setShowDeleteButton] = useState('')

    const router = useRouter()

    async function handleDeleteAddress(addressId: string){
        try{
            await api.delete(`/delete-address/${addressId}`)

            toast.success('Endereço excluído com sucesso!')
        }
        catch(err: any){
            if(err.response.status = 406){
                toast.error("Por favor, selecione outro endereço como principal, antes de excluir o atual")
            }
            else{
                toast.error("Ocorreu algum erro, por favor, tente novamente mais tarde!")
            }
        }

        router.refresh()
    }


    return (
        <div>
            {
                addresses.length === 0 ? null : (
                    <div className="flex flex-col gap-3 py-3 w-full">
                        {
                            addresses.map(address => (
                                <div key={address.id} className="relative flex flex-col items-start md:flex-row md:items-center gap-2 whitespace-nowrap md:overflow-clip w-fit">
                                    <Link 
                                        href={`/profile/edit-address/${address.id}`} 
                                        className={
                                            "bg-white text-primary px-5 py-3 font-medium text-sm flex gap-2 items-center rounded max-w-fit " +
                                            "hover:opacity-70 active:scale-95"
                                        }
                                    >
                                        <PencilSimple className="h-4 w-4" weight="bold" /> 
                                        {address.street + "; nº:" + address.houseNumber}
                                    </Link>
                                    {
                                        showDeleteButton === address.id ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleDeleteAddress(address.id || "")} 
                                                    className="text-white bg-red-600 p-2 rounded hover:bg-red-950 transition-colors ease-linear">
                                                    Excluir endereço
                                                </button>
                                                <button
                                                    onClick={() => setShowDeleteButton('')}
                                                    className="bg-white text-red-600 p-2 rounded hover:bg-zinc-300 transition-colors ease-linear"
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                className="absolute top-2 -right-8 md:static"
                                                onClick={() => setShowDeleteButton(address.id || "")}
                                            >
                                                <Trash weight='fill' className="text-red-600 h-6 w-6" />
                                            </button>                        
                                        )
                                    }
                                </div>
                            ))
                        }       
                    </div>
                )
            }
        </div>
    )
}