'use client'

import Image from "next/image";
import { useContext, useEffect } from "react";

import { CartContext } from "@/contexts/CartContextProvider";

import bgImg from '../../assets/lucian-alexe.png'

import { italianno } from '../fonts'

export default function Success(){
    const { clearCart } = useContext(CartContext)

    useEffect(() => {
        clearCart()
    },[])

    return (
        <div className="flex items-end h-screen">
            <div className="flex flex-col items-center justify-center w-1/2 h-full">
                <p className="text-primary text-5xl font-bold text-center max-w-[670px] leading-normal mt-[-104px]">Parabéns Crustóvão, seu pedido foi recebido!</p>
                <p className="text-primary text-5xl font-bold text-center max-w-[709px] leading-normal">A pizzeria D'arte agradece!</p>
            </div>
            <div className="relative flex items-center justify-center w-1/2 h-screen">
                <Image className="object-cover brightness-75" src={bgImg.src} alt="" fill  />
                <p className={`${italianno.className} absolute z-10 text-white text-[80px] text-center max-w-3xl leading-tight`}>Sua Pizza está sendo preparada e logo estará a caminho!</p>
            </div>
        </div>
    )
}