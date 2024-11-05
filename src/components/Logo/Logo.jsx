import './Logo.css';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'; 

//ContextAPi 
import { PaymentContext } from '../../context/PaymentContext';

const Logo = () => {

    const navigate = useNavigate();
    const { resetPaymentData } = useContext(PaymentContext);

    const handleBackHome = () => {
        resetPaymentData();
        navigate('/')
    }

    return (
        <div className='logo'>
            <div onClick={handleBackHome}><img src={logo} alt='Cine+ - A diversão começa aqui' /></div> 
        </div>
    )
}

export default Logo