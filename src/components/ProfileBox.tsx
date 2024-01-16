'use client'

import { ReactNode } from "react"
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll"

type ProfileBoxProps = {
    label: string,
    children: ReactNode
}

export function ProfileBox({label, children}: ProfileBoxProps){
    const scrollRef = useHorizontalScroll()

    return (
        <div className="mt-6 md:mt-12 max-w-[1400px] w-full">
            <span className="text-primary font-medium text-xl md:text-[28px]">{label}</span>
            <div 
                ref={scrollRef} 
                className="mt-2 pt-2 pb-2 w-full border-t-2 border-t-primary flex gap-5 overflow-x-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-primary"
            >
                {children}
            </div>
        </div>
    )
}