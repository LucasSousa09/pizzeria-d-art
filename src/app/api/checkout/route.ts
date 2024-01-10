import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    const body = await req.json()

    const session = await stripe.checkout.sessions.create({
        line_items: body.map((lineItem: {price: string, quantity: number}) => lineItem ),
        mode: 'payment',
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/checkout`,
      });

    return Response.json({checkoutSession: session.url})
}