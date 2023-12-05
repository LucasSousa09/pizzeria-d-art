type TextAreaProps = {
    id:  string
}

export function TextArea({id}: TextAreaProps ){
    return (
        <textarea id="reference" className="p-2 text-primary h-[calc(100%-38px)] w-full bg-background border border-primary rounded resize-none" />
    )
}