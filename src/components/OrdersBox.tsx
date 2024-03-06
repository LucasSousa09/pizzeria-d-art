import { Order } from "./Order";

type Order = {
    id: string;
    pizzas: string;
    firstPizzaImg: string;
    createdAt: Date;
    totalPrice: number;
    paymentMethod: string;
    successfull: string;
    orderId: string;
}

type OrderBoxProps = {
    orders: Order[]
}

const payment = {
    money: 'Dinheiro',
    pix: 'PIX',
    credit: 'Cartão de Crédito',
}

const pizzaStatus = {
    pending: 'Em andamento',
    finished: 'Concluída',
    canceled: 'Cancelada'
}

export function OrdersBox({orders}: OrderBoxProps){
    return (
        <>
            {
                orders.length > 0 && (
                    orders.map(order => <Order 
                                            key={order.id} 
                                            createdAt={order.createdAt} 
                                            pizzaImage={order.firstPizzaImg} 
                                            totalPrice={order.totalPrice} 
                                            paymentType={payment[order.paymentMethod as 'money' | 'credit' | 'pix'] }
                                            pizzas={JSON.parse(order.pizzas)}
                                            status={pizzaStatus[order.successfull as 'pending' | 'finished'| 'canceled']}
                                        />)
                ) 
            }
        </>
    )
}