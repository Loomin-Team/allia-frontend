import React from 'react'

interface FeatureCardProps {
    title: string
    description: string
    icon: React.ReactNode
}

const FeatureCard: React.FC<FeatureCardProps> = ({title, description, icon}) => {
    return (
        <div className={"px-5 py-10 rounded-3xl bg-tertiary w-[315px] space-y-5 flex flex-col justify-center items-center"}>
            {icon}
            <h3 className={"w-52"}>{title}</h3>
            <p className={"text-foreground-secondary text-xl text-center"}>{description}</p>

        </div>
    )
}
export default FeatureCard
