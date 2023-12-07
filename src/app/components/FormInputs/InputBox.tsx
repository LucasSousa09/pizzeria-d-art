import { ReactNode } from "react"

type InputBoxProps = {
    size?: 'xs' | 'sm'
    rowSpan?: boolean

    children: ReactNode
}

export function InputBox({ size, rowSpan, children }: InputBoxProps){
    return (
        <div className={`mt-8 space-y-2 ${size === 'xs' && 'w-24'} ${size === 'sm' && 'w-[126px]'} ${!!rowSpan && 'row-span-2'}`}>
            {children}
        </div>
    )
}