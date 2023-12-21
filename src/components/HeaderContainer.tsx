'use client'

import { usePathname } from "next/navigation"
import { Header } from "./Header"

export function HeaderContainer(){
    const pathname = usePathname()

    return ( 
        <header className={`fixed bg-background top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-3 ${pathname === '/login' && 'w-1/2'} ${pathname === '/success' && 'w-1/2'}`}>
            <Header pathname={pathname} />
        </header>
    )
}