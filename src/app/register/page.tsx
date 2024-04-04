'use client'

import * as zod from 'zod';
import Link from 'next/link';
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form'
import { GoogleLogo, GithubLogo } from '@phosphor-icons/react/dist/ssr';

import { api } from '@/lib/axios';

import { Label } from "@/components/Form/Label";
import { Input } from "@/components/Form/Input";
import { InputBox } from "@/components/Form/InputBox";
import { Separator } from '@/components/Separator';
import { LoginButton } from '@/components/LoginButton';
import { SpinnerGap } from '@phosphor-icons/react';

const FormInputsSchema = zod.object({
    username: zod.string()
            .min(3, 'O nome de usuário deve ter no minímo 3 characteres')
            .max(30, 'O nome de usuário deve ter no máximo 30 characteres'),
    email: zod.string()
            .email('Email inválido'),
    password: zod.string()
                .min(6, 'A senha deve ter no minímo 6 characteres')
                .max(30, 'A senha deve ter no máximo 30 characteres')
                .regex(/[a-zA-Z]/, 'A senha deve conter uma letra')
                .regex(/\d/, "A senha deve conter pelo menos um número")
                .regex(/[!@#$%^&*(),.?":{}|\[\]<>_]/, 'A senha deve conter pelo menos um caracter especial'),
    "repeat-password": zod.string()
}).refine((data) => data.password === data['repeat-password'], {
    message: "As senhas não estão batendo",
    path: ["repeat-password"]
})

type FormInputs = zod.infer<typeof FormInputsSchema>

export default function Register(){
    const [isAwaitingResponse, setIsAwaitingResponse] = useState<string | null>(null)
    const router = useRouter()

    const { 
            register,
            formState: { errors },
            handleSubmit,
    } = useForm<FormInputs>({
        resolver: zodResolver(FormInputsSchema)
    })

    useEffect(() => {
        if(Object.keys(errors).length > 0){
            toast.error(Object.values(errors)[0].message)
        }
    },[errors])

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setIsAwaitingResponse("credentials")
        try{
            const res = await api.post('/register', {
                email: data.email,
                password: data.password,
                username: data.username, 
            })

            if(res.status === 200){
                toast.success('Usuário criado com sucesso! Faça o Login para continuar')
                router.push('/login')
            }

        }
        catch(err: any){
            if(err.response.data === "This email is already registered"){
                toast.error('Esse email já está cadastrado')
            }
            else{
                toast.error("Ocorreu um erro, Por favor tente novamente mais tarde!")
            }
        }
        setIsAwaitingResponse(null)
    }

    return (
        <div className="relative flex flex-col md:flex-row justify-center items-center xl:justify-start min-h-screen">
           
           {/* Crie uma conta */}
           <div className="flex items-center justify-center md:h-screen px-5 mt-20 md:mt-0 mb-8 md:mb-0 w-full xl:w-1/2 md:pr-6 lg:pr-16 md:border-r md:border-primary">
                <div className="flex flex-col items-center justify-center mt-8 w-full max-w-[500px]">
                    <strong className="font-bold text-3xl sm:text-4xl mb-12 text-primary">Crie uma conta</strong>
                    
                    {/*Create an account via credentials */}
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full mb-0">
                        <InputBox>
                            <Label idFor="username" text="Nome de usuário" />
                            <Input id="username" {...register('username')} />
                        </InputBox>
                        
                        <InputBox>
                            <Label idFor="email" text="Email" />
                            <Input id="email" {...register('email')} />
                        </InputBox>

                        <InputBox>
                            <Label idFor="password" text="Senha" />
                            <Input id="password" type='password' {...register('password')} />
                        </InputBox>

                        <InputBox>
                            <Label idFor="repeat-password" text="Repita sua Senha" />
                            <Input id="repeat-password" type='password' {...register('repeat-password')} />
                        </InputBox>

                        <LoginButton
                            loginProvider='credentials'
                            isAwaitingResponse={isAwaitingResponse}
                            setIsAwaitingResponse={setIsAwaitingResponse}
                        >
                            {
                                isAwaitingResponse === "credentials" ? <SpinnerGap className=' group-disabled:animate-spin' /> : "Criar conta"
                            }
                        </LoginButton>
                    </form>
                </div>
           </div> 
           {/* Já tem uma conta? */}
            <div className="flex flex-col md:h-screen justify-center items-center w-full xl:w-1/2 mb-20 md:mb-0 px-5 md:pl-5 lg:pl-16 md:border-l md:border-primary">
                <strong className="font-bold text-3xl sm:text-4xl mb-12 text-primary">Já tem uma conta?</strong>
                               
                <div className="w-full max-w-[500px]">
                    <Link href={'/login'} className="hover:opacity-75 transition-opacity ease-linear active:scale-95 w-full flex items-center justify-center gap-3 sm:gap-5 py-3 sm:py-4 px-5 text-lg sm:text-xl lg:text-2xl font-medium text-background rounded bg-primary mb-8">Faça o login</Link>

                    <div className="flex items-center mb-8">
                        <Separator backgroundColor='bg-primary'/>
                        <span className="whitespace-nowrap text-primary px-4">ou</span>
                        <Separator backgroundColor='bg-primary'/>
                    </div>


                    {/* Create an account or Login with Google */}
                    <LoginButton
                        loginProvider='google'
                        isAwaitingResponse={isAwaitingResponse}
                        setIsAwaitingResponse={setIsAwaitingResponse}
                    >   
                        {
                            isAwaitingResponse === "google" ? ( 
                                <SpinnerGap className=' group-disabled:animate-spin' /> 
                                ) : (
                                <>
                                    <GoogleLogo weight="bold"  />
                                    Continue com com Google 
                                </>
                            )
                        }
                    </LoginButton>

                    <LoginButton
                        loginProvider='github'
                        color='[#333]'
                        isAwaitingResponse={isAwaitingResponse}
                        setIsAwaitingResponse={setIsAwaitingResponse}
                    >
                        {
                            isAwaitingResponse === "github" ? (
                                <SpinnerGap className=' group-disabled:animate-spin' />
                            ): (
                                <>
                                    <GithubLogo  weight="bold" /> 
                                    Continue com com Github 
                                </>
                            ) 
                        }
                    </LoginButton>

                </div>
            </div>
        </div>
    )
}