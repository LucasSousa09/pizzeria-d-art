'use client'

import Image from 'next/image'
import { useState } from 'react'
import { format } from 'date-fns'
import { CaretDoubleDown } from '@phosphor-icons/react/dist/ssr'

import { formatter } from '@/lib/formatter'

import type { Pizza } from '../app/profile/page'

type PurchasedItemProps = {
    pizzaImage: string,
    createdAt: Date,
    totalPrice: number,
    paymentType: string,
    status: string,
    pizzas: Pizza[]
} 

export function PurchasedItem({ pizzaImage, createdAt, totalPrice, paymentType, status, pizzas }: PurchasedItemProps){
    const date = format(createdAt, 'dd/MM/yyyy')
    const hours = format(createdAt, 'hh:mm')

    const [ showingDetails, setShowingDetails ] = useState(false)

    return (
        <div className="flex items-start p-5 gap-5 bg-primary text-white rounded h-fit">
            <Image src={pizzaImage} alt="" height={90} width={90} />

            <div className={`flex flex-col justify-between items-end text-lg ${showingDetails ? 'h-full' : 'h-[90px]' }`}>
                <div className='flex flex-col items-end gap-2 w-full'>
                    <div className="flex items-center justify-between w-full">
                        <strong className="leading-tight">{ date }</strong>
                        -
                        <strong className="leading-tight">{ hours }</strong>
                    </div>
                    <strong className="leading-tight">{ formatter.format(totalPrice / 100)}</strong>
                </div>
                
                <div className={`${!showingDetails && 'hidden' }  mt-2 mb-5 flex flex-col gap-1`}>
                    <span className="text-sm font-semibold leading-normal block">Pagamento: {paymentType}</span>
                    <span className="text-sm font-semibold leading-normal block">Status: {status}</span>
                    <span className="text-sm font-semibold leading-normal block">Pizzas:</span>
                    <div className="flex gap-2">
                        {pizzas.map(pizza => {
                            return (
                                <div className="relative" key={pizza.id}>
                                    <Image src={pizza.pizzaImg} alt="" height={50} width={50} />
                                    <span className="absolute bottom-[-8px] right-[-2px] flex items-center justify-center bg-pag-active rounded-full h-6 w-6 font-bold text-sm" >{pizza.quantity}</span>
                                </div>
                             )
                        })}
                    </div>
                </div>

                <button 
                    onClick={() => setShowingDetails(state => !state)}
                    className='flex items-center gap-1 font-medium text-xs'
                >
                    Ver detalhes
                    <CaretDoubleDown weight="bold" size={15} />
                </button>
            </div>
        </div>
    )
}