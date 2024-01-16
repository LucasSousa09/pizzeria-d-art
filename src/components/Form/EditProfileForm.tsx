'use client'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"

import { toast } from 'react-toastify';

import { api } from '../../lib/axios';

import { InputBox } from "./InputBox";
import { Label } from "./Label";
import { Input } from "./Input";
import { CpfInput } from './CpfInput';
import { PhoneInput } from './PhoneInput';
import { ZipCodeInput } from './ZipCodeInput';
import { TextArea } from "./TextArea";

import type { ProfileDataProps } from '../../app/profile/edit/page'
import { ArrowClockwise } from '@phosphor-icons/react';

const UserInfoSchema = zod.object({
    name: zod.string()
            .min(3, 'O Nome deve conter pelo menos 3 letras'),
    cpf: zod.string()
            .min(14, 'O CPF deve conter no minímo 11 digitos')
            .max(14, 'O CPF deve conter no máximo 11 digitos')
            .regex(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/, 'O CPF está incompleto'),
    phone: zod.string()
            .min(14, 'O Telefone deve conter no minímo 11 digitos')
            .max(14, 'O Telefone deve conter no máximo 11 digitos')
            .regex(/^\([0-9][0-9]\)[0-9]{5}\-[0-9]{4}$/, 'O Telefone está incompleto'),
    email: zod.string()
            .email('Por favor digite um email válido'),
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
    complement: zod.string(),
    city: zod.string()
                .min(3, 'A Cidade deve conter pelo menos 3 letras'),
    state: zod.string()
                .min(2, 'A UF deve conter pelo menos 2 letras')
                .max(2, 'A UF deve conter no máximo 2 letras'),
    reference: zod.string(),     
})

export type UserInfoData = {
    name: string | undefined;
    cpf: string | undefined;
    phone: string | undefined;
    email: string | undefined;
    street: string | undefined;
    district: string | undefined;
    zipCode: string | undefined;
    houseNumber: number | undefined;
    complement: string | undefined;
    city: string | undefined;
    state: string | undefined;
    reference: string | undefined;
}

type FormProps = {
    profileData?: ProfileDataProps
}

export function EditProfileForm({profileData}: FormProps){
    const [isSendingProfileUpdates, setIsSendingProfileUpdates] = useState(false)

    const {
        register,
        handleSubmit,
        formState,
    } = useForm<UserInfoData>({
        resolver: zodResolver(UserInfoSchema),
        defaultValues: {
            name: profileData?.username,
            cpf: profileData?.cpf || '',
            phone: profileData?.phone || '',
            email: profileData?.email,
            street: profileData?.street || '',
            district: profileData?.district || '',
            zipCode: profileData?.zipCode || '',
            houseNumber: profileData?.houseNumber || undefined,
            complement: profileData?.complement || '',
            city: profileData?.city || '',
            state: profileData?.state || '',
            reference: profileData?.reference || '',
        }
    })

    const onSubmit: SubmitHandler<UserInfoData> = async (updateProfileInfo) => {
        setIsSendingProfileUpdates(true)
        if(
            updateProfileInfo.name === profileData?.username &&
            updateProfileInfo.cpf === profileData?.cpf &&
            updateProfileInfo.phone === profileData?.phone &&
            updateProfileInfo.street === profileData?.street &&
            updateProfileInfo.district === profileData?.district &&
            updateProfileInfo.zipCode === profileData?.zipCode &&
            updateProfileInfo.houseNumber === profileData?.houseNumber &&
            updateProfileInfo.complement === profileData?.complement &&
            updateProfileInfo.city === profileData?.city &&
            updateProfileInfo.state === profileData?.state &&
            updateProfileInfo.reference === profileData?.reference
        ){
            setIsSendingProfileUpdates(false)
            return toast.error('Faça alguma alteração antes de atualizar suas informações')
        }

        if(updateProfileInfo.name === profileData?.username){
            updateProfileInfo.name = undefined
        }
        if(updateProfileInfo.cpf === profileData?.cpf){
            updateProfileInfo.cpf = undefined
        }
        if(updateProfileInfo.phone === profileData?.phone){
            updateProfileInfo.phone = undefined
        }
        if(updateProfileInfo.street === profileData?.street){
            updateProfileInfo.street = undefined
        }
        if(updateProfileInfo.district === profileData?.district){
            updateProfileInfo.district = undefined
        }
        if(updateProfileInfo.zipCode === profileData?.zipCode){
            updateProfileInfo.zipCode = undefined
        }
        if(updateProfileInfo.houseNumber === profileData?.houseNumber){
            updateProfileInfo.houseNumber = undefined
        }
        if(updateProfileInfo.complement === profileData?.complement){
            updateProfileInfo.complement = undefined
        }
        if(updateProfileInfo.city === profileData?.city){
            updateProfileInfo.city = undefined
        }
        if(updateProfileInfo.state === profileData?.state){
            updateProfileInfo.state = undefined
        }
        if(updateProfileInfo.reference === profileData?.reference){
            updateProfileInfo.reference = undefined
        }

        const { data } = await api.post('/update-profile', updateProfileInfo)
        

        if(data.message){
            toast.success(data.message)
            setTimeout(() => setIsSendingProfileUpdates(false),3000)            
        }

        else{
            toast.error(data.error.meta.cause)
            setTimeout(() => setIsSendingProfileUpdates(false),3000)
        }
    }
      
    useEffect(() => {
        const currentError = Object.keys(formState.errors)[0]
        const errorMessage = formState.errors[currentError as keyof UserInfoData]?.message

        toast.error(errorMessage)

    }, [formState.errors])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center'>
            <div className='md:mt-16 md:grid md:grid-rows-6 lg:grid-rows-4 md:grid-cols-2 lg:grid-cols-3 grid-rows-4 grid-flow-col max-w-[1321px] gap-x-[60px]'>
                <InputBox>
                    <Label idFor="name" text="Nome" />
                    <Input  id="name" {...register("name")} />
                </InputBox>

                <InputBox>
                    <Label idFor="cpf" text="Cpf" />
                    <CpfInput id="cpf" {...register("cpf")} />
                </InputBox>

                <InputBox>
                    <Label idFor="phone" text="Telefone" />
                    <PhoneInput id="phone" {...register("phone")} />
                </InputBox>

                <InputBox>
                    <Label idFor="email" text="Email" />
                    <Input id="email" disabled {...register("email")} />
                </InputBox>

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
                    <ZipCodeInput id="zipCode" {...register("zipCode")}/> 
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


            <button 
                type="submit"
                disabled={isSendingProfileUpdates} 
                className="disabled:brightness-75 disabled:cursor-not-allowed hover:brightness-90 active:scale-95 mt-12 lg:mt-32 mb-6 lg:mb-0 bg-primary text-white font-bold text-2xl px-4 py-3 rounded w-fit"
            >
                {
                    isSendingProfileUpdates ? (
                        <ArrowClockwise className="animate-spin" height={30} width={30} weight="bold" />
                    ) : (
                        'Salvar Alterações'
                    )
                }
            </button>
        </form>
    )
}