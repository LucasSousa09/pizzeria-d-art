import Image from "next/image";
import Link from "next/link"

import logoImg from "../assets/Logo.png"

import { ShoppingCart, UserCircle } from '@phosphor-icons/react/dist/ssr'

let isLogged = false

export function Header(){
    return (
        <header className="flex items-center justify-between px-12 py-3">
            <Image src={logoImg.src} height={80} width={422} alt="" />
            <div className="flex items-center gap-8">
                {
                    isLogged ? (
                        <UserCircle  className="text-primary" weight="fill" height={59} width={59} />
                    ) : (
                        <Link className="font-medium text-2xl text-white bg-primary rounded-full px-[18px] py-3" href='#'>Login</Link>
                    )
                }
                <ShoppingCart className="text-primary" weight="fill" height={57} width={57}  />
            </div>
        </header>
    )
}