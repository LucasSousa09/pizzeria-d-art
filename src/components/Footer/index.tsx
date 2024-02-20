import { FooterSpan } from './FooterSpan'

export function Footer(){
    return (
        <footer className=" bg-primary text-white w-full mx-auto flex flex-col items-center justify-center gap-1 pt-5 pb-6 border-t-[3px] border-primary">
            <FooterSpan footerText='Rua Lugar Nenhum 17843, Bairro Desconhecido, Univeso72 UN72' />
            <FooterSpan footerText='Telefone 57321568495132' />
            <FooterSpan footerText='@copyright rodrigueslucas | Todos os direitos reservados' />
        </footer>
    )
}