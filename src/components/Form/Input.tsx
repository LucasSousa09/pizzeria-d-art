import { forwardRef } from "react"
import { ChangeHandler } from "react-hook-form"

type InputProps = {
    id: string,
    onChange: ChangeHandler,
    onBlur: ChangeHandler,
    name: string,

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
    ...rest
    }, ref
    ) => {
    return(
        <>
            <input 
                id={id} 
                name={name} 
                onBlur={onBlur} 
                onChange={onChange} 
                type={type} 
                ref={ref}
                {...rest}
                className={`peer disabled:cursor-not-allowed disabled:filter disabled:brightness-75 block p-2 ${theme === 'default' ? 'text-primary' : 'text-background'} w-full border ${theme === 'default' ? 'border-primary' : 'border-background'} bg-transparent rounded h-12 ${theme === 'default' ? 'focus:outline-primary' : 'focus:outline-background'}`}
            />
            {
                id !== 'email' && (
                    <span
                        className="hidden peer-disabled:peer-hover:inline absolute bg-slate-600 text-white px-2 text-center rounded z-10"
                    >
                        {'Para realizar alteração, por favor acesse: Meu Perfil > Mais informações'}
                    </span>
                )
            }
        </>
    )
})