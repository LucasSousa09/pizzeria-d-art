type InputProps = {
    id: string
    title: string

    type?: 'textarea'
    size?: 'xs' | 'sm'
    rowSpan?: boolean
}

export function Input({ id, title, size, type, rowSpan = false }: InputProps){
    return(
        <div className={`mt-8 space-y-2 ${size === 'xs' && 'w-24'} ${size === 'sm' && 'w-[126px]'} ${!!rowSpan && 'row-span-2'}`}>
            <label className="text-primary font-medium text-2xl leading-tight" htmlFor={id}>{title}</label>
            {
                type === 'textarea' ?
                <textarea id={id} className="p-2 text-primary h-[calc(100%-38px)] w-full bg-background border border-primary rounded resize-none" /> :
                <input className="block p-2 text-primary w-full bg-background border border-primary rounded h-12" id={id} type="text" />
            }        
        </div>
    )
}