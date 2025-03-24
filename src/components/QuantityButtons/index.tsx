interface QuantityButtonProps{
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
    disabled?: boolean;
}


const QuantityButtons = ({ quantity, onIncrement, onDecrement, disabled}: QuantityButtonProps) => {
    return (
        <div className="w-24 flex justify-between items-center">
            <button onClick={onDecrement} className={`bg-neutral-950 border-1 border-neutral-800 px-2.5 py-0.5 cursor-pointer`}>-</button>
            <span className="px-2">{quantity}</span>
            <button onClick={onIncrement} className={`bg-neutral-950 border-1 border-neutral-800 px-2.5 py-0.5 ${disabled ? 'opacity-20 cursor-not-allowed' : ' cursor-pointer' }`} disabled={disabled}>+</button>
        </div>
    )
}

export default QuantityButtons
