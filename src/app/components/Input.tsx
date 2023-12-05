import { forwardRef } from "react"
import { ChangeHandler } from "react-hook-form"

type InputProps = {
    id: string,
    onChange: ChangeHandler,
    onBlur: ChangeHandler,
    name: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return(
            <input {...props} ref={ref} className="block p-2 text-primary w-full bg-background border border-primary rounded h-12" type="text" />
    )
})