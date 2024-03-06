import { ReactNode } from "react"

type InputBoxProps = {
    size?: 'xs' | 'sm'
    rowSpan?: boolean
    maxHeight?: boolean

    children: ReactNode
}

export function InputBox({ size, rowSpan, children, maxHeight }: InputBoxProps){
    return (
        <div className={`relative mb-4 xl:mb-8 space-y-1 md:space-y-2 ${!!maxHeight && 'h-[86px]'} ${size === 'xs' && 'w-24'} ${size === 'sm' && 'w-[126px]'} ${!!rowSpan && 'row-span-2'}`}>
            {children}
        </div>
    )
}










