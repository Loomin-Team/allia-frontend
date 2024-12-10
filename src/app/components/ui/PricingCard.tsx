import React from 'react'
import Button from "@/app/components/ui/Button";

interface PricingCardProps {
    title: string,
    type: string,
    description: React.ReactNode,
    buttonText: string
    buttonAction: () => void
}

const PricingCard: React.FC<PricingCardProps> = ({title, type, description, buttonText, buttonAction}) => {
    return (
        <div className={"bg-tertiary rounded-3xl py-10 flex flex-col justify-center items-center w-full max-w-[480px]"}>
            <h2 className={"text-primary mb-3"}>{type}</h2>
            <h2 className={"mb-4"}>{title}</h2>
            <div className={"h-[180px] sm:w-[400px] mb-5 text-center"}>
                {description}
            </div>
            <Button className={"w-44"} text={buttonText} style={"PRIMARY"} onClick={buttonAction}/>
        </div>
    )
}
export default PricingCard
