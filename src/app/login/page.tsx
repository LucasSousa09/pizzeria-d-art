import Image from "next/image";

import { GoogleLogo, GithubLogo } from '@phosphor-icons/react/dist/ssr'

import bgImg from '../assets/abbie-tanner.png'

import { italianno } from '../fonts'

export default function Login(){
    return (
        <div className="flex items-end h-[calc(100vh-104px)]">
           <div className="flex items-center h-full justify-center w-1/2">
                <div className="flex flex-col items-center justify-center mt-[-52px]">
                    <strong className="font-bold text-5xl text-primary mb-6">Login</strong>
                    <button className="w-full flex items-center gap-5 py-3 px-5 text-[28px] text-background rounded bg-primary mb-8"><GoogleLogo /> Faça o seu login com Google </button>
                    <button className="w-full flex items-center gap-5 py-3 px-5 text-[28px] text-background rounded bg-[#333]"><GithubLogo /> Faça o seu login com Github </button>
                </div>
           </div> 
           
           <div className="relative h-screen w-1/2 flex items-center justify-center">
            <div className="absolute flex flex-col w-1/2 text-center z-10 mt-[-271px]">
                <span className={`text-background text-7xl ${italianno.className} w-[546px]`}>Para desfrutar das melhores pizzas do mundo!</span>
                <strong className="leading-normal font-semibold text-background text-5xl mt-32">Faça o seu Login ou crie uma conta</strong>
            </div>
            <Image src={bgImg.src} alt="" fill  />
           </div> 
        </div>
    )
}