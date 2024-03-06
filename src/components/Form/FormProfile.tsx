'use client'

import * as zod from 'zod'
import { toast } from 'react-toastify'
import { useEffect, useState, } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler} from 'react-hook-form'
import { Eye, EyeClosed, Pencil, UserCircle } from '@phosphor-icons/react'

import { InputCpf } from './InputCpf'
import { InputPhone } from './InputPhone'
import { useRouter, useSearchParams } from 'next/navigation'
import { api } from '@/lib/axios'

type FormProfileProps = {
    profileData: {
        email: string,
        username: string,
        cpf: string | null,
        avatar: string | null,
        phone: string | null,
        mainAddress: string | null
    },
    addressIdStreetAndNumber: {
        id: string | undefined;
        street: string;
        houseNumber: number;
    }[]
}

const ProfileSchema = zod.object({
    username: zod.string()
            .min(4, 'O Nome de usuário deve conter no minímo 4 digitos')
            .max(30, 'O Nome de usuário deve conter no máximo 30 digitos'),
    email: zod.string().email(),
    cpf: zod.string()
            .min(14, 'O CPF deve conter no minímo 11 digitos')
            .max(14, 'O CPF deve conter no máximo 11 digitos')
            .regex(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/, 'O CPF está incompleto'),
    phone: zod.string()
            .min(14, 'O Telefone deve conter no minímo 11 digitos')
            .max(14, 'O Telefone deve conter no máximo 11 digitos')
            .regex(/^\([0-9][0-9]\)[0-9]{5}\-[0-9]{4}$/, 'O Telefone está incompleto'),
    mainAddress: zod.string()
})

type ProfileData = zod.infer<typeof ProfileSchema>

export function FormProfile({
    profileData,
    addressIdStreetAndNumber
}: FormProfileProps){
    const router = useRouter()
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    const { username, avatar, cpf, email, phone, mainAddress  } = profileData

    const { 
        register,
        handleSubmit,
        formState
     } = useForm<ProfileData>({
        defaultValues: {
            username: username,
            email: email,
            cpf: cpf || '',
            phone: phone || ''
        },
        resolver: zodResolver(ProfileSchema)
     })

     const [ showCPF, setShowCFP ] = useState(false)
     const [ editingProfile, setEditingProfile ] = useState(false)

     useEffect(() => {
        const currentError = Object.keys(formState.errors)[0]
        const errorMessage = formState.errors[currentError as keyof ProfileData]?.message

        toast.error(errorMessage)
     },[formState.errors])

     useEffect(() => {
        if(error === 'missing phone' && phone === null)
        toast.error('Por favor adicione um telefone de contato antes de prosseguir')
     },[])

     const onSubmit: SubmitHandler<ProfileData> = async (data) => {
        if(
            data.username === username &&
            data.cpf === cpf &&
            data.mainAddress === mainAddress &&
            data.phone === phone
        ){
            toast.error('Faça alguma alteração antes de enviar o formulário')
            return
        }

        // If user changes mainAddress update the Address table
        if(mainAddress !== data.mainAddress){
            await api.patch('/update-main-address', {mainAddress: data.mainAddress})
        }
        
        try{
            await api.patch('/update-profile', data)

            toast.success('Sucesso ao atualizar o formulário')
        }
        catch(err: any){
            if(err.response.data === "This CPF is already registered"){
                toast.error('Esse CPF já foi registrado. Em caso de fraude contate o Atendimento ao Cliente')
            }

        }

        setEditingProfile(false)
        
        router.refresh()
     }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative bg-primary text-white flex flex-col p-8 sm:p-12 rounded-lg h-fit min-w-[340px] max-w-[400px]"
        >

            <header className="flex gap-3 mb-6">
                {/* Avatar Image */}
                {
                    avatar ? (
                        <img src={avatar} alt="" className="h-12 w-12 rounded-full" />
                    ) : (
                        <UserCircle weight="bold" className="h-12 w-12" />
                    )
                }

                {/* Edit Button */}
                <button 
                    type="button"
                    onClick={() => {
                        setEditingProfile(state => !state)
                    }} 
                    className="peer absolute top-8 right-8  sm:top-12 sm:right-12"
                >
                    <Pencil weight='bold' className="h-5 w-5" />
                </button>

                {/* Button tooltip     */}
                <span className="absolute top-20 right-0 bg-slate-600 text-white px-2 text-center rounded z-10 hidden sm:peer-hover:flex" >
                    {!editingProfile ? 'Edite seu perfil' : 'Cancelar edição'}
                </span>

                {/* Username Input */}
                <div className="flex flex-col justify-between">
                    <input
                        disabled={!editingProfile}
                        type="text" 
                        className={
                            `${editingProfile && "block p-2 text-primary w-40 bg-background rounded h-12 focus:outline-primary "} ` +
                            `${!editingProfile && "bg-primary text-white font-medium text-lg w-40"}`
                        }
                        {...register('username')}
                    />

                    <span className="text-xs">
                        Cliente da pizzeria d'art
                    </span>
                </div>
            </header>

            {/* Email */}
            <>
                <strong className="text-base font-medium leading-relaxed">
                    Email
                </strong>
                <span className="bg-primary text-white text-xs mb-3">
                    {email}
                </span>
            </>

            {/* Cpf Input */}
            <div className="relative flex flex-col">
                <strong className="text-base font-medium leading-relaxed">
                    CPF
                </strong>

                {
                    !editingProfile ? (
                        <>
                            <button
                                onClick={() => setShowCFP(state => !state)} 
                                type="button" 
                                className="absolute bottom-3 left-32"
                            >
                                {
                                    showCPF ? (
                                        <Eye />
                                    ) : (
                                        <EyeClosed />
                                    )
                                }
                            </button>
                            
                            <input
                                disabled
                                type={showCPF ? 'text' : 'password'} 
                                id="cpf" 
                                className="bg-primary text-white text-xs mb-3 w-28"
                                {...register("cpf")}
                            />
                        </>
                    ) : (
                        <InputCpf id="cpf" {...register("cpf")} />
                    )
                }
            </div>

            {/* Phone Input */}
            <>
                <strong className="text-base font-medium leading-relaxed">
                    Telefone
                </strong>
                {
                    !editingProfile ? (
                        <span className="bg-primary text-white text-xs w-28">
                            {phone}
                        </span>
                    ) : (
                        <InputPhone id="phone" {...register("phone")}/>
                        )
                }
            </>

            {/* Main Address */}
            {
                mainAddress === null ? null : (
                    <>
                        <strong
                            className="text-base font-medium mt-3 leading-relaxed"
                        >
                            Endereço Principal
                        </strong>
                        {
                            !editingProfile ? (
                                <span className="text-xs">
                                    {mainAddress}
                                </span>
                            ) : (
                                <select
                                    id="mainAddress"
                                    className="block p-2 text-primary w-full bg-background border border-primary rounded h-12 focus:outline-primary"
                                    {...register('mainAddress')}
                                >
                                    <option value="0" disabled>Selecione o endereço principal</option>
                                    {addressIdStreetAndNumber.map(address => {
                                        return (
                                            <option key={address.id} value={`${address.street + '; nº:' + address.houseNumber}`}>
                                                {address.street}; nº:{address.houseNumber}
                                            </option>
                                        )
                                    })}
                                </select>
                            )

                        }
                         

                    </>
                )
            }

            {/* Submit Button */}
            {
                editingProfile ? (
                    <button
                        type="submit"
                        className="mt-4 py-2 rounded bg-white text-primary hover:opacity-80"
                    >
                        Salvar alterações
                    </button>
                ) : null
            }
        </form>
    )
}