import { PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { ProfileBox } from "../components/ProfileBox";
import Link from "next/link";
import { PurchasedItem } from "../components/PurchasedItem";

export default function Profile(){
    return (
        <div className="flex flex-col items-center justify-start h-[calc(100vh-250px)]">
            <h1 className="mt-5 text-5xl text-primary font-bold">Meu Perfil</h1>

            <ProfileBox label='Minhas Compras'>
                <PurchasedItem />
            </ProfileBox>

            <ProfileBox label='Informações Pessoais'>
                <Link href='/profile-details' className="bg-primary text-white px-5 py-3 font-medium text-2xl flex gap-3 items-center rounded">
                   <PencilSimple weight="bold" size={28} /> Mais Informações
                </Link>
            </ProfileBox>
        </div>
    )
}