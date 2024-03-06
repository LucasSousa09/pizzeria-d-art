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
        <div className="mt-8 lg:mt-0 lg:last-of-type:mt-12 last-of-type:mb-16 min-w-[340px] max-w-[1400px]">
            <span className="text-primary font-medium text-xl md:text-2xl">{label}</span>
            <div 
                ref={scrollRef} 
                className="flex lg:w-11/12 xl:w-full mt-2 pt-2 pb-2 border-t-2 border-t-primary gap-5 overflow-x-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-primary"
            >
                {children}
            </div>
        </div>
    )
}