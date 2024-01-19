import { cache } from "react";
import { stripe } from "../lib/stripe";

import { Card } from "./Card";
import Stripe from "stripe";

export const revalidate = 3600 

const getPizzasFromStripe = cache(async () => {
    const product = await stripe.products.list({
        expand: ['data.default_price']
    })

    const { data } = product

    return data
})

export async function CardContainer(){
    const pizzasData = await getPizzasFromStripe()
    
    const pizzas = pizzasData.map(pizza => {
        const price = pizza.default_price as Stripe.Price

        return {
            id: price.id,
            name: pizza.name,
            price: price.unit_amount || 0,
            image: pizza.images[0]
        }
    })

    return (
        <div className="grid xs:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 content-center justify-items-center gap-y-10 xs:gap-2 sm:gap-10 md:gap-4 lg:gap-12 2xl:gap-20 max-w-[1456px] xs:px-2 mb-16 2xl:mx-auto">
           {
            pizzas.length > 0 ?
            pizzas.map(pizza => {
                return (
                    <Card key={pizza.id} id={pizza.id} pizzaName={pizza.name} price={pizza.price} pizzaImg={pizza.image} />
                )
            }) :
            <strong>Não há pizzas cadastradas</strong>
           }
        </div>
    )
}