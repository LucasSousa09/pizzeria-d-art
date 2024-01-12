'use client'

import * as zod from 'zod'

import { Input } from "./Input";
import { Label } from './Label';
import { InputBox } from "./InputBox";
import { RadioInput } from './RadioInput';
import { CartPizza } from '../CartPizza';
import { Separator } from '../Separator';

import { api } from '@/lib/axios';
import { formatter } from '@/lib/formatter';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/contexts/CartContextProvider';
import { Money, CreditCard , Bank  } from '@phosphor-icons/react';

const CheckoutSchema = zod.object({
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
    paymentMethod: zod.string({invalid_type_error: 'Por favor selecione um meio de pagamento'})   
})

type CheckoutData = zod.infer<typeof CheckoutSchema>

type CheckoutFormProps = {
    checkoutProps?: {
        street?: string | null,
        district?: string | null,
        zipCode?: string | null,
        state?: string | null,
        houseNumber?: number | null,
        complement?: string | null,
        city?: string | null,
        reference?: string | null
    }
}

export function CheckoutForm({checkoutProps}: CheckoutFormProps){
    const { cart, loadingCart, setLoadingCart } = useContext(CartContext)
    const [ isActive, setIsActive ] = useState('')

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState
    } = useForm<CheckoutData>({
        resolver: zodResolver(CheckoutSchema),
        defaultValues: {
            street: checkoutProps?.street || '',
            district: checkoutProps?.district || '',
            zipCode: checkoutProps?.zipCode || '',
            houseNumber: checkoutProps?.houseNumber || undefined,
            complement: checkoutProps?.complement || '',
            city: checkoutProps?.city || '',
            state: checkoutProps?.state || '',
            reference: checkoutProps?.reference || '',
        }
    })

    useEffect(() => {
        const currentError = Object.keys(formState.errors)[0]
        const errorMessage = formState.errors[currentError as keyof CheckoutData]?.message

        toast.error(errorMessage)

    }, [formState.errors])

    const onSubmit: SubmitHandler<CheckoutData> = async (checkoutData) => {
        const dataForOrder = { paymentMethod: checkoutData.paymentMethod, cart } 
        const orderDataId = await api.post('/create-order', dataForOrder)


        if(orderDataId.status === 200){
            const { data } = orderDataId
    
            if(checkoutData.paymentMethod === 'money'){            
                return router.push('/success?payment+type=money')
            }
    
            if(checkoutData.paymentMethod === 'pix'){            
                return router.push('/success?payment+type=pix')
            }
    
            const listItems = cart.map(cartItem => {
                return {
                    price: cartItem.id,
                    quantity: cartItem.quantity
                }
            })
    
           const response = await api.post('/checkout', {listItems, data})
    
           const { checkoutSession } = response.data
    
           return router.push(checkoutSession)
        }

        return toast.error('Algo de errado aconteceu, por favor tente novamente mais tarde')
    }
    
    useEffect(() => {
        if(loadingCart){
            setLoadingCart(false)
        }
        else{
            if(cart.length === 0){
                router.push('/?error=checkout+error')
            }
        }
    },[loadingCart, cart])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-[minmax(0,1fr)_440px] grid-rows-[440px_240px] grid-flow-col gap-x-16 items-center justify-center max-w-[1416px]" >
            <div>
                <strong className="flex font-medium text-2xl text-primary mb-2 leading-normal">Endereço</strong>
                <div className="bg-primary rounded max-w-[916px] pt-[-4px] px-7 pb-7 grid grid-cols-2 grid-rows-3 grid-flow-col gap-x-16 mb-4">
                    <InputBox>
                        <Label theme='primary' idFor="street" text='Rua' />
                        <Input disabled theme="primary" id="street" {...register("street")} />
                    </InputBox>

                    <InputBox>
                        <Label theme='primary' idFor="district" text='Bairro' />
                        <Input disabled theme="primary" id="district" {...register("district")} />
                    </InputBox>

                    <InputBox>
                        <Label theme='primary' idFor="zipCode" text='CEP' />
                        <Input disabled theme="primary" id="zipCode" {...register("zipCode")} />
                    </InputBox>

                    <div className='flex gap-5'>
                        <InputBox size='xs'>
                            <Label theme='primary' idFor="state" text='UF' />
                            <Input disabled theme="primary" id="state" {...register("state")} />
                        </InputBox>

                        <InputBox size="sm">
                            <Label theme='primary' idFor="houseNumber" text='Número' />
                            <Input disabled theme="primary" id="houseNumber" {...register("houseNumber")} />
                        </InputBox>

                        <InputBox>
                            <Label theme='primary' idFor="complement" text='Comp.' />
                            <Input disabled theme="primary" id="complement" {...register("complement")} />
                        </InputBox>
                    </div>

                    <InputBox>
                        <Label theme='primary' idFor="city" text='Cidade' />
                        <Input disabled theme="primary" id="city" {...register("city")} />
                    </InputBox>

                    <InputBox>
                        <Label theme='primary' idFor="reference" text='Ponto de referencia' />
                        <Input disabled theme="primary" id="reference" {...register("reference")} />
                    </InputBox>
                </div>
            </div>

            <div>
                <strong className="flex font-medium text-2xl text-primary mb-2 leading-normal">Meios de pagamento</strong>
                <div className='max-w-[917px] grid grid-cols-2 gap-5 bg-primary p-7 rounded'>
                    <RadioInput  id='money'  {...register('paymentMethod')} isActive={isActive} setIsActive={setIsActive}>
                        <Money size={32}/>
                        Dinheiro
                    </RadioInput>

                    <RadioInput  id='pix' {...register('paymentMethod')} isActive={isActive} setIsActive={setIsActive}>
                        
                        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_20_554)">
                            <path className="group-[.is-active]:fill-primary" d="M13.3057 16.4308C13.5909 16.1456 14.0821 16.1456 14.3672 16.4308L18.4337 20.4973C19.1837 21.2472 20.1818 21.6592 21.238 21.6592H22.0355L16.9075 26.7872C15.3073 28.3451 12.7089 28.3451 11.1088 26.7872L5.95961 21.6433H6.45076C7.50699 21.6433 8.50513 21.2314 9.25506 20.4815L13.3057 16.4308ZM14.3672 12.5439C14.0292 12.8343 13.5962 12.8396 13.3057 12.5439L9.25506 8.4932C8.50513 7.69574 7.50699 7.33134 6.45076 7.33134H5.95961L11.1035 2.18537C12.7089 0.582742 15.3073 0.582742 16.9075 2.18537L22.0408 7.3155H21.238C20.1818 7.3155 19.1837 7.72743 18.4337 8.47736L14.3672 12.5439ZM6.45076 8.51961C7.17956 8.51961 7.85027 8.81535 8.41007 9.33291L12.4607 13.3836C12.841 13.7163 13.3374 13.9539 13.8391 13.9539C14.3355 13.9539 14.832 13.7163 15.2122 13.3836L19.2787 9.31707C19.7963 8.80479 20.5092 8.50905 21.238 8.50905H23.229L26.308 11.588C27.9082 13.1882 27.9082 15.7865 26.308 17.3867L23.229 20.4656H21.238C20.5092 20.4656 19.7963 20.1699 19.2787 19.6523L15.2122 15.5858C14.4781 14.8517 13.1948 14.8517 12.4607 15.5911L8.41007 19.6365C7.85027 20.154 7.17956 20.4498 6.45076 20.4498H4.77029L1.70615 17.3867C0.103525 15.7865 0.103525 13.1882 1.70615 11.588L4.77029 8.51961H6.45076Z" fill="white"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_20_554">
                            <rect width="28" height="28" fill="white" transform="translate(0.5)"/>
                            </clipPath>
                            </defs>
                        </svg>

                        PIX
                    </RadioInput>
                    
                    <RadioInput  id='credit' {...register('paymentMethod')} isActive={isActive} setIsActive={setIsActive}>
                        <CreditCard size={32}/>
                        Cartão de Crédito
                    </RadioInput>

                    <RadioInput  id='debit' {...register('paymentMethod')} isActive={isActive} setIsActive={setIsActive}>
                        <Bank size={32}/>
                        Cartão de Débito
                    </RadioInput>
                </div>
            </div>

            <div className='flex flex-col h-full row-span-2'>
                <strong className="flex font-medium text-2xl text-primary mb-2 leading-normal">Pedidos</strong>
                <div className="flex flex-col items-center justify-between h-[calc(100%-44px)] bg-primary rounded px-2 pb-7">
                    <div className="scrollbar scrollbar-none text-white w-full overflow-y-auto" >
                        {   
                            cart.map(pizza => {
                                return (
                                    <CartPizza onCheckout id={pizza.id} pizzaImg={pizza.pizzaImg} pizzaName={pizza.pizzaName} price={pizza.price} quantity={pizza.quantity} key={pizza.pizzaName} />
                                )
                            })
                        }
                    </div>
                    <div className="flex flex-col w-full pt-5">
                        <Separator />
                        <header className="flex items-center w-full pt-4 pb-2 justify-between px-3">
                            <strong className="font-bold text-xl text-white leading-normal">Preço Total</strong>
                            <strong className="font-bold text-xl text-white leading-normal">
                                {
                                    formatter.format(cart.reduce((acc, cur) => (cur.price * cur.quantity) + acc, 0) / 100)
                                }
                            </strong>
                        </header>
                        <button className="hover:brightness-90 active:scale-95 pt-2 bg-white text-primary py-3 mx-3 rounded font-bold text-xl leading-normal" type="submit">Finalizar Compra</button>
                    </div>
                </div>
            </div>
        </form>
    )
    
}

