import './Auth.css';

import { useState } from 'react';

// component
import Loading from '../../components/Loading/Loading';

const Register = ({ onSubmit }) => {

    const [loading, setLoading] = useState(false); 
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()

        setLoading(true)

        
        setTimeout( () => {
            
            onSubmit({ nome });

            const userDados = { nome, password, email };
            localStorage.setItem('Dados', JSON.stringify(userDados));

            setNome('');
            setSobrenome('');
            setEmail('');
            setPassword('');

            setLoading(false)
        },1000);    
    }

    return (
        <>
            {loading && <Loading />}

            <div className='form'>
                <h2>Cadastra-se</h2>
                <form onSubmit={handleSubmit}>
                    <label>Nome</label>
                    <input type="text" placeholder='Insira seu nome' value={nome} onChange={(e) => setNome(e.target.value)} required />
                    <label>Sobrenome</label>
                    <input type="text" placeholder='Insira seu sobrenome' value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} required />
                    <label>Senha</label>
                    <input type="password" placeholder='Insira sua senha' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <label>E-mail</label>
                    <input type="text" placeholder='Insira seu e-mail' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <button type='submit'>Registrar</button>
                </form>
            </div>
        </>
    )
}

export default Register