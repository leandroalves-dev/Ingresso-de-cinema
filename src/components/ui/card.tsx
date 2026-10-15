import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div className={twMerge("surface-card rounded-sm", className)} {...props} />
);

const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div className={twMerge("p-5", className)} {...props} />
);

export { Card, CardContent };
