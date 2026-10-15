import { ShoppingCart } from "lucide-react";

import Button from "../ui/button";

interface ScreeningTimeButtonProps {
    language: string;
    time: string;
    onSelect: () => void;
}

const ScreeningTimeButton = ({ language, time, onSelect }: ScreeningTimeButtonProps) => (
    <div className="screening-time-button flex min-h-6 items-center overflow-hidden rounded-sm border border-[#ff252d] bg-[#1b1112] shadow-[0_0_6px_rgba(255,37,45,0.7),0_0_16px_rgba(255,37,45,0.25)] transition-shadow hover:shadow-[0_0_9px_rgba(255,37,45,0.9),0_0_20px_rgba(255,37,45,0.34)] lg:min-h-9">
        <span className="w-9 shrink-0 px-1.5 text-[0.6rem] font-semibold text-[#f7f7f7] sm:w-10 lg:w-12 lg:px-2 lg:text-[0.68rem]">{language === "dub" ? "Dub" : "Leg"}</span>
        <span className="flex-1 border-l border-white/10 px-2 text-center text-xs text-[#f7f7f7] sm:px-3">{time}</span>
        <Button variant="icon" size="icon" onClick={onSelect} aria-label={`Comprar ingresso para ${time}`} className="size-6 rounded-none shadow-none lg:size-9">
            <ShoppingCart size={12} className="lg:h-[15px] lg:w-[15px]" />
        </Button>
    </div>
);

export default ScreeningTimeButton;
