import { stripe } from "@/lib/stripe"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const sessionId = request.nextUrl.searchParams.get('session_id')

    if(sessionId){
        try{
            const sessionData = await stripe.checkout.sessions.retrieve(sessionId)
            return Response.json({sessionStatus:sessionData.status, paymentStatus: sessionData.payment_status})
        }
        catch(err){
            return new Response('Session not found', {
                status: 404
            })
        }
    }
    else{
        return new Response('Session Id not found', {
            status: 404
        })
    }
}