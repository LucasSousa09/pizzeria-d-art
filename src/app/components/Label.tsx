type LabelProps = {
    idFor: string,
    text: string
}

export function Label({ idFor, text }: LabelProps){
    return (
        <label className="text-primary font-medium text-2xl leading-tight" htmlFor={idFor}>{text}</label>
    )
        
}