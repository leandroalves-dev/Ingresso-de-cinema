import { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "default" | "outline" | "ghost" | "icon";
type ButtonSize = "sm" | "md" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
    default: "bg-[#d50000] text-white shadow-[0_0_14px_rgba(255,0,20,0.2)] hover:bg-[#ff252d]",
    outline: "border border-white/15 bg-white/[0.03] text-[#f7f7f7] hover:border-[#ff252d]/70 hover:bg-[#ff252d]/10",
    ghost: "text-[#b9b9b9] hover:bg-white/[0.06] hover:text-white",
    icon: "bg-[#d50000] text-white hover:bg-[#ff252d]",
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: "min-h-9 px-3 text-xs",
    md: "min-h-11 px-4 text-sm",
    icon: "size-11 p-0",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "md", type = "button", ...props }, ref) => (
        <button
            ref={ref}
            type={type}
            className={twMerge(
                "inline-flex items-center justify-center gap-2 rounded-sm font-semibold tracking-wide transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40",
                variantClasses[variant],
                sizeClasses[size],
                className,
            )}
            {...props}
        />
    ),
);

Button.displayName = "Button";

export default Button;
