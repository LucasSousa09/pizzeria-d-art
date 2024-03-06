'use client'

import * as zod from 'zod'
import Image from "next/image";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from 'react-hook-form'
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleLogo, GithubLogo } from '@phosphor-icons/react/dist/ssr';

import bgImg from '../../assets/abbie-tanner.png';

import { italianno } from '../fonts';

import { Label } from "@/components/Form/Label";
import { Input } from "@/components/Form/Input";
import { InputBox } from "@/components/Form/InputBox";
import { Separator } from '@/components/Separator';
import Link from 'next/link';

const FormInputsSchema = zod.object({
    email: zod.string()
            .email('Email inválido'),
    password: zod.string()
                .min(6, 'A senha deve ter no minímo 6 characteres')
                .max(30, 'A senha deve ter no máximo 30 characteres')
                .regex(/[a-zA-Z]/, 'A senha deve conter uma letra')
                .regex(/\d/, "A senha deve conter pelo menos um número")
                .regex(/[!@#$%^&*(),.?":{}|\[\]<>_]/, 'A senha deve conter pelo menos um caracter especial')
})

type FormInputs = zod.infer<typeof FormInputsSchema>

export default function Login(){
    const router = useRouter()
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    const [ callbackUrl, setCallbackUrl ] = useState('/')
    const [awaitingResponse, setAwaitingResponse] = useState(false)

    const { 
            register,
            formState: { errors },
            handleSubmit,
    } = useForm<FormInputs>({
        resolver: zodResolver(FormInputsSchema)
    })

    useEffect(() => {
        if(error === 'session error'){
            toast.error('Por favor, faça login antes de tentar atualizar sua conta.')
            setCallbackUrl('/profile')
        }
        if(error === 'session error checkout'){
            toast.error('Por favor, faça login antes de realizar o checkout.')
            setCallbackUrl('/checkout')
        }
    },[])

    useEffect(() => {
        if(Object.keys(errors).length > 0){
            toast.error(Object.values(errors)[0].message)
        }
    },[errors])

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
            setAwaitingResponse(true)

            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            })

            if(res?.status === 401){
                toast.error('Senha ou email incorretos')
            }
            
            if(res?.status === 200){
                toast.success('Login realizado com sucesso!')
                router.push('/')
            }

            setAwaitingResponse(false)
    }

    return (
        <div className="relative flex items-center justify-center xl:justify-start mt-12 min-h-screen">
           <div className="flex items-center justify-center h-full px-5 xl:w-1/2">
                <div className="flex flex-col items-center justify-center mt-[-52px]">
                    <strong className="font-bold text-3xl md:text-4xl lg:text-5xl text-primary mb-6 sm:mb-8 md:mb-12 ">Login</strong>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  w-full mb-0">
                        <InputBox>
                            <Label idFor="email" text="Email" />
                            <Input id="email" {...register('email')} />
                        </InputBox>

                        <InputBox>
                            <Label idFor="password" text="Senha" />
                            <Input id="password" type='password' {...register('password')} />
                        </InputBox>

                        <button 
                            disabled={awaitingResponse}
                            className="disabled:brightness-75 disabled:cursor-not-allowed hover:opacity-75 transition-opacity ease-linear active:scale-95 mt-8 w-full flex items-center justify-center gap-3 sm:gap-5 py-3 sm:py-4 px-5 text-lg sm:text-2xl font-bold text-background rounded bg-primary mb-8">
                                Entrar
                            </button>
                    </form>

                    <div className="flex w-full items-center mb-8">
                        <Separator backgroundColor='bg-primary'/>
                        <Link href="/register" className="text-primary whitespace-nowrap px-2 hover:underline">ou Crie uma conta</Link> 
                        <Separator backgroundColor='bg-primary' />
                    </div>
                    
                    <button
                        onClick={() => signIn('google', {callbackUrl})} 
                        className="hover:opacity-75 transition-opacity ease-linear active:scale-95 w-full flex items-center gap-3 sm:gap-5 py-3 sm:py-6 px-5 text-lg sm:text-2xl sm:leading-none font-medium text-background rounded bg-primary mb-8"
                    >
                        <GoogleLogo weight="bold"  />
                        Faça o seu login com Google 
                    </button>
                    <button 
                        onClick={() => signIn('github', {callbackUrl})} 
                        className="hover:opacity-75 transition-opacity ease-linear active:scale-95 w-full flex items-center gap-3 sm:gap-5 py-3 sm:py-6 px-5 text-lg sm:text-2xl sm:leading-none font-medium text-background rounded bg-[#333]"
                    >
                        <GithubLogo  weight="bold" /> 
                        Faça o seu login com Github 
                    </button>
                </div>
           </div> 
           
           <div className="absolute right-0 top-[-100px] bottom-0 z-50  hidden w-1/2 xl:flex items-center justify-center">
            <div className="absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2 w-11/12 text-center z-10 2xl:max-w-[543px]">
                <span className={`text-background block w-full text-7xl mb-12 ${italianno.className}`}>Para desfrutar das melhores pizzas do mundo!</span>
                <strong className="leading-normal font-semibold text-background text-5xl mt-32">Faça o seu Login ou crie uma conta</strong>
            </div>
            <Image className="object-cover" src={bgImg.src} alt="" fill  />
           </div> 
        </div>
    )
}