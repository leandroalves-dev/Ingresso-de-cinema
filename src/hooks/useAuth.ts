import { useState, useEffect } from "react";

const useAuth = () => {

    const [loading, setLoading] = useState(false); 
    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [user, setUser] = useState('');

    // Carregar usuário do localStorage ao iniciar
    useEffect(() => {
        const dadosUser = localStorage.getItem("User");
        if (dadosUser) {
            const storedUser = JSON.parse(dadosUser);
            setUser(storedUser.name); 
        }
        
    }, []);
   

    const handleSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
    
            if(!name || !lastName || !password || !email ){
                setError('Todos os campos são obrigatórios')
                setSuccess('');
                return;
            }

            setLoading(true)
    
            const userDados = {name, lastName, password, email};
            localStorage.setItem('User', JSON.stringify(userDados));

            setUser(userDados.name);
    
            setError('');
            setSuccess('Registro realizado com sucesso!'); 
            
            setName('');
            setLastName('');
            setPassword('');
            setEmail('');
    }

    const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Todos os campos são obrigatórios");
            setSuccess("");
            return;
        }

        const userDados = localStorage.getItem("User");

        if (!userDados) {
            setError("Usuário não encontrado");
            setSuccess("");
            return;
        }

        const user = JSON.parse(userDados);

        if (user.email !== email || user.password !== password) {
            setError("E-mail ou senha inválidos");
            setSuccess("");
            return;
        }       

        setLoading(true)
        setSuccess("Login realizado com sucesso!");
        setError("");

        setUser(user.name);
    }
    

    // Limpa as mensagens depois de 2 segundos
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError("");
                setSuccess("");
                setLoading(false);
                if(success){
                    setModal(false)
                }
            
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [error, success]);

    return {
        loading,
        user,
        setUser,
        modal,
        setModal,
        name,
        setName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword,
        error,
        success,
        handleSubmitRegister,
        handleSubmitLogin,
    };
};

export default useAuth;
