import { stripe } from "../lib/stripe";

import { Card } from "./Card";
import Stripe from "stripe";

async function getPizzasFromStripe(){
    const product = await stripe.products.list({
        expand: ['data.default_price']
    })

    const pizzas = product.data.map(pizza => {
        const price = pizza.default_price as Stripe.Price

        return {
            id: pizza.id,
            name: pizza.name,
            price: price.unit_amount || 0,
            image: pizza.images[0]
        }
    })

    return pizzas
}


export async function CardContainer(){
    const pizzas = await getPizzasFromStripe()

    return (
        <div className="grid grid-cols-4 max-w-[1456px] items-center justify-center mb-16 mx-auto gap-20">
           {
            pizzas.length > 0 ?
            pizzas.map(pizza => {
                return (
                    <Card key={pizza.id} pizzaName={pizza.name} price={pizza.price} pizzaImg={pizza.image} />
                )
            }) :
            <strong>Não há pizzas cadastradas</strong>
           }
        </div>
    )
}