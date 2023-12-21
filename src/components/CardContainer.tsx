import { prisma } from "../lib/prisma";
import { Card } from "./Card";

async function getPizzasData(){
    const pizzasData = await prisma.pizza.findMany()

    return pizzasData
}

export async function CardContainer(){
    const pizzas = await getPizzasData()

    return (
        <div className="grid grid-cols-4 max-w-[1456px] items-center justify-center mb-16 mx-auto gap-20">
           {
            pizzas.length > 0 ?
            pizzas.map(pizza => {
                return (
                    <Card key={pizza.id} pizzaName={pizza.name} price={pizza.price} pizzaImg={pizza.img}  />
                )
            }) :
            <strong>Não há pizzas cadastradas</strong>
           }
        </div>
    )
}