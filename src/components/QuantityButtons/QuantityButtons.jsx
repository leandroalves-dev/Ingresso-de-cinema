import './QuantityButtons.css';

const QuantityButtons = ({ quantity, onIncrement, onDecrement, disabled }) => {
    return (
        <div className="btns-quantity">
            <button className='btn-minus' onClick={onDecrement}>-</button>
            <span>{quantity}</span>
            <button className='btn-plus' onClick={onIncrement} disabled={disabled}>+</button>
        </div>
    )
}

export default QuantityButtons