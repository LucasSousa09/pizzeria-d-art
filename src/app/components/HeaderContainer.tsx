'use client'

import { usePathname } from "next/navigation"
import { Header } from "./Header"

export function HeaderContainer(){
    const pathname = usePathname()

    return ( 
        <header className={`flex items-center justify-between px-12 py-3 ${pathname === '/login' || '/success' && 'w-1/2'}`}>
            <Header pathname={pathname} />
        </header>
    )
}