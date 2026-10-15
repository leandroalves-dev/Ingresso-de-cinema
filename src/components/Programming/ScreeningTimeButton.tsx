import { ShoppingCart } from "lucide-react";

import Button from "../ui/button";

interface ScreeningTimeButtonProps {
    language: string;
    time: string;
    onSelect: () => void;
}

const ScreeningTimeButton = ({ language, time, onSelect }: ScreeningTimeButtonProps) => (
    <div className="flex min-h-10 items-center overflow-hidden rounded-sm border border-[#ff252d]/75 bg-[#1b1112] shadow-[0_0_10px_rgba(255,37,45,0.16)] transition-shadow hover:shadow-[0_0_14px_rgba(255,37,45,0.3)]">
        <span className="w-12 shrink-0 px-2 text-[0.68rem] font-semibold uppercase tracking-wide text-[#f7f7f7] sm:w-14 sm:text-xs">{language === "dub" ? "Dub" : "Leg"}</span>
        <span className="flex-1 border-l border-white/10 px-2 text-center text-xs text-[#f7f7f7] sm:px-3">{time}</span>
        <Button variant="icon" size="icon" onClick={onSelect} aria-label={`Comprar ingresso para ${time}`} className="size-10 rounded-none shadow-none">
            <ShoppingCart size={16} />
        </Button>
    </div>
);

export default ScreeningTimeButton;
