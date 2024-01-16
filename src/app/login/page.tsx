'use client'

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { GoogleLogo, GithubLogo } from '@phosphor-icons/react/dist/ssr'

import bgImg from '../../assets/abbie-tanner.png'

import { italianno } from '../fonts'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Login(){
    const searchParams = useSearchParams()
    const [ callbackUrl, setCallbackUrl ] = useState('/')

    const error = searchParams.get('error')

    useEffect(() => {
        if(error === 'session error'){
            toast.error('Por favor, faça login antes de tentar atualizar sua conta.')
            setCallbackUrl('/profile/edit')
        }
        if(error === 'session error checkout'){
            toast.error('Por favor, faça login antes de realizar o checkout.')
            setCallbackUrl('/checkout')
        }
    },[])

    return (
        <div className="flex items-end h-screen">
           <div className="flex items-center h-full justify-center w-1/2">
                <div className="flex flex-col items-center justify-center mt-[-52px]">
                    <strong className="font-bold text-5xl text-primary mb-6">Login</strong>
                    <button
                        onClick={() => signIn('google', {callbackUrl})} 
                        className="hover:brightness-90 active:scale-95 w-full flex items-center gap-5 py-3 px-5 text-[28px] text-background rounded bg-primary mb-8"
                    >
                        <GoogleLogo />
                        Faça o seu login com Google 
                    </button>
                    <button 
                        onClick={() => signIn('github', {callbackUrl})} 
                        className="hover:brightness-90 active:scale-95 w-full flex items-center gap-5 py-3 px-5 text-[28px] text-background rounded bg-[#333]"
                    >
                        <GithubLogo /> 
                        Faça o seu login com Github 
                    </button>
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