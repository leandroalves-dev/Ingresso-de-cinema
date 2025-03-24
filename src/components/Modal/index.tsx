import { ReactNode } from "react"
import { twMerge } from "tailwind-merge";

interface ModalProps {
    title: string; 
    children: ReactNode;
    className?: string;
}

const Modal = ({ title, children, className }: ModalProps) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50" style={{ background: "rgba(0,0,0,0.9)" }}>
            <div className={twMerge("relative border-neutral-900 border p-5 bg-black text-white max-w-[350px] w-full", className)}>
                <h2 className="text-2xl mb-3 border-b-neutral-900 border-b-1 pb-2 leading-7">{title}</h2>
                {children}
            </div>
        </div>
    )
}

export default Modal
