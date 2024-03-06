'use client'

import * as zod from 'zod'
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowClockwise } from '@phosphor-icons/react'
import { useForm, SubmitHandler } from "react-hook-form"

import { api } from '../../lib/axios';

import { Label } from "./Label";
import { Input } from "./Input";
import { InputBox } from "./InputBox";
import { TextArea } from "./TextArea";
import { InputZipCode } from './InputZipCode';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const AddressSchema = zod.object({
    id: zod.string().optional(),
    street: zod.string()
                .min(3, 'A Rua deve conter pelo menos 3 letras'),
    district: zod.string()
                .min(3, 'O Bairro deve conter pelo menos 3 letras'),
    zipCode: zod.string()
                .min(9, 'O CEP deve conter no minímo 8 digitos')
                .max(9, 'O CEP deve conter no máximo 8 digitos')
                .regex(/^[0-9]{5}\-[0-9]{3}$/, 'O CEP está incompleto'),
    houseNumber: zod.number()
                .nonnegative('O número não deve ser negativo'),
    complement: zod.string().optional(),
    city: zod.string()
                .min(3, 'A Cidade deve conter pelo menos 3 letras'),
    state: zod.string()
                .min(2, 'A UF deve conter pelo menos 2 letras')
                .max(2, 'A UF deve conter no máximo 2 letras'),
    reference: zod.string(),
    mainAddress: zod.boolean()  
})

export type AddressData = zod.infer<typeof AddressSchema>

export function FormAddress(props: AddressData){
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    const error = searchParams.get('error')

    const [isSendingProfileUpdates, setIsSendingProfileUpdates] = useState(false)

    const {
        register,
        handleSubmit,
        formState,
    } = useForm<AddressData>({
        resolver: zodResolver(AddressSchema),
        defaultValues: {
            street: props.street,
            district: props.district,
            zipCode: props.zipCode,
            houseNumber: props.houseNumber,
            complement: props.complement,
            city: props.city,
            state: props.state,
            reference: props.reference,
            mainAddress: false
        }
    })

    useEffect(() => {
        const currentError = Object.keys(formState.errors)[0]
        const errorMessage = formState.errors[currentError as keyof AddressData]?.message

        toast.error(errorMessage)

    }, [formState.errors])

    useEffect(() => {
        if(error === 'missing address' && props.id === ""){
            toast.error('Por favor, adicione um endereço antes de realizar sua compra')
        }
    },[])

    const onSubmit: SubmitHandler<AddressData> = async (addressData) => {
        // Disable submit button
        setIsSendingProfileUpdates(true)
 
        let status

        if(pathname === "/profile/add-address"){
            const res = await api.post('/create-new-address', {...addressData, mainAddress: false})

            status = res.status
        }

        else {
            const res = await api.patch('/update-address', {
                street: addressData.street,
                district: addressData.district,
                complement: addressData.complement,
                zipCode: addressData.zipCode,
                houseNumber: addressData.houseNumber,
                city: addressData.city,
                state: addressData.state,
                reference: addressData.reference,
                id: props.id
            })

            status = res.status
        }

        if(status === 200){
            toast.success('Sucesso')
            setTimeout(() => setIsSendingProfileUpdates(false),3000)
            router.replace('/profile')
        }

        else{
            toast.error('Deu ruim, por favor tente novamente mais tarde')
            setTimeout(() => setIsSendingProfileUpdates(false),3000)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-end mb-0 mt-6 px-3 sm:px-0 xl:mt-0'>
            <div className='xl:grid xl:grid-rows-4 md:grid-cols-2  grid-rows-4 grid-flow-col max-w-[861px] gap-x-[60px]'>
                <InputBox>
                    <Label idFor="street" text="Rua" />
                    <Input id="street" {...register("street")} />
                </InputBox>

                <InputBox>
                    <Label idFor="district" text="Bairro" />
                    <Input id="district" {...register("district")} />
                </InputBox>

                <InputBox>
                    <Label idFor="zipCode" text="Cep" />
                    <InputZipCode id="zipCode" {...register("zipCode")}/> 
                </InputBox>

                <div className="flex  gap-7">
                    <InputBox size="sm">
                        <Label idFor="houseNumber" text="Número" />
                        <Input id="houseNumber" type="number" {...register("houseNumber", { valueAsNumber: true })} />
                    </InputBox>

                    <InputBox>
                        <Label idFor="complement" text="Complemento" />
                        <Input id="complement" {...register("complement")} />
                    </InputBox>
                </div>

                <InputBox>
                    <Label idFor="city" text="Cidade" />
                    <Input id="city" {...register("city")} />
                </InputBox>

                <InputBox size="xs">
                    <Label idFor="state" text="UF" />
                    <Input id="state" {...register("state")} />
                </InputBox>

                <InputBox rowSpan>
                    <Label idFor="reference" text="Ponto de referêcia" />
                    <TextArea id="reference" {...register("reference")} />
                </InputBox>
            </div>


            {
                pathname === "/profile/add-address" ? (
                    <button
                        type="submit"
                        disabled={isSendingProfileUpdates} 
                        className={
                            "bg-primary text-white font-bold text-base sm:text-lg xl:text-xl mb-6 md:mb-12 xl:mb-0 px-4 py-3 rounded w-fit " +
                            "disabled:brightness-75 disabled:cursor-not-allowed hover:brightness-90 active:scale-95 "
                        }
                    >
                        {
                            isSendingProfileUpdates ? (
                                <ArrowClockwise className="animate-spin" height={30} width={30} weight="bold" />
                            ) : (
                                'Adicionar endereço'
                            )
                        }                        
                    </button>
                ) : (
                    <button 
                        type="submit"
                        disabled={isSendingProfileUpdates} 
                        className={
                            "bg-primary text-white font-bold text-base sm:text-lg xl:text-xl mb-6 md:mb-12 xl:mb-0 px-4 py-3 rounded w-fit " +
                            "disabled:brightness-75 disabled:cursor-not-allowed hover:brightness-90 active:scale-95 "
                        }
                    >
                        {
                            isSendingProfileUpdates ? (
                                <ArrowClockwise className="animate-spin" height={30} width={30} weight="bold" />
                            ) : (
                                'Editar endereço'
                            )
                        }
                    </button>
                )
            }
        </form>
    )
}