import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    const body = await req.json()

    try {
      const session = await stripe.checkout.sessions.create({
          line_items: body.map((lineItem: {price: string, quantity: number}) => lineItem ),
          mode: 'payment',
          success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `http://localhost:3000/checkout`,
        });
      
        return Response.json({checkoutSession: session.url})
    }
    catch(err){
      return new Response('Failure at creating session', {
        status: 402
      })
    }
}