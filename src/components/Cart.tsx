'use client'

import { useContext, useEffect, useRef } from 'react'
import { X, SmileyXEyes } from '@phosphor-icons/react'

import { CartContext } from '../contexts/CartContextProvider'

import { CartPizza } from './CartPizza'
import { formatter } from '@/lib/formatter'

import { useOnClickOutside } from '@/hooks/useOnClickOutside'

export function Cart(){
    const { openCart, setOpenCart, cart, getCartFromLocalStorage } = useContext(CartContext)

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
        <div ref={cartRef} className={`fixed top-0 bottom-0 right-0 z-50 flex flex-col justify-between items-center bg-primary text-white w-[440px] ${ !openCart ? 'translate-x-full' : 'translate-x-0' } transition-all`}>
            <div className="relative w-full">
                <button onClick={() => setOpenCart(false)} className="absolute top-2 right-2">
                    <X weight='bold' size={32} />
                </button>

                <div className="mt-12">
                    {
                        cart.length > 0 ?
                        cart.map(cartPizza => <CartPizza 
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

            <footer className="w-[calc((100%)-16px)] mx-2 border-t-white border-t px-5 pt-4 pb-5">
                <div className="flex justify-between items-center">
                    <strong className="text-xl">Preço Total</strong>
                    <strong className="text-xl">{formatter.format(cart.reduce((cur, acc) => {return cur + (acc.quantity * acc.price / 100)},0))}</strong>
                </div>
                <button 
                    className="hover:brightness-90 active:scale-95 text-xl font-bold bg-white text-primary py-4 w-full mt-6 rounded"
                >
                    Finalizar Compra
                </button>
            </footer>
        </div>
    )
}