import Image from "next/image";

import bgImg from '../assets/lucian-alexe.png'

import { italianno } from '../fonts'

export default function Success(){
    return (
        <div className="flex items-end h-[calc(100vh-104px)]">
            <div className="flex flex-col items-center justify-center w-1/2 h-full">
                <p className="text-primary text-5xl font-bold text-center max-w-[670px] leading-normal mt-[-104px]">Parabéns Crustóvão, seu pedido foi recebido!</p>
                <p className="text-primary text-5xl font-bold text-center max-w-[709px] leading-normal">A pizzeria D'arte agradece!</p>
            </div>
            <div className="relative flex items-center justify-center w-1/2 h-screen">
                <Image className="object-cover" src={bgImg.src} alt="" fill  />
                <p className={`${italianno.className} absolute z-10 text-background text-[80px] text-center max-w-3xl leading-tight`}>Sua Pizza está sendo preparada e logo estará a caminho!</p>
            </div>
        </div>
    )
}