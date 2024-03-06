import { FormAddress } from "@/components/Form/FormAddress";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default async function AddAdress(){
    return (
        <>
            <div className="mt-5 mb-6 flex items-center gap-6">
                <Link href="/profile">
                    <ArrowLeft className="text-primary h-6 w-6 hover:opacity-80" weight="bold" />
                </Link>
                <h1 className="text-3xl md:text-4xl xl:5xl text-primary font-bold">Novo Endereço</h1>
            </div>
            
            <FormAddress
                id={""}
                street={""}
                district={""}
                zipCode={""}
                houseNumber={0}
                complement={""}
                city={""}
                state={""}
                reference={""}
                mainAddress={false}
            />
        </>
    )
}