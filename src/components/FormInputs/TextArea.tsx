import { forwardRef } from "react"
import { ChangeHandler } from "react-hook-form"

type TextAreaProps = {
    id: string,
    onChange: ChangeHandler,
    onBlur: ChangeHandler,
    name: string
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props: TextAreaProps, ref ) => {
    return (
        <textarea {...props} ref={ref} className="p-2 text-primary h-[calc(100%-38px)] w-full bg-background border border-primary rounded resize-none focus:outline-primary" />
    )
})