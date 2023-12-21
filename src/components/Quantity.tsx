'use client'

import { CartContext } from '@/contexts/CartContextProvider'
import { Plus, Minus } from '@phosphor-icons/react'
import { Dispatch, SetStateAction, useContext, useState } from 'react'

type QuantityProps = {
    size: 'sm' | 'default'
    quantity: number,
    pizzaName?: string
    setQuantity: Dispatch<SetStateAction<number>>
}

export function Quantity({ size, quantity, setQuantity, pizzaName }: QuantityProps) {
    const { updateCartQuantity } = useContext(CartContext)

    function addQuantity(){
        if(pizzaName){
            setQuantity(state => {
               updateCartQuantity(pizzaName, state + 1)
               return state + 1
            })
        }
        else{
            setQuantity(state => state + 1)
        }
    }

    function diminishQuantity(){
        if(pizzaName){
            setQuantity(state => {
               if(state > 0){ 
                   updateCartQuantity(pizzaName, state - 1)
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
            <button onClick={addQuantity} className="bg-white text-primary rounded"><Plus size={`${size === 'sm' ? '20' : '24'}`} weight='bold'/></button>
            <span className={`flex items-center border-white border-2 px-1 max-h-full min-w-[25px] rounded text-center ${size === 'sm' ? 'text-sm' : 'text-xl pt-[1px]'}  font-medium`}>{quantity}</span>
            <button onClick={diminishQuantity} className="bg-white text-primary rounded"><Minus size={`${size === 'sm' ? '20' : '24'}`} weight='bold'/></button>
        </div>
    )
}