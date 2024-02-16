'use client'

import Image from "next/image";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GoogleLogo, GithubLogo } from '@phosphor-icons/react/dist/ssr';

import bgImg from '../../assets/abbie-tanner.png';

import { italianno } from '../fonts';

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
        <div className="flex items-end justify-center h-screen">
           <div className="flex items-center justify-center h-full px-5 xl:w-1/2">
                <div className="flex flex-col items-center justify-center mt-[-52px]">
                    <strong className="font-bold text-5xl text-primary mb-12 ">Login</strong>
                    <button
                        onClick={() => signIn('google', {callbackUrl})} 
                        className="hover:brightness-90 active:scale-95 w-full flex items-center gap-3 sm:gap-5 py-3 sm:py-6 px-5 text-lg sm:text-[28px] text-background rounded bg-primary mb-8"
                    >
                        <GoogleLogo />
                        Faça o seu login com Google 
                    </button>
                    <button 
                        onClick={() => signIn('github', {callbackUrl})} 
                        className="hover:brightness-90 active:scale-95 w-full flex items-center gap-3 sm:gap-5 py-3 sm:py-6 px-5 text-lg sm:text-[28px] text-background rounded bg-[#333]"
                    >
                        <GithubLogo /> 
                        Faça o seu login com Github 
                    </button>
                </div>
           </div> 
           
           <div className="relative hidden h-screen w-1/2 xl:flex items-center justify-center">
            <div className="absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2 w-11/12 text-center z-10 2xl:max-w-[543px]">
                <span className={`text-background block w-full text-7xl mb-12 ${italianno.className}`}>Para desfrutar das melhores pizzas do mundo!</span>
                <strong className="leading-normal font-semibold text-background text-5xl mt-32">Faça o seu Login ou crie uma conta</strong>
            </div>
            <Image src={bgImg.src} alt="" fill  />
           </div> 
        </div>
    )
}