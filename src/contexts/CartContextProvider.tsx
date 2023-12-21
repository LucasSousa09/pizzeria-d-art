'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

type CartContextProps = {
    openCart: boolean,
    setOpenCart: Dispatch<SetStateAction<boolean>>

    cart: CartItemProps[],
    addPizzaToCart: (pizza: CartItemProps) => void
    removePizzaFromCart: (pizzaName: string) => void
}

type CartContextProviderProps = {
    children: ReactNode
}

type CartItemProps = {
    pizzaImg: string,
    pizzaName: string,
    price: number,
    quantity: number
}

export const CartContext = createContext({} as CartContextProps)

export function CartContextProvider({ children }: CartContextProviderProps){
    const [ openCart, setOpenCart ] = useState(false)

    const [ cart, setCart ] = useState<CartItemProps[]>([])

    function addPizzaToCart(pizza: CartItemProps){
        if(pizza.quantity > 0){
            const hasOnCart = cart.some(cartPizza => cartPizza.pizzaName === pizza.pizzaName)
    
            if(hasOnCart === false){
                setCart(state => [...state, pizza])
            }
        }
    }

    function removePizzaFromCart(pizzaName: string) {
        setCart(state => state.filter(cart => cart.pizzaName !== pizzaName))
    }

    return (
        <CartContext.Provider value={{openCart, setOpenCart, cart, addPizzaToCart, removePizzaFromCart}}>
            {children}
        </CartContext.Provider>
    )
}