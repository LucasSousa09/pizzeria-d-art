'use client'

import * as zod from 'zod'
import Image from "next/image";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from 'react-hook-form'
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleLogo, GithubLogo } from '@phosphor-icons/react/dist/ssr';

import { Label } from "@/components/Form/Label";
import { Input } from "@/components/Form/Input";
import { InputBox } from "@/components/Form/InputBox";
import { Separator } from '@/components/Separator';
import Link from 'next/link';
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';

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
        }
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

                        <button className="hover:opacity-75 transition-opacity ease-linear active:scale-95 w-full flex items-center justify-center gap-3 sm:gap-5 py-3 sm:py-4 px-5 text-lg sm:text-xl lg:text-2xl font-bold text-background rounded bg-primary mb-8">Criar conta</button>
                    </form>
                </div>
           </div> 
           {/* Já tem uma conta? */}
            <div className="flex flex-col md:h-screen justify-center items-center w-full xl:w-1/2 mb-20 md:mb-0 px-5 md:pl-5 lg:pl-16 md:border-l md:border-primary">
                <strong className="font-bold text-3xl sm:text-4xl mb-12 text-primary">Já tem uma conta?</strong>
                               
                <div className="w-full max-w-[500px]">
                    <Link href={'/login'} className="hover:opacity-75 transition-opacity ease-linear active:scale-95 w-full flex items-center justify-center gap-3 sm:gap-5 py-3 sm:py-4 px-5 text-lg sm:text-xl lg:text-2xl font-bold text-background rounded bg-primary mb-8">Faça o login</Link>

                    <div className="flex items-center mb-8">
                        <Separator backgroundColor='bg-primary'/>
                        <span className="whitespace-nowrap text-primary px-4">ou</span>
                        <Separator backgroundColor='bg-primary'/>
                    </div>


                    {/* Create an account or Login with Google */}
                    <button
                        onClick={() => signIn('google', {callbackUrl: '/'})} 
                        className="hover:opacity-75 transition-opacity ease-linear active:scale-95 w-full flex justify-center items-center gap-3 sm:gap-5 py-3 sm:py-6 px-5 text-lg sm:text-xl lg:text-2xl sm:leading-none font-medium text-background rounded bg-primary mb-8"
                    >
                        <GoogleLogo weight='bold' />
                        Continue com Google 
                    </button>
                    <button 
                        onClick={() => signIn('github', {callbackUrl: '/'})} 
                        className="hover:opacity-75 transition-opacity ease-linear active:scale-95 w-full flex justify-center items-center gap-3 sm:gap-5 py-3 sm:py-6 px-5 text-lg sm:text-xl lg:text-2xl sm:leading-none font-medium text-background rounded bg-[#333]"
                    >
                        <GithubLogo weight="bold" />
                        Continue com Github 
                    </button>

                </div>
            </div>

           {/* Page description Text */}
           {/* <div className="absolute right-0 top-[-100px] bottom-0 z-50  hidden w-1/2 xl:flex items-center justify-center">
            <div className="absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2 w-11/12 text-center z-10 2xl:max-w-[543px]">
                <span className={`text-background block w-full text-7xl mb-12 ${italianno.className}`}>Para desfrutar das melhores pizzas do mundo!</span>
                <strong className="leading-normal font-semibold text-background text-5xl mt-32">Crie uma conta ou faça login</strong>
            </div>
            <Image className="object-cover" src={bgImg.src} alt="" fill  />
           </div>  */}
        </div>
    )
}