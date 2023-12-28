'use client'

import Image from "next/image";
import { useContext, useState } from "react";
import { Trash } from '@phosphor-icons/react'

import { formatter } from "@/lib/formatter";

import { Quantity } from "./Quantity";
import { Separator } from "./Separator";
import { CartContext } from "@/contexts/CartContextProvider";


type CartPizzaProps = {
    onCheckout?: boolean,
    pizzaImg: string,
    pizzaName: string,
    price: number,
    quantity: number
}

export function CartPizza({ pizzaImg, pizzaName, price, quantity, onCheckout = false}: CartPizzaProps){
    const [ cartQuantity, setCartQuantity ] = useState(quantity)    
    const { removePizzaFromCart } = useContext(CartContext)

    return (
        <>
            <div className={`flex gap-5 mx-2 p-5 ${!onCheckout && 'border-t'} ${!onCheckout && 'border-t-white'}`}>
                <Image src={pizzaImg} alt="" height={100} width={100} />
                <div className="flex-grow flex-1">
                    <div className="flex items-center justify-between">
                        <strong className="text-lg ">{pizzaName}</strong>
                        <button 
                            onClick={() => removePizzaFromCart(pizzaName)}
                            className='hover:text-red-900'
                        >
                            <Trash size={24}/>
                        </button>

                    </div>
                    <div className="grid grid-cols-2 gap-y-1 mt-3">
                        <span className="font-medium">Preço</span>
                        <strong className="font-medium text-end">{formatter.format(price/100*cartQuantity)}</strong>

                        <span className="font-medium">Quantidade</span>
                        <Quantity pizzaName={pizzaName} quantity={cartQuantity} setQuantity={setCartQuantity} size='sm'/>
                    </div>
                </div>
            </div>
            {!!onCheckout  && <Separator />}
        </>
    )
}