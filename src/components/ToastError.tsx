'use client'

import { toast } from "react-toastify";
import { useContext, useEffect } from "react";

import { CartContext } from "@/contexts/CartContextProvider";

export function ToastError(props:{ error: string }){
    const { loadingCart, setLoadingCart, cart } = useContext(CartContext)

    useEffect(() => {
        if(loadingCart){
            setLoadingCart(false)
        }
        else{
            if(props.error.trim() !== '' && cart.length === 0){
                toast.error(props.error)
            }
        }
    },[loadingCart, cart])

    return (
        <></>
    )
}