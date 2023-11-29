'use client'

import { X } from '@phosphor-icons/react'
import { CartPizza } from './CartPizza'

export function Cart(){
    return (
        <div className="absolute top-0 bottom-0 right-0 z-50 flex flex-col justify-between items-center bg-primary text-white w-[440px] translate-x-full ">
            <div className="relative w-full">
                <button className="absolute top-2 right-2">
                    <X weight='bold' size={32} />
                </button>

                <div className="mt-12">
                    <CartPizza />
                    <CartPizza />
                    <CartPizza />
                </div>
            </div>

            <footer className="w-[calc((100%)-16px)] mx-2 border-t-white border-t px-5 pt-4 pb-5">
                <div className="flex justify-between items-center">
                    <strong className="text-xl">Preço Total</strong>
                    <strong className="text-xl">131,96</strong>
                </div>
                <button className="text-xl font-bold bg-white text-primary py-4 w-full mt-6 rounded">Finalizar Compra</button>
            </footer>
        </div>
    )
}