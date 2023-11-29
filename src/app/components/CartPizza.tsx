'use client'

import Image from "next/image";
import { Quantity } from "./Quantity";

import pizzaImg from '../assets/Pizza_7.png'

export function CartPizza(){
    return (
        <div className="flex gap-5 mx-2 p-5 border-t-white border-t">
            <Image src={pizzaImg.src} alt="" height={100} width={100} />
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
    )
}