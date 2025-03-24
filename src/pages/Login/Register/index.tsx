
import { useEffect } from "react";

//components
import Input from "../../../components/Input";
import Message from "../../../components/Message";
import Loading from '../../../components/Loading';

//hooks
import useAuth from "../../../hooks/useAuth";


interface ModalProps {
    onType: (type: string) => void;
    onSuccess?: () => void;
}

const Register = ({ onType, onSuccess }: ModalProps) => {

    const {loading, name, setName, lastName, setLastName, email, setEmail, password, setPassword, error, success, handleSubmitRegister} = useAuth()


    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                onSuccess?.();
            }, 1000);

            return () => clearTimeout(timer); 
        }
    }, [success, onSuccess]);
    return (
        <>

            {loading && <Loading />}

            <form onSubmit={handleSubmitRegister}>
                <Input                    
                    label='Nome'
                    type="text"
                    placeholder="Insira seu nome"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                />
                <Input                    
                    label='Sobrenome'
                    type="text"
                    placeholder="Insira seu sobrenome"
                    value={lastName}
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                />
                <Input                    
                    label='E-mail'
                    type="email"
                    placeholder="Insira seu email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input                    
                    label='Senha'
                    type="password"
                    placeholder="Insira sua senha"
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Message message={error} type='error' />}
                {success && <Message message={success} type="success" />}

                <button className="bg-red-700 p-1 px-3 my-3 rounded-[3px] cursor-pointer hover:opacity-90" type="submit">Registrar</button>
            </form>
            <p>Já tem conta? <span className="text-red-700 hover:underline cursor-pointer" onClick={() => onType('login')}>Entrar</span></p>
        </>
    )
}
  
export default Register
  