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
                <Plus size={`${size === 'sm' ? '20' : '24'}`} weight='bold'/>
            </button>

            <span className={`flex items-center border-white border-2 px-1 max-h-full min-w-[25px] rounded text-center ${size === 'sm' ? 'text-sm' : 'text-xl pt-[1px]'}  font-medium`}>{quantity}</span>
            
            <button
                type='button' 
                onClick={diminishQuantity} 
                className="bg-white text-primary rounded hover:brightness-90 active:scale-95">
                <Minus size={`${size === 'sm' ? '20' : '24'}`} weight='bold'/>
            </button>
        </div>
    )
}