import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import Logo from "../../assets/logo.png";

interface ModalProps {
    title: string;
    children: ReactNode;
    className?: string;
    description?: string;
    branded?: boolean;
}

const Modal = ({ title, children, className, description, branded = false }: ModalProps) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm">
        <div className={twMerge("relative max-h-[92vh] w-full max-w-[350px] overflow-y-auto rounded-sm border border-white/10 bg-[#101111] p-6 text-white shadow-2xl", branded && "max-h-none max-w-[430px] overflow-visible border-[#ff252d]/25 bg-[linear-gradient(145deg,rgba(23,25,26,0.98),rgba(11,12,12,0.98))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55),0_0_28px_rgba(255,0,20,0.08)] sm:p-8", className)}>
            {branded && (
                <div className="mb-5 border-b border-white/10 pb-5">
                    <img src={Logo} alt="CineSphere" className="mb-4 w-36" />
                    <p className="section-eyebrow mb-2">Experiência CineSphere</p>
                </div>
            )}
            <div className={branded ? "mb-5" : "mb-5 border-b border-white/10 pb-3"}>
                <h2 className="text-xl font-semibold leading-7 tracking-tight text-[#f7f7f7] sm:text-2xl">{title}</h2>
                {description && <p className="mt-2 text-sm leading-6 text-[#b9b9b9]">{description}</p>}
            </div>
            {children}
        </div>
    </div>
);

export default Modal;
