import { ReactNode } from "react";

    interface InputProps{
        label: string;
        type: string;
        name: string;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
        placeholder?: string;
        icon?: ReactNode
    }


    const Input = ({ label, type, name, value, onChange, placeholder, icon }: InputProps) => {
        return (
            <div className="flex flex-col mb-2">
                <label className="text-gray-200 mb-1 flex flex-row items-center">
                    {icon && <span className="text-white mr-2">{icon}</span>}
                    {label}
                </label>
                
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className='border-neutral-900 border-1 p-1.5 focus:outline-none text-sm bg-neutral-950'
                />
            </div>
        )
    }

    export default Input