'use client'

import Image from "next/image";
import { Quantity } from "./Quantity";

import { Separator } from "./Separator";

type CartPizzaProps = {
    onCheckout?: boolean
}

export function CartPizza({onCheckout = false}: CartPizzaProps){
    return (
        <>
            <div className={`flex gap-5 mx-2 p-5 ${!onCheckout && 'border-t'} ${!onCheckout && 'border-t-white'}`}>
                {/* <Image src={pizzaImg.src} alt="" height={100} width={100} /> */}
                <div>
                    <strong className="text-lg">Pizza de Queijo e Cenoura</strong>
                    <div className="grid grid-cols-2 gap-y-1 mt-3">
                        <span className="font-medium">Preço</span>
                        <strong className="font-medium text-end">32,99R$</strong>

                        <span className="font-medium">Quantidade</span>
                        <Quantity size='sm'/>
                    </div>
                </div>
            </div>
            {!!onCheckout  && <Separator />}
        </>
    )
}