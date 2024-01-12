'use client'

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { useSearchParams, redirect } from "next/navigation";
import { ArrowRight, ArrowLeft } from '@phosphor-icons/react'

import { CartContext } from "@/contexts/CartContextProvider";

import { api } from "@/lib/axios";

import bgImg from '../../assets/lucian-alexe.png'

import { italianno } from '../fonts'

export default function Success(){
    const session = useSession()
    const searchParams = useSearchParams()
    const { clearCart } = useContext(CartContext)

    async function updateOrderStatus(data: {paymentStatus: string, sessionStatus: string}, orderId: string){
        if(data.paymentStatus === 'paid' && data.sessionStatus === 'complete'){
            api.patch('update-order', {orderId})
        }
    }

    async function getLastCheckoutSession(params: {sessionId: string, orderId: string}){
        if(params.sessionId === ''){
            return
        }

        const response = await api.get(`get-checkout-session?session_id=${params.sessionId}`)
        const { data } = response

        if(response.status === 200){
            updateOrderStatus(data, params.orderId)
        }
        return
    }

    useEffect(() => {
        if(session.data?.user?.name === undefined){
            redirect('/login')
        }
        clearCart()
    },[])

    useEffect(() => {
        const sessionId = searchParams.get('session_id')
        const orderId = searchParams.get('order_id') 
        
        const params = {
            sessionId: sessionId || '',
            orderId: orderId || ''
        }

        getLastCheckoutSession(params)
    },[])

    return (
        <div className="relative flex items-end h-[calc(100vh-104px)] mt-[104px] w-screen">
            <Image className="w-full" src={bgImg} alt="Delivery man in a motorcicle" />
            <div 
                className={`absolute top-0 left-0 bottom-0 bg-overlay flex flex-col items-center justify-center w-1/2 h-full ${italianno.className} text-white`}
            >
                    <p className={`mt-[-52px] text-8xl text-center leading-tight`}>
                        Parabéns {session.data?.user?.name}, seu pedido foi recebido!
                    </p>
                    <p className={`text-8xl text-center leading-tight`}>
                        A pizzeria D'arte agradece !
                    </p>

                    <div className="mt-16 w-full flex items-center justify-between text-4xl max-w-[845px]">
                        <Link className="flex items center gap-3" href={'/'}>
                            <ArrowLeft height={32} width={32} />
                            Voltar para o início
                        </Link>
                        <Link className="flex items center gap-3" href={'/profile'}>
                            Verificar pedido 
                            <ArrowRight height={32} width={32}/>
                        </Link>
                    </div>
            </div>
            <div 
                className={`absolute top-0 right-0 bottom-0 bg-gradient-to-r from-[rgba(0,0,0,0.4)] to-[rgba(0,0,0,0)] w-1/2 h-full flex items-center justify-center`}
            >
                {
                    searchParams.get('payment type') === 'money' && (
                        <p className={`mt-[-154px] ${italianno.className} text-orange-500 text-8xl text-center leading-tight max-w-[845px]`}>Como você selecionou dinheiro, o pagamento será realizado na entrega.</p>
                    )
                }

            </div>
        </div>
    )
}