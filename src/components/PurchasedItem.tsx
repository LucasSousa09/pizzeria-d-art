import { CaretDoubleDown } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

export function PurchasedItem(){
    return (
        <div className="flex items-start p-5 gap-5 bg-primary text-white rounded">
            <Image src={''} alt="" height={90} width={90} />

            <div className="flex flex-col justify-between items-end text-lg h-full">
                <div className='flex flex-col items-end gap-2'>
                    <strong className="leading-tight">08/11/2023 - 21:32</strong>
                    <strong className="leading-tight">R$ 131,96</strong>
                </div>

                <button className='flex items-center gap-1 font-medium text-xs'>Ver detalhes <CaretDoubleDown weight="bold" size={15} /> </button>
            </div>
        </div>
    )
}