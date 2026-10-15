import { useEffect, useId, useRef, useState } from "react";
import { MonthOption } from "../../utils/schedule";
import { ChevronDown } from "lucide-react";

interface FilterMonthProps {
    months: MonthOption[];
    value: string;
    onChange: (selectedMonth: string) => void;
}

const shortMonthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"] as const;

const getShortMonthLabel = (month: MonthOption): string => {
    const monthNumber = Number(month.key.split("-")[1]);
    const year = month.key.split("-")[0];
    const shortMonth = shortMonthNames[monthNumber - 1];

    return shortMonth ? `${shortMonth} ${year}` : month.label;
};

const FilterMonth = ({ months, value, onChange }: FilterMonthProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const listboxId = useId();
    const selectedMonth = months.find((month) => month.key === value) ?? months[0];

    useEffect(() => {
        if (!isOpen) return;

        const handlePointerDown = (event: PointerEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const handleSelect = (month: MonthOption) => {
        onChange(month.key);
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} className="month-filter relative block w-40 shrink-0 text-sm text-[#f7f7f7]">
            <button
                type="button"
                className="month-select month-select-trigger flex w-full cursor-pointer items-center justify-between rounded-sm border-0 bg-transparent py-3 pl-4 pr-3 text-left outline-none focus:border-0 focus:outline-none focus:ring-0"
                onClick={() => setIsOpen((open) => !open)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={listboxId}
                aria-label="Selecionar mês"
            >
                <span className="truncate">{selectedMonth ? getShortMonthLabel(selectedMonth) : ""}</span>
                <ChevronDown size={16} className={`shrink-0 text-[#818181] transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>

            {isOpen && (
                <ul id={listboxId} className="month-select-options absolute left-0 top-[calc(100%+0.35rem)] z-[70] w-full" role="listbox" aria-label="Meses disponíveis">
                    {months.map((month) => (
                        <li key={month.key} role="presentation">
                            <button type="button" role="option" aria-selected={month.key === value} className="month-select-option w-full text-left" onClick={() => handleSelect(month)}>
                                {getShortMonthLabel(month)}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FilterMonth;
