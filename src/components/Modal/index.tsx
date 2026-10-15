import { ReactNode } from "react"
import { twMerge } from "tailwind-merge";

interface ModalProps {
    title: string; 
    children: ReactNode;
    className?: string;
}

const Modal = ({ title, children, className }: ModalProps) => {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm">
            <div className={twMerge("relative max-h-[92vh] w-full max-w-[350px] overflow-y-auto rounded-sm border border-white/10 bg-[#101111] p-6 text-white shadow-2xl", className)}>
                <h2 className="mb-5 border-b border-white/10 pb-3 text-xl font-semibold leading-7">{title}</h2>
                {children}
            </div>
        </div>
    )
}

export default Modal
