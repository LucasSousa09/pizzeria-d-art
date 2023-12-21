'use client'

import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useForm, SubmitHandler } from "react-hook-form"

import { InputBox } from "../../../components/FormInputs/InputBox";
import { Label } from "../../../components/FormInputs/Label";
import { Input } from "../../../components/FormInputs/Input";
import { CpfInput } from '../../../components/FormInputs/CpfInput';
import { PhoneInput } from '../../../components/FormInputs/PhoneInput';
import { ZipCodeInput } from '../../../components/FormInputs/ZipCodeInput';
import { TextArea } from "../../../components/FormInputs/TextArea";
import { useEffect } from 'react';

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

type UserInfoData = zod.infer<typeof UserInfoSchema>

export default function EditProfile(){
    const {
        register,
        handleSubmit,
        formState
    } = useForm<UserInfoData>({
        resolver: zodResolver(UserInfoSchema)
    })

      const onSubmit: SubmitHandler<UserInfoData> = (data) => console.log(data)
      
      useEffect(() => {
        const currentError = Object.keys(formState.errors)[0]
        const errorMessage = formState.errors[currentError as keyof UserInfoData]?.message

        toast.error(errorMessage)

      }, [formState.errors])
      
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center'>
            <ToastContainer position='bottom-right' theme='colored' />
            <div className='mt-16 grid grid-rows-4 grid-flow-col max-w-[1321px] gap-x-[60px]'>
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
                    <Input id="email" {...register("email")} />
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

                <div className="flex gap-7">
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


            <button type="submit" className="mt-32 bg-primary text-white font-bold text-2xl px-4 py-3 rounded w-fit">Salvar Alterações</button>
        </form>
    )
}