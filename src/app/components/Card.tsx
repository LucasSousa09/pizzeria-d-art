import Image from "next/image";
import { Quantity } from "./Quantity";

import pizzaImg from '../assets/Pizza_7.png'

export function Card() {
    return (
        <div className="bg-primary flex flex-col items-center max-w-[304px] rounded-md text-white px-[23px] py-5">
            <Image src={pizzaImg.src} alt="" width={240} height={240}/>
            
            <strong className="font-bold text-[28px] mt-3">Pizza de cenouras</strong>

            <div className="grid grid-cols-2 gap-y-1 mt-4">
                <span className="text-xl font-medium">Preço</span>
                <strong className="text-xl font-medium text-end">32,99R$</strong>

                <span className="text-xl font-medium">Quantidade</span>
                <Quantity size='default'/>
            </div>
            <button className="bg-white text-primary text-lg font-medium mt-4 rounded py-3 w-full">Adicionar ao Carrinho</button>
        </div>
    )
}