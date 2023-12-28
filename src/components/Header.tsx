import Image from "next/image";
import Link from "next/link"

import { useContext, useState } from "react";
import { signOut, useSession } from "next-auth/react"; 
import { ShoppingCart, SignOut, UserCircle, Gear } from '@phosphor-icons/react/dist/ssr'

import { CartContext } from "../contexts/CartContextProvider";

import logoImg from "../assets/Logo.png"
import { Separator } from "./Separator";

interface HeaderProps {
    pathname: string
}

export function Header({pathname}: HeaderProps){
    const [ openSettings, setOpenSettings ] = useState(false)
    const {data: session} = useSession()
    const { setOpenCart, cart } = useContext(CartContext)

    return (
        <>
            <Link href="/">
                <Image src={logoImg.src} height={80} width={422} alt="" />
            </Link>
            <div className="flex items-center gap-8">
                {
                    session ? (
                        <div className="relative">
                            <button onClick={() => setOpenSettings(state => !state)}>
                                {
                                    session.user?.image ?
                                    <div className="rounded-full overflow-clip outline outline-[3px] outline-offset-[-1.5px] outline-primary">
                                        <Image src={session.user.image} alt="" height={59} width={59} /> 
                                    </div> :
                                    <UserCircle  className="text-primary" weight="fill" height={59} width={59} />
                                }
                            </button>
                            {openSettings ? (
                                <div className="absolute right-1/2 translate-x-1/2 flex flex-col bg-background rounded border-2 border-primary text-primary font-medium whitespace-nowrap">
                                    <Link className="p-4 h-full flex items-center gap-2 hover:brightness-75" href={'/profile'}>
                                        <Gear weight="bold" size={22} />
                                        Meu perfil
                                    </Link>
                                    <Separator backgroundColor="bg-primary"/>
                                    <button 
                                        onClick={() => signOut()} 
                                        className="p-4 flex items-center gap-2 hover:brightness-75"
                                    >
                                            <SignOut weight="bold" size={22} />
                                        Logout
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    ) : pathname === '/login' ? <></> : (
                        <Link className="font-medium text-2xl text-white bg-primary rounded-full px-[18px] py-3" href='login'>Login</Link>
                    )
                }
                <button 
                    onClick={() => setOpenCart(true)}
                    className="relative"
                >
                    <ShoppingCart className="text-primary" weight="fill" height={57} width={57} />
                    {
                        cart.length > 0 ?
                        <div className="absolute top-[-4px] right-[-2px] bg-primary text-background h-6 w-6 rounded-full outline outline-background font-medium flex items-center justify-center">
                            {cart.length}
                        </div> : null
                    }
                </button>
            </div>
        </>
    )
}