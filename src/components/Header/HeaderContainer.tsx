import { headers } from 'next/headers'

import { Header } from "."

export function HeaderContainer({}){
    const pathname = headers().get("next-url") || ""

    return (
        <header className={`fixed bg-background top-0 left-0 right-0 z-50 flex items-center justify-between gap-3 px-3 md:px-6 lg:px-12 py-2 lg:py-3 ${pathname === '/login' && 'xl:w-1/2'}`}>
            <Header pathname={pathname} />
        </header>
    )
}