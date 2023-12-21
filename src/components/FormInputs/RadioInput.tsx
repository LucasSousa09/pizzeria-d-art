import { Dispatch, ReactNode, SetStateAction, forwardRef, useState } from "react"
import { ChangeHandler } from "react-hook-form"

type RadioInputProps = {
    id: string,
    children: ReactNode,

    onChange: ChangeHandler
    onBlur: ChangeHandler
    name: string

    isActive: string
    setIsActive: Dispatch<SetStateAction<string>>
}

export const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(({ id, children, onChange, onBlur, name, isActive, setIsActive}, ref ) => {
    
    
    return (
        <div className="border border-background rounded">
            <input 
                id={id} 
                className="hidden peer" 
                type="radio" 
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}

                onClick={() => setIsActive(id)}
            /> 
            <label className={`cursor-pointer p-3 group ${isActive === id ? 'is-active': ''}  peer-checked:text-primary peer-checked:bg-white flex justify-center items-center gap-3 text-white w-full h-full text-2xl font-medium`} htmlFor={id}>{children}</label>
        </div>
    )
})