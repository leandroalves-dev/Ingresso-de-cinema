
const getCurrentMonths = () => {
    const allMonths = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Junho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

    const currentMonthIndex = new Date().getMonth();
    return allMonths.slice(currentMonthIndex)
}

interface FilterMonthProps {
    onChange?: (selectedMonth: string) => void;
}

const FilterMonth = ({onChange}: FilterMonthProps) => {

    const months = getCurrentMonths();

    return (
        <select className="border-1 text-white focus:outline-none border-[#151313] cursor-pointer p-3" onChange={(e) => onChange && onChange(e.target.value)}>
            {months.map((month, index) => (
                <option className="text-black" key={index} value={month}>{month}</option>
            ))}
        </select>
    )
}

export default FilterMonth
