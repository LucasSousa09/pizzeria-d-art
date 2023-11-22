import { CardContainer } from "./components/CardContainer";
import { Slider } from "./components/Slider";

import { CaretDoubleDown } from '@phosphor-icons/react/dist/ssr'

export default function Home() {
  return (
    <main>
      <Slider />
      <strong className="flex gap-6 mx-auto mt-12 mb-16 font-semibold text-5xl text-primary items-center justify-center" >Peça a sua pizza agora <CaretDoubleDown weight="bold" size={56}/> </strong>
      <CardContainer />
    </main>
  )
}