'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

type CartContextProps = {
    openCart: boolean,
    setOpenCart: Dispatch<SetStateAction<boolean>>

    cart: CartItemProps[],
    addPizzaToCart: (pizza: CartItemProps) => void
    removePizzaFromCart: (pizzaName: string) => void
    updateCartQuantity: ( pizzaName:string, quantity:number ) => void
    getCartFromLocalStorage: () => void
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

    function getCartFromLocalStorage(){
        const localStorageCart = localStorage.getItem('@pizza-dart:cart')

        if(localStorageCart !== null){
            setCart(JSON.parse(localStorageCart))
        }
    }

    function addPizzaToCart(pizza: CartItemProps){
        if(pizza.quantity > 0){
            const hasOnCart = cart.some(cartPizza => cartPizza.pizzaName === pizza.pizzaName)
    
            if(hasOnCart === false){
                setCart(state => {
                    localStorage.setItem('@pizza-dart:cart', JSON.stringify([...state, pizza]))
                    return [...state, pizza]
                })
            }
        }
    }

    function removePizzaFromCart(pizzaName: string) {
        setCart(state => {
            const filteredPizzas = state.filter(pizza => pizza.pizzaName !== pizzaName)
            localStorage.setItem('@pizza-dart:cart', JSON.stringify(filteredPizzas))
            return filteredPizzas
        })
    }

    function updateCartQuantity(pizzaName:string, quantity: number){
        setCart(state => {
            const updatedCart = state.map(pizza => {
                if(pizza.pizzaName === pizzaName){
                    return {...pizza, quantity}
                }
                return pizza
            })
            localStorage.setItem('@pizza-dart:cart', JSON.stringify(updatedCart))
            return updatedCart        
        }

        )
    }

    return (
        <CartContext.Provider value={{openCart, setOpenCart, cart, addPizzaToCart, removePizzaFromCart, updateCartQuantity, getCartFromLocalStorage}}>
            {children}
        </CartContext.Provider>
    )
}