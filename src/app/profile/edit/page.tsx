import { Input } from "@/app/components/Input";

export default function EditProfile(){
    return (
        <form className='flex flex-col items-center gap-32' action="">
            <div className='mt-7 grid grid-rows-4 grid-flow-col max-w-[1321px] gap-x-[60px]'>
                <Input id="name" title="Name" />

                <Input id="cpf" title="Cpf" />

                <Input id="phone" title="Telefone" />

                <Input id="email" title="Email" />

                <Input id="street" title="Rua" />

                <Input id="district" title="Bairro" />

                <Input id="cep" title="Cep" />

                <div className="flex gap-7">
                    <Input id="number" title="Número" size='sm' />
                    <Input id="complement" title="Complemento"/>
                </div>

                <Input id="cidade" title="Cidade" />

                <Input size='xs' id="uf" title="UF" />

                <Input id="textarea" type="textarea" title="Ponto de referência" rowSpan />
            </div>


            <button type="submit" className="bg-primary text-white font-bold text-2xl px-4 py-3 rounded w-fit">Salvar Alterações</button>
        </form>
    )
}