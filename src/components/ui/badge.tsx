import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "outline" | "warning";
}

const Badge = ({ className, variant = "default", ...props }: BadgeProps) => (
    <span
        className={twMerge(
            "inline-flex min-h-7 items-center justify-center rounded-sm px-2.5 text-xs font-bold tracking-wide",
            variant === "default" && "bg-[#d50000] text-white",
            variant === "outline" && "border border-white/20 bg-white/[0.04] text-[#f7f7f7]",
            variant === "warning" && "bg-[#eab308] text-black",
            className,
        )}
        {...props}
    />
);

export default Badge;
