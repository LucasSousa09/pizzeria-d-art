'use client'

import { useRouter } from 'next/navigation'
import { useContext, useEffect, useRef } from 'react'
import { X, SmileyXEyes } from '@phosphor-icons/react'

import { CartContext } from '../contexts/CartContextProvider'

import { CartPizza } from './CartPizza'
import { formatter } from '@/lib/formatter'

import { useOnClickOutside } from '@/hooks/useOnClickOutside'

export function Cart(){
    const { openCart, setOpenCart, cart, getCartFromLocalStorage } = useContext(CartContext)
    const router = useRouter()

    const cartRef = useRef<HTMLDivElement | null>(null)

    function onClickOutside() {
        setOpenCart(false)
    }

    useOnClickOutside(cartRef, onClickOutside)

    useEffect(() => {
        const handler = (evt: KeyboardEvent) => {
            if(evt.key === "Escape"){
                setOpenCart(false)
            }
        }

            document.addEventListener('keydown', handler)

            return () => {
                document.removeEventListener('keydown', handler)
            }
    },[])

    useEffect(() => {
        getCartFromLocalStorage()
    },[])
    
    return (
        <div ref={cartRef} className={`fixed top-0 bottom-0 right-0 z-50 flex flex-col justify-between items-center bg-primary text-white w-[440px] max-w-[100vw] ${ !openCart ? 'translate-x-full' : 'translate-x-0' } transition-all`}>
            <div className="relative w-full">
                <button onClick={() => setOpenCart(false)} className="absolute top-2 right-2">
                    <X weight='bold' size={32} />
                </button>

                <div className="flex flex-col gap-3 sm:gap-0 mt-12 px-5 sm:px-0">
                    {
                        cart.length > 0 ?
                        cart.map(cartPizza => <CartPizza 
                                                id={cartPizza.id}
                                                pizzaImg={cartPizza.pizzaImg} 
                                                pizzaName={cartPizza.pizzaName} 
                                                price={cartPizza.price} 
                                                quantity={cartPizza.quantity} 
                                                key={cartPizza.pizzaName}
                                              />):
                        <div className="flex flex-col items-center justify-center gap-4 pt-16   ">
                            <strong className="font-medium text-xl">Seu carrinho não contem items</strong>
                            <SmileyXEyes size={40} />
                        </div>
                    }
                </div>
            </div>

            <footer className="w-[calc((100%)-16px)] max-w-full mx-2 border-t-white border-t px-5 pt-4 pb-5">
                <div className="flex justify-between items-center">
                    <strong className="text-xl">Preço Total</strong>
                    <strong className="text-xl">{formatter.format(cart.reduce((cur, acc) => {return cur + (acc.quantity * acc.price / 100)},0))}</strong>
                </div>
                <button
                    onClick={() => {
                        setOpenCart(false)
                        return router.push('/checkout')
                    }} 
                    disabled={cart.length === 0}
                    className={`disabled:cursor-not-allowed disabled:brightness-75 disabled:hover:brightness-75 disabled:active:scale-100 hover:brightness-90 active:scale-95 text-xl font-bold bg-white text-primary py-4 w-full mt-6 rounded`}
                >
                    Finalizar Compra
                </button>
            </footer>
        </div>
    )
}