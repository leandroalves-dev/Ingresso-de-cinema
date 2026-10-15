import { MonthOption } from "../../utils/schedule";
import { CalendarDays, ChevronDown } from "lucide-react";

interface FilterMonthProps {
    months: MonthOption[];
    value: string;
    onChange: (selectedMonth: string) => void;
}

const FilterMonth = ({ months, value, onChange }: FilterMonthProps) => (
    <label className="relative flex min-w-44 items-center gap-2 rounded-sm border border-white/15 bg-white/[0.04] px-3 text-sm text-[#f7f7f7] transition-colors focus-within:border-[#32dfff]/70">
        <CalendarDays size={16} className="shrink-0 text-[#32dfff]" />
        <select value={value} className="w-full cursor-pointer appearance-none bg-transparent py-3 pr-5 outline-none" onChange={(event) => onChange(event.target.value)} aria-label="Selecionar mês">
            {months.map((month) => <option className="bg-[#17191a] text-white" key={month.key} value={month.key}>{month.label}</option>)}
        </select>
        <ChevronDown size={16} className="pointer-events-none absolute right-3 text-[#818181]" />
    </label>
);

export default FilterMonth;
