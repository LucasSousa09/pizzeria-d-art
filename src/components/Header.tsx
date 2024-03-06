'use client'

import Image from "next/image";
import Link from "next/link"
import { useContext, useState } from "react";
import { usePathname } from 'next/navigation';
import { signOut, useSession } from "next-auth/react"; 
import { ShoppingCart, SignOut, UserCircle, Gear } from '@phosphor-icons/react'

import { CartContext } from "../contexts/CartContextProvider";

import { Separator } from "./Separator";

import logoImg from "../assets/Logo.png"

export function Header(){
    const [ openSettings, setOpenSettings ] = useState(false)
    const { data: session } = useSession()
    const { setOpenCart, cart } = useContext(CartContext)

    const pathname = usePathname()

    return (
        <header className={`fixed bg-background max-w-1920 mx-auto top-0 left-0 right-0 z-50 flex items-center justify-between gap-3 px-3 md:px-6 lg:px-12 py-2 lg:py-3`}>
            <Link className="flex h-11 w-36 sm:w-60 md:h-20 md:w-[360px]" href="/">
                <Image 	
                    style={{objectFit: "contain", objectPosition: "left"}} 
                    src={logoImg.src} 
                    height={80} 
                    width={360} alt=""
                    priority 
                />
            </Link>
            <div className={`flex items-center gap-2 md:gap-8`}>
                {
                    session ? (
                        <div className="relative flex items-center">
                            <button onClick={() => setOpenSettings(state => !state)}>
                                {
                                    session.user?.image ?
                                    <div className="rounded-full overflow-clip h-10 w-10 md:h-14 md:w-14  outline outline-[3px] outline-offset-[-1.5px] outline-primary">
                                        <Image src={session.user.image} alt="" height={59} width={59} /> 
                                    </div> :
                                    <UserCircle  className="text-primary h-10 w-10 md:h-14 md:w-14" weight="fill" height={59} width={59} />
                                }
                            </button>
                            {openSettings ? (
                                <div className="absolute top-12 md:top-16 right-1/2 translate-x-1/2 flex flex-col bg-background rounded border-2 border-primary text-primary font-medium whitespace-nowrap text-sm md:text-base">
                                    <Link onClick={() => setOpenSettings(state => !state)} className="p-4 h-full flex items-center gap-2 hover:brightness-75" href={'/profile'}>
                                        <Gear className="h-4 w-4 md:h-[22px] md:w-[22px]" weight="bold" size={22} />
                                        Meu perfil
                                    </Link>
                                    <Separator backgroundColor="bg-primary"/>
                                    <button 
                                        onClick={() => signOut()} 
                                        className="p-4 flex items-center gap-2 hover:brightness-75"
                                    >
                                            <SignOut className="h-4 w-4 md:h-[22px] md:w-[22px]" weight="bold" size={22} />
                                        Logout
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    ) : pathname === '/login' ? null : (
                        <div>
                            <Link 
                                href='/login'
                                className="hover:brightness-90 active:scale-95 font-medium text-xs sm:text-base lg:text-2xl text-white bg-primary rounded-full rounded-r-none px-2 md:px-[18px] py-2 md:py-3 mr-[2px]"
                                >
                                Login
                            </Link>
                            <Link 
                                href='/register'
                                className="hover:brightness-90 active:scale-95 font-medium text-xs sm:text-base lg:text-2xl text-white bg-primary rounded-full rounded-l-none px-2 md:px-[18px] py-2 md:py-3"
                                >
                                Crie uma conta
                            </Link>
                        </div>
                    )
                }
                <button  
                    onClick={() => setOpenCart(true)}
                    className="relative hover:brightness-90"
                >
                    {
                        pathname === '/login' || pathname === '/checkout' ? null :
                        (<>
                            <ShoppingCart className="text-primary h-6 w-6 sm:h-9 sm:w-9 md:h-14 md:w-14" weight="fill" />
                            {
                                cart.length > 0 ?
                                <div className="absolute top-[-4px] right-[-2px] bg-primary text-background h-6 w-6 rounded-full outline outline-background font-medium flex items-center justify-center">
                                    {cart.length}
                                </div> : null
                            }
                        </>)
                    }
                    
                </button>
            </div>
        </header>
    )
}