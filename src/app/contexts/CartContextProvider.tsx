'use client'

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

type CartContextProps = {
    openCart: boolean,
    setOpenCart: Dispatch<SetStateAction<boolean>>
}

type CartContextProviderProps = {
    children: ReactNode
}

export const CartContext = createContext({} as CartContextProps)

export function CartContextProvider({ children }: CartContextProviderProps){
    const [ openCart, setOpenCart ] = useState(false)

    return (
        <CartContext.Provider value={{openCart, setOpenCart}}>
            {children}
        </CartContext.Provider>
    )
}