import { useState } from 'react';

//icons
import { BsCreditCard, BsQrCode, BsJustify } from 'react-icons/bs';

//components
import CreditCardForm from '../../components/FormsPayments/CreditCardForm';
import BoletoForm from '../../components/FormsPayments/BoletoForm';
import PixForm from '../../components/FormsPayments/PixForm';

const Payments = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); 


    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
    };

    return (
        <div className='container-payments'>
            <h2>Escolha o método de pagamento</h2>

            <div className="formsPayments">
                <label>
                    <input type="radio" name="paymentMethod" value="cartao" checked={selectedPaymentMethod === 'cartao'} onChange={() => handlePaymentMethodChange('cartao')} />
                    <BsCreditCard /> Cartão de Crédito
                </label>

                <label>
                    <input type="radio" name="paymentMethod" value="boleto" checked={selectedPaymentMethod === 'boleto'} onChange={() => handlePaymentMethodChange('boleto')} />
                    <BsJustify /> Boleto
                </label>

                <label>
                    <input type="radio" name="paymentMethod" value="pix" checked={selectedPaymentMethod === 'pix'} onChange={() => handlePaymentMethodChange('pix')} />
                    <BsQrCode /> Pix
                </label>
            </div>

            {selectedPaymentMethod === 'cartao' && <CreditCardForm />}
            {selectedPaymentMethod === 'boleto' && <BoletoForm />}
            {selectedPaymentMethod === 'pix' && <PixForm />}
            
        </div>
    );
};

export default Payments;
