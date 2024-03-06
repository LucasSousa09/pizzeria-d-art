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
    const {data: session} = useSession()
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
        if(session?.user?.name === undefined){
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
        <div className="relative flex items-end min-h-[calc(100vh-60px)] mt-[60px] md:mt-[104px]">
            <Image className="w-full h-[calc(100vh-60px)] object-cover" src={bgImg} alt="Delivery man in a motorcicle" />
            <div 
                className={`absolute top-0 left-0 right-0 pt-16 xl:pt-6 px-5 xl:px-0 xl:bottom-0 xl:right-1/2 bg-overlay flex flex-col items-center justify-center xl:w-1/2 h-1/2 xl:h-full ${italianno.className} text-white`}
            >
                    <p className={`xl:mt-[-52px] text-4xl sm:text-6xl xl:text-7xl text-center leading-tight`}>
                        Parabéns {session?.user?.name}, seu pedido foi recebido!
                    </p>
                    <p className={`text-4xl sm:text-6xl xl:text-7xl text-center leading-tight`}>
                        A pizzeria D'arte agradece !
                    </p>

                    <div className="mt-10 sm:mt-14 xl:mt-16 w-full flex items-center justify-between text-2xl sm:text-4xl max-w-[845px]">
                        <Link className="flex items center gap-3" href={'/'}>
                            <ArrowLeft className="h-6 w-5 lg:h-8 lg:w-8" />
                            Voltar para o início
                        </Link>
                        <Link className="flex items center gap-3" href={'/profile'}>
                            Verificar pedido 
                            <ArrowRight className="h-6 w-5 lg:h-8 lg:w-8" />
                        </Link>
                    </div>
            </div>
            <div 
                className={`absolute bottom-0 left-0 right-0 xl:pt-6 xl:top-0 xl:left-1/2 flex items-center justify-center px-5 xl:px-0 xl:w-1/2 h-1/2 xl:h-full bg-overlay xl:bg-transparent xl:bg-gradient-to-r xl:from-[rgba(0,0,0,0.4)] xl:to-[rgba(0,0,0,0)]`}
            >
                {
                    searchParams.get('payment type') === 'money' && (
                        <p className={`mt-[-120px] xl:mt-[-154px] ${italianno.className} text-orange-500 text-4xl sm:text-6xl xl:text-7xl text-center leading-tight max-w-[845px]`}>Como você selecionou dinheiro, o pagamento será realizado na entrega.</p>
                    )
                }

            </div>
        </div>
    )
}