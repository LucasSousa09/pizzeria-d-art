'use client'
import { Plus, Minus } from '@phosphor-icons/react'

export function Quantity() {
    return (
        <div className="flex items-center justify-end gap-1 h-6">
            <button className="bg-white text-primary rounded-[4px]"><Plus size={24} weight='bold'/></button>
            <span className="flex items-center pt-[1px] border-white border-2 px-1 max-h-full rounded-[4px] text-center text-xl font-medium">0</span>
            <button className="bg-white text-primary rounded-[4px]"><Minus size={24} weight='bold'/></button>
        </div>
    )
}