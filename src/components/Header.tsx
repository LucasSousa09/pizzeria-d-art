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

export function Header({ pathname }: HeaderProps){
    const [ openSettings, setOpenSettings ] = useState(false)
    const { data: session } = useSession()
    const { setOpenCart, cart } = useContext(CartContext)

    return (
        <>
            <Link className="flex h-11 w-60 md:h-20 md:w-[422px]" href="/">
                <Image 	
                    style={{objectFit: "contain", objectPosition: "left"}} 
                    src={logoImg.src} 
                    height={80} 
                    width={422} alt="" 
                />
            </Link>
            <div className="flex items-center gap-2 md:gap-8">
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
                        <Link 
                            className="hover:brightness-90 active:scale-95 font-medium text-base md:text-2xl text-white bg-primary rounded-full px-3 md:px-[18px] py-2 md:py-3" href='login'
                        >
                            Login
                        </Link>
                    )
                }
                <button  
                    onClick={() => setOpenCart(true)}
                    className="relative"
                >
                    {
                        pathname === '/login' || pathname === '/checkout' ? null :
                        (<>
                            <ShoppingCart className="text-primary h-11 w-11 md:h-14 md:w-14" weight="fill" height={57} width={57} />
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
        </>
    )
}