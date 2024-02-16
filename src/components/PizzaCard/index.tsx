'use client'

import Image from "next/image";
import { useContext, useState } from "react";

import { formatter } from "../../lib/formatter";

import { CartContext } from "@/contexts/CartContextProvider";

import { Quantity } from "../Quantity";


type PizzaCardProps = {
    id: string,
    pizzaName: string,
    price: number,
    pizzaImg: string,
}

export function PizzaCard({ pizzaName, price, pizzaImg, id }: PizzaCardProps) {
    const [ quantity, setQuantity ] = useState(0)

    const { addPizzaToCart } = useContext(CartContext)

    return (
        <div className="bg-primary flex flex-col items-center sm:max-w-[288px] md:max-w-[304px] md:w-full rounded-md text-white px-6 md:px-4 lg:px-6 py-5">
            <Image src={pizzaImg} alt="" width={240} height={240}/>
            
            <strong 
                className="font-bold text-2xl xs:text-base sm:text-2xl md:text-[22px] lg:text-2xl 2xl:text-[26px] mt-3 whitespace-nowrap truncate max-w-[240px] xs:max-w-[150px] sm:max-w-[258px] md:max-w-[220px] lg:max-w-[258px]"
            >
                {pizzaName}
            </strong>

            <div className="grid grid-cols-2 gap-y-1 mt-4">
                <span className="text-lg xs:text-sm sm:text-xl md:text-lg lg:text-xl font-medium">Preço</span>
                <strong className="text-lg xs:text-sm sm:text-xl md:text-lg lg:text-xl font-medium text-end">{formatter.format(price/100)}</strong>

                <span className="text-lg xs:text-sm xs:data-[size=xl] sm:text-xl md:text-lg lg:text-xl font-medium">Quantidade</span>
                <Quantity quantity={quantity} setQuantity={setQuantity} size='default'/>
            </div>
            <button 
                onClick={() => addPizzaToCart({pizzaName, pizzaImg, price, quantity, id})} 
                className="mt-4 py-3 w-full bg-white text-primary font-medium xs:text-sm md:text-lg rounded hover:brightness-90 active:scale-95"
            >
                Adicionar ao Carrinho
            </button>
        </div>
    )
}