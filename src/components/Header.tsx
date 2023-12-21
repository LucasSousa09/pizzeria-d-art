import Image from "next/image";
import Link from "next/link"

import logoImg from "../assets/Logo.png"

import { ShoppingCart, UserCircle } from '@phosphor-icons/react/dist/ssr'

import { useContext } from "react";
import { CartContext } from "../contexts/CartContextProvider";

let isLogged = false

interface HeaderProps {
    pathname: string
}

export function Header({pathname}: HeaderProps){
    const { setOpenCart } = useContext(CartContext)

    return (
        <>
            <Link href="/">
                <Image src={logoImg.src} height={80} width={422} alt="" />
            </Link>
            <div className="flex items-center gap-8">
                {
                    isLogged ? (
                        <UserCircle  className="text-primary" weight="fill" height={59} width={59} />
                    ) : pathname === '/login' ? <></> : (
                        <Link className="font-medium text-2xl text-white bg-primary rounded-full px-[18px] py-3" href='login'>Login</Link>
                    )
                }
                <button onClick={() => setOpenCart(true)}>
                    <ShoppingCart className="text-primary" weight="fill" height={57} width={57}  />
                </button>
            </div>
        </>
    )
}