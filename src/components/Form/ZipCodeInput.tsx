import { forwardRef } from "react"
import { IMaskInput } from 'react-imask'
import { ChangeHandler } from "react-hook-form"


type InputProps = {
    id: string,
    onChange: ChangeHandler,
    onBlur: ChangeHandler,
    name: string,
    type?: 'text' | 'number'
}

export const ZipCodeInput = forwardRef<HTMLInputElement, InputProps>(({id, name, onBlur, onChange, type = 'text'}, ref) => {
    return(
        <IMaskInput
            mask="00000-000"
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