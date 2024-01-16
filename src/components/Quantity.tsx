'use client'

import { CartContext } from '@/contexts/CartContextProvider'
import { Plus, Minus } from '@phosphor-icons/react'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'

type QuantityProps = {
    size: 'sm' | 'default'
    quantity: number,
    pizzaName?: string
    setQuantity: Dispatch<SetStateAction<number>>

    onCart?: boolean 
}

export function Quantity({ size, quantity, setQuantity, pizzaName, onCart = false }: QuantityProps) {
    const { updateCartQuantity } = useContext(CartContext)

    useEffect(() => {
        if(pizzaName){
            updateCartQuantity(pizzaName, quantity)
        }
    },[quantity])

    function addQuantity(){
        setQuantity(state => state + 1)
    }

    function diminishQuantity(){
        if(onCart){
            setQuantity(state => {
                if(state > 1){ 
                     return state - 1 
                } 
                return state
             })
        }
        else{
            setQuantity(state => {
               if(state > 0){ 
                    return state - 1 
               } 
               return state
            })
        }
    }

    return (
        <div className={`flex items-center justify-end gap-1 ${size === 'sm' ? 'h-5' : 'h-6'}`}>
            <button
                type='button'
                onClick={addQuantity} 
                className="bg-white text-primary rounded hover:brightness-90 active:scale-95"
            >
                <Plus className={`${size === 'sm' && 'h-5 w-5'} ${size === 'default' && 'h-6 w-6 xs:h-5 xs:w-5 sm:h-6 sm:w-6'}`} weight='bold'/>
            </button>

            <span className={`flex items-center justify-center min-w-[20px] max-h-full xs:h-5 sm:h-full px-1 border-white border-2  rounded text-center ${size === 'sm' ? 'text-sm' : 'text-xl xs:text-base sm:text-xl'} font-medium`}>{quantity}</span>
            
            <button
                type='button' 
                onClick={diminishQuantity} 
                className="bg-white text-primary rounded hover:brightness-90 active:scale-95">
                <Minus className={`${size === 'sm' && 'h-5 w-5'} ${size === 'default' && 'h-6 w-6 xs:h-5 xs:w-5 sm:h-6 sm:w-6'}`} weight='bold'/>
            </button>
        </div>
    )
}