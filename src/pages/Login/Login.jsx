import './Auth.css';
import { useState } from 'react';

// icons
import { BsEnvelopeAt, BsLock } from 'react-icons/bs'

// component
import Loading from '../../components/Loading/Loading';

const Login = ({onLoginSuccess}) => {
    
    const [loading, setLoading] = useState(false); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault()

        setLoading(true)

        setTimeout( () => {

            const storedUserData = JSON.parse(localStorage.getItem('Dados'));
 
            if (storedUserData) {
                if (storedUserData.email === email && storedUserData.password === password) {
                    setErrorMessage('');
                    onLoginSuccess(storedUserData.nome); 
                } else {
                    setErrorMessage('E-mail ou senha incorretos.');
                }
            } else {
                setErrorMessage('Usuário não encontrado');
            }

            setLoading(false)
        },1000); 
    }

    return (

        <>
            {loading && <Loading />}

            <div className='form'>
                <h2>Faça seu login</h2>
                    <form onSubmit={handleSubmit}>
                        <label><BsEnvelopeAt /> E-mail</label>
                        <input type="text" placeholder='Insira seu e-mail' onChange={(e) => setEmail(e.target.value)} required />
                        <label><BsLock /> Senha</label>
                        <input type="password" placeholder='Insira sua senha' onChange={(e) => setPassword(e.target.value)} required />
                        <button type='submit'>Entrar</button>
                    </form>
                    {errorMessage && <p className="error">{errorMessage}</p>}
            </div>
        </>
       
    )

}

export default Login