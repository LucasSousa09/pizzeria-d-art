'use client'

import { Plus, Minus } from '@phosphor-icons/react'

type QuantityProps = {
    size: 'sm' | 'default'
}

export function Quantity({size}: QuantityProps) {
    return (
        <div className={`flex items-center justify-end gap-1 ${size === 'sm' ? 'h-5' :  'h-6'}`}>
            <button className="bg-white text-primary rounded"><Plus size={`${size === 'sm' ? '20' : '24'}`} weight='bold'/></button>
            <span className={`flex items-center border-white border-2 px-1 max-h-full rounded text-center${size === 'sm' ? 'text-sm' : 'text-xl pt-[1px]'}  font-medium`}>0</span>
            <button className="bg-white text-primary rounded"><Minus size={`${size === 'sm' ? '20' : '24'}`} weight='bold'/></button>
        </div>
    )
}