type LabelProps = {
    idFor: string,
    text: string

    theme?: 'default' | 'primary'
}

export function Label({ idFor, text, theme = 'default' }: LabelProps){
    return (
        <label className={`${theme === 'default' ? 'text-primary' : 'text-background'} font-medium text-2xl leading-tight`} htmlFor={idFor}>{text}</label>
    )    
}