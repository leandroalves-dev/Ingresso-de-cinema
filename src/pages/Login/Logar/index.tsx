import { useEffect } from 'react';

// icons
import { BsEnvelopeAt, BsLock } from 'react-icons/bs'

//components
import Input from "../../../components/Input";
import Message from '../../../components/Message';
import Loading from '../../../components/Loading';

//hooks
import useAuth from "../../../hooks/useAuth";

interface ModalProps{
    onType: (type: string) => void;
    onSuccess?: () => void;
}

const Logar = ({ onType, onSuccess }: ModalProps) => {

    const {loading, email, setEmail, password, setPassword, error, success, handleSubmitLogin} = useAuth()

    
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                onSuccess?.(); // Fecha o modal apenas se a função for passada
            }, 1000);

            return () => clearTimeout(timer); // Limpa o timer se o componente desmontar
        }
    }, [success, onSuccess]);

    return (
        
            <>

                {loading && <Loading />}

                <form onSubmit={handleSubmitLogin}>
                    <Input 
                        icon={<BsEnvelopeAt />}                   
                        label='E-mail'
                        type="email"
                        placeholder="Insira seu email"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input 
                        icon={<BsLock />}                       
                        label='Senha'
                        type="password"
                        placeholder="Insira sua senha"
                        value={password}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <Message message={error} type='error' />}
                    {success && <Message message={success} type='success' />}
                    <button className="bg-red-700 p-1 px-3 my-3 rounded-[3px] cursor-pointer hover:opacity-90" type="submit">Entrar</button>
                </form>
                <p>Não tem conta? <span className="text-red-700 hover:underline cursor-pointer" onClick={() => onType('register')}>Cadastre-se</span></p>
            </>
        
    )
}

export default Logar
