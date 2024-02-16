'use client'

import Image from 'next/image'
import { useState } from 'react'
import { format } from 'date-fns'
import { CaretDoubleDown } from '@phosphor-icons/react/dist/ssr'

import { formatter } from '@/lib/formatter'

import type { Pizza } from '../app/profile/page'
import { Separator } from './Separator'
import { CaretDoubleUp } from '@phosphor-icons/react'

type OrderProps = {
    pizzaImage: string,
    createdAt: Date,
    totalPrice: number,
    paymentType: string,
    status: string,
    pizzas: Pizza[]
} 

export function Order({ pizzaImage, createdAt, totalPrice, paymentType, status, pizzas }: OrderProps){
    const date = format(createdAt, 'dd/MM/yyyy')
    const hours = format(createdAt, 'hh:mm')

    const [ isShowingDetails, setIsShowingDetails ] = useState(false)

    return (
        <div className="flex items-start p-5 gap-5 bg-primary text-white rounded h-fit min-w-fit">
            <Image src={pizzaImage} alt="" height={90} width={90} />

            <div className={`flex flex-col justify-between items-end text-lg ${isShowingDetails ? 'h-full' : 'h-[90px]' } transition-all duration-1000 delay-0 ease-linear`}>
                <div className='flex flex-col items-end gap-2 w-full'>
                    <div className="flex items-center justify-between w-full">
                        <strong className="leading-tight">{ date }</strong>
                        -
                        <strong className="leading-tight">{ hours }</strong>
                    </div>
                    <strong className="leading-tight">{ formatter.format(totalPrice / 100)}</strong>
                </div>
                
                <div className={`${!isShowingDetails ? 'max-h-0' : 'max-h-96' } overflow-clip transition-all duration-1000 ease-linear w-full mt-2 mb-5 flex flex-col items-start gap-1`}>
                    <Separator />
                    <span className="text-sm font-semibold leading-normal block">Pagamento:</span>
                    <span className="text-sm font-semibold leading-normal block">{paymentType}</span>
                    <Separator />
                    <span className="text-sm font-semibold leading-normal block">Status:</span>
                    <span className="text-sm font-semibold leading-normal block">{status}</span>
                    <Separator />
                    <span className="text-sm font-semibold leading-normal block">Pizzas:</span>
                    <div className="flex gap-2 pb-2">
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
                    onClick={() => setIsShowingDetails(state => !state)}
                    className='flex items-center gap-1 font-medium text-xs'
                >
                    {
                        isShowingDetails ? (
                            <>
                                Minimizar detalhes
                                <CaretDoubleUp weight="bold" size={15} />
                            </>
                        ) : (
                            <>
                                Ver detalhes
                                <CaretDoubleDown weight="bold" size={15} />
                            </>
                        )
                    }
                </button>
            </div>
        </div>
    )
}