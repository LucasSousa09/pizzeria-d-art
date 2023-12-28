type SeparatorProps = {
    backgroundColor?: string
}

export function Separator({backgroundColor}: SeparatorProps){
    return (
        <span className={`block h-[1px] w-full ${backgroundColor ? backgroundColor : 'bg-white'}`} />
    )
}