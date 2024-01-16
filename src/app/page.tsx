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
      <strong 
        className="flex items-center justify-center sm:gap-3 md:gap-6 mx-auto mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-16 text-primary font-semibold text-2xl sm:text-3xl md:text-5xl" 
      >
        Peça a sua pizza agora 
        <CaretDoubleDown className="h-7 sm:h-9 md:h-14" weight="bold" size={56}/> 
      </strong>
      <CardContainer />
    </main>
  )
}