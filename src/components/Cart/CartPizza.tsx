'use client'

import Image from "next/image";
import { useContext, useState } from "react";
import { Trash } from '@phosphor-icons/react'

import { formatter } from "@/lib/formatter";

import { Quantity } from "../Quantity";
import { Separator } from "../Separator";
import { CartContext } from "@/contexts/CartContextProvider";


type CartPizzaProps = {
    id: string,
    onCheckout?: boolean,
    pizzaImg: string,
    pizzaName: string,
    price: number,
    quantity: number
}

export function CartPizza({ pizzaImg, pizzaName, price, quantity, onCheckout = false, id}: CartPizzaProps){
    const [ cartQuantity, setCartQuantity ] = useState(quantity)    
    const { removePizzaFromCart } = useContext(CartContext)

    return (
        <>
            <div className={`flex items-center gap-5 sm:mx-2 py-2 sm:p-5 ${!onCheckout && 'border-t'} ${!onCheckout && 'border-t-white'}`}>
                <Image className="h-20 w-20" src={pizzaImg} alt="" height={100} width={100} />
                <div className="flex-grow flex-1">
                    <div className="flex items-center justify-between">
                        <strong className="sm:text-lg">{pizzaName}</strong>
                        <button 
                            onClick={() => removePizzaFromCart(pizzaName)}
                            className='hover:text-red-900'
                        >
                            <Trash size={24}/>
                        </button>

                    </div>
                    <div className="grid grid-cols-2 gap-y-1 mt-3">
                        <span className="font-medium text-sm sm:text-base">Preço</span>
                        <strong className="font-medium text-sm sm:text-base text-end">{formatter.format(price/100*cartQuantity)}</strong>

                        <span className="font-medium text-sm sm:text-base">Quantidade</span>
                        <Quantity onCart pizzaName={pizzaName} quantity={cartQuantity} setQuantity={setCartQuantity} size='sm'/>
                    </div>
                </div>
            </div>
            {!!onCheckout  && <Separator />}
        </>
    )
}