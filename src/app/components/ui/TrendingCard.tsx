import React from "react";

interface TrendingCardProps {
  title: string;
  description: string;
  percentage: number;
}

const TrendingCard: React.FC<TrendingCardProps> = ({
  title,
  description,
  percentage,
}) => {
  return (
    <div className={"bg-tertiary p-5 rounded-3xl max-w-[480px] mx-4 sm:mx-0"}>
      <div className={"flex flex-row justify-between"}>
        <h4 className={"max-w-[178px] text-start"}>{title}</h4>
        <div className={"flex flex-col justify-top items-end"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M2.5 14.1668L7.5 9.16683L10.8333 12.5002L17.5 5.8335"
              stroke="#6B71FD"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.1667 5.8335H17.5001V9.16683"
              stroke="#6B71FD"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className={"text-primary text-3xl font-bold"}>{percentage}%</p>
        </div>
      </div>
      <p className={"text-foreground-secondary text-xl mt-5"}>{description}</p>
    </div>
  );
};
export default TrendingCard;
