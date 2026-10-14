import { MonthOption } from "../../utils/schedule";

interface FilterMonthProps {
    months: MonthOption[];
    value: string;
    onChange: (selectedMonth: string) => void;
}

const FilterMonth = ({ months, value, onChange }: FilterMonthProps) => (
    <select
        value={value}
        className="border-1 text-white focus:outline-none border-[#151313] cursor-pointer p-3"
        onChange={(event) => onChange(event.target.value)}
    >
        {months.map((month) => (
            <option className="text-black" key={month.key} value={month.key}>
                {month.label}
            </option>
        ))}
    </select>
);

export default FilterMonth;
