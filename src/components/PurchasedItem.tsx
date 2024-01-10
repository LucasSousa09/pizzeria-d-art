import Image from 'next/image'
import { format } from 'date-fns'
import { CaretDoubleDown } from '@phosphor-icons/react/dist/ssr'

import { formatter } from '@/lib/formatter'

type PurchasedItemProps = {
    pizzaImg: string,
    createdAt: Date,
    totalPrice: number,
} 

export function PurchasedItem({ pizzaImg, createdAt, totalPrice }: PurchasedItemProps){
    const date = format(createdAt, 'dd/MM/yyyy - hh:mm')

    return (
        <div className="flex items-start p-5 gap-5 bg-primary text-white rounded">
            <Image src={pizzaImg} alt="" height={90} width={90} />

            <div className="flex flex-col justify-between items-end text-lg h-full">
                <div className='flex flex-col items-end gap-2'>
                    <strong className="leading-tight">{ date }</strong>
                    <strong className="leading-tight">{ formatter.format(totalPrice / 100)}</strong>
                </div>

                <button className='flex items-center gap-1 font-medium text-xs'>Ver detalhes<CaretDoubleDown weight="bold" size={15} /> </button>
            </div>
        </div>
    )
}