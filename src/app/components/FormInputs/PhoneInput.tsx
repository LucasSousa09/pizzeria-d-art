import { forwardRef } from "react"
import { ChangeHandler } from "react-hook-form"

import { IMaskInput } from 'react-imask'

type InputProps = {
    id: string,
    onChange: ChangeHandler,
    onBlur: ChangeHandler,
    name: string,
    type?: 'text' | 'number'
}

export const PhoneInput = forwardRef<HTMLInputElement, InputProps>(({id, name, onBlur, onChange, type = 'text'}, ref) => {
    return(
        <IMaskInput
            mask="(00)00000-0000"
            id={id} 
            name={name} 
            onBlur={onBlur} 
            onChange={onChange} 
            type={type}
            inputRef={ref} 
            className="block p-2 text-primary w-full bg-background border border-primary rounded h-12 focus:outline-primary"
        />
    )
})