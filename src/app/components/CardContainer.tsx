import { Card } from "./Card";

export function CardContainer(){
    return (
        <div className="flex items-center justify-center mb-16 gap-20">
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    )
}