import { forwardRef } from "react"
import { ChangeHandler } from "react-hook-form"

type InputProps = {
    id: string,
    onChange: ChangeHandler,
    onBlur: ChangeHandler,
    name: string,
    type?: 'text' | 'number'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({id, name, onBlur, onChange, type = 'text'}, ref) => {
    return(
        <input id={id} name={name} onBlur={onBlur} onChange={onChange} type={type} ref={ref} className="block p-2 text-primary w-full bg-background border border-primary rounded h-12 focus:outline-primary" />
    )
})