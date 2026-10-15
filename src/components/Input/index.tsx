import { ReactNode, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    icon?: ReactNode;
    autoComplete?: string;
    showPasswordToggle?: boolean;
}

const Input = ({ label, type, name, value, onChange, placeholder, icon, autoComplete, showPasswordToggle = false }: InputProps) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPasswordToggle && passwordVisible ? "text" : type;

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#b9b9b9]">
                {icon && <span className="text-[#32dfff]" aria-hidden="true">{icon}</span>}
                {label}
            </label>
            <div className="relative">
                <input id={name} type={inputType} name={name} value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} className="min-h-11 w-full rounded-sm border border-white/15 bg-black/25 px-3 text-sm text-[#f7f7f7] outline-none transition-colors placeholder:text-[#818181] focus:border-[#32dfff]/75 focus:ring-1 focus:ring-[#32dfff]/25" />
                {isPassword && showPasswordToggle && (
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#818181] transition-colors hover:text-white" onClick={() => setPasswordVisible((visible) => !visible)} aria-label={passwordVisible ? "Ocultar senha" : "Mostrar senha"}>
                        {passwordVisible ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;
