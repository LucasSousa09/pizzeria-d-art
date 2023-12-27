import { forwardRef } from "react"
import { ChangeHandler } from "react-hook-form"

type InputProps = {
    id: string,
    onChange: ChangeHandler,
    onBlur: ChangeHandler,
    name: string,

    defaultValue?: string,
    type?: 'text' | 'number',
    theme?: 'default' | 'primary'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    id,
    name, 
    onBlur, 
    onChange, 
    type = 'text', 
    theme = 'default', 
    defaultValue = ''
    }, ref
    ) => {
    return(
        <input defaultValue={defaultValue} id={id} name={name} onBlur={onBlur} onChange={onChange} type={type} ref={ref} className={`block p-2 ${theme === 'default' ? 'text-primary' : 'text-background'} w-full border ${theme === 'default' ? 'border-primary' : 'border-background'} bg-transparent rounded h-12 ${theme === 'default' ? 'focus:outline-primary' : 'focus:outline-background'}`} />
    )
})