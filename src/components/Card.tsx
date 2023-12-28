'use client'

import Image from "next/image";
import { useContext, useState } from "react";

import { Quantity } from "./Quantity";

import { formatter } from "../lib/formatter";
import { CartContext } from "@/contexts/CartContextProvider";

type CardProps = {
    pizzaName: string,
    price: number,
    pizzaImg: string,
}

export function Card({ pizzaName, price, pizzaImg }: CardProps) {
    const [ quantity, setQuantity ] = useState(0)

    const { addPizzaToCart } = useContext(CartContext)

    return (
        <div className="bg-primary flex flex-col items-center max-w-[304px] rounded-md text-white px-[23px] py-5">
            <Image src={pizzaImg} alt="" width={240} height={240}/>
            
            <strong className="font-bold text-[26px] mt-3 whitespace-nowrap truncate max-w-[258px]">{pizzaName}</strong>

            <div className="grid grid-cols-2 gap-y-1 mt-4">
                <span className="text-xl font-medium">Preço</span>
                <strong className="text-xl font-medium text-end">{formatter.format(price/100)}</strong>

                <span className="text-xl font-medium">Quantidade</span>
                <Quantity quantity={quantity} setQuantity={setQuantity} size='default'/>
            </div>
            <button 
                onClick={() => addPizzaToCart({pizzaName, pizzaImg, price, quantity})} 
                className="bg-white text-primary text-lg font-medium mt-4 rounded py-3 w-full hover:brightness-90 active:scale-95"
            >
                Adicionar ao Carrinho
            </button>
        </div>
    )
}