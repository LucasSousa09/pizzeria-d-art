type FooterSpanProps = {
    footerText: string
}

export function FooterSpan({ footerText }: FooterSpanProps) {
    return (
        <span className="text-center text-sm">
            {footerText}
        </span>
    )
}