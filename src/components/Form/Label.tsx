type LabelProps = {
    idFor: string,
    text: string

    theme?: 'default' | 'primary'
}

export function Label({ idFor, text, theme = 'default' }: LabelProps){
    return (
        <label className={`${theme === 'default' ? 'text-primary' : 'text-background'} font-medium text-base md:text-lg xl:text-xl leading-tight`} htmlFor={idFor}>{text}</label>
    )    
}