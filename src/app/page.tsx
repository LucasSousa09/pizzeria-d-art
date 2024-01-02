import { toast } from "react-toastify";
import { CardContainer } from "../components/CardContainer";
import { Slider } from "../components/Slider";

import { CaretDoubleDown } from '@phosphor-icons/react/dist/ssr'
import { ToastError } from "@/components/ToastError";

export default function Home({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  let error = ''

  if(searchParams.error === "checkout error"){
    error = "Por favor, abasteça o carrinho antes de realizar o checkout"
  }

  return (
    <main>
      <ToastError error={error} />
      <Slider />
      <strong className="flex gap-6 mx-auto mt-12 mb-16 font-semibold text-5xl text-primary items-center justify-center" >Peça a sua pizza agora <CaretDoubleDown weight="bold" size={56}/> </strong>
      <CardContainer />
    </main>
  )
}