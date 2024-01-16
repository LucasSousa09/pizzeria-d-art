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
                defaultValue={id}
                onClick={() => setIsActive(id)}
                disabled={id === 'debit'}
            /> 
            <label 
                className={`relative group font-medium text-center text-white text-sm sm:text-2xl peer-checked:text-primary peer-checked:bg-white peer-disabled:bg-background peer-disabled:cursor-not-allowed cursor-pointer flex justify-center items-center gap-3 w-full h-full p-3 ${isActive === id ? 'is-active': ''}`} 
                htmlFor={id}
            >
                {
                    id === 'debit' && (
                        <>
                            <span 
                                className="invisible group-hover:visible absolute top-[60px] rotate-45 h-2 w-2 bg-slate-600"
                            />
                            <span 
                                className="invisible group-hover:visible text-sm absolute top-16 bg-slate-600 px-2 rounded"
                            >
                                Indisponível no momento
                            </span>
                        </>
                    )
                }
                {children}
            </label>
        </div>
    )
})