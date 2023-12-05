'use client'

import { useForm, SubmitHandler } from "react-hook-form"

import { Input } from "@/app/components/Input";
import { InputBox } from "@/app/components/InputBox";
import { Label } from "@/app/components/Label";
import { TextArea } from "@/app/components/TextArea";

type FormProps = {
    name: string,
    cpf: string,
    phone: string,
    email: string,
    street: string,
    district: string,
    cep: string,
    number: string,
    complement: string,
    city: string,
    uf: string,
    reference: string,
}

export default function EditProfile(){
    const {
        register,
        handleSubmit,
    } = useForm<FormProps>()

      const onSubmit: SubmitHandler<FormProps> = (data) => console.log(data)
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-32'>
            <div className='mt-7 grid grid-rows-4 grid-flow-col max-w-[1321px] gap-x-[60px]'>
                <InputBox>
                    <Label idFor="name" text="Nome" />
                    <Input  id="name" {...register("name")} />
                </InputBox>

                <InputBox>
                    <Label idFor="cpf" text="Cpf" />
                    <Input id="cpf" {...register("cpf")} />
                </InputBox>

                <InputBox>
                    <Label idFor="phone" text="Telefone" />
                    <Input id="phone" {...register("phone")} />
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
                    <Label idFor="cep" text="Cep" />
                    <Input id="cep" {...register("cep")} />
                </InputBox>

                <div className="flex gap-7">
                    <InputBox size="sm">
                        <Label idFor="number" text="Número" />
                        <Input id="number" {...register("number")} />
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
                    <Label idFor="uf" text="UF" />
                    <Input id="uf" {...register("uf")} />
                </InputBox>

                <InputBox rowSpan>
                    <Label idFor="reference" text="Ponto de referêcia" />
                    <TextArea id="reference" />
                </InputBox>
            </div>


            <button type="submit" className="bg-primary text-white font-bold text-2xl px-4 py-3 rounded w-fit">Salvar Alterações</button>
        </form>
    )
}