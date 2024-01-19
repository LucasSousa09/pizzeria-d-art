import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    const body: {
      listItems: {
        price: string, 
        quantity: number
      }[],
      data: {
        orderId: {
          id: string
        }
      }
    } = await req.json()

    try {
      const session = await stripe.checkout.sessions.create({
          line_items: body.listItems.map((lineItem: {price: string, quantity: number}) => lineItem ),
          mode: 'payment',
          success_url: `https://pizzeria-d-art.vercel.app/success?session_id={CHECKOUT_SESSION_ID}&order_id=${body.data.orderId.id}`,
          cancel_url: `https://pizzeria-d-art.vercel.app/checkout`,
        });
      
        return Response.json({checkoutSession: session.url})
    }
    catch(err){
      return new Response('Failure at creating session', {
        status: 402
      })
    }
}