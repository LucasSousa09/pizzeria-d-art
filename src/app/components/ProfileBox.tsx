import { ReactNode } from "react"

type ProfileBoxProps = {
    label: string,
    children: ReactNode
}

export function ProfileBox({label, children}: ProfileBoxProps){
    return (
        <div className="mt-12 max-w-[1400px] w-full">
            <span className="text-primary font-medium text-[28px]">{label}</span>
            <div className="mt-2 pt-2 w-full border-t-2 border-t-primary flex gap-5">
                {children}
            </div>
        </div>
    )
}