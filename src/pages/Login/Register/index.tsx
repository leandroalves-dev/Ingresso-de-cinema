import { useEffect } from "react";
import { ArrowRight, AtSign, LoaderCircle, LockKeyhole, UserRound } from "lucide-react";

import Input from "../../../components/Input";
import Message from "../../../components/Message";
import Button from "../../../components/ui/button";
import useAuth from "../../../hooks/useAuth";

interface ModalProps {
    onType: (type: string) => void;
    onSuccess?: () => void;
}

const Register = ({ onType, onSuccess }: ModalProps) => {
    const { loading, name, setName, lastName, setLastName, email, setEmail, password, setPassword, error, success, handleSubmitRegister } = useAuth();

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => onSuccess?.(), 1000);
            return () => clearTimeout(timer);
        }
    }, [success, onSuccess]);

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmitRegister} className="space-y-4" aria-busy={loading}>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Input icon={<UserRound size={15} />} label="Nome" type="text" placeholder="Seu nome" value={name} name="name" autoComplete="given-name" onChange={(e) => setName(e.target.value)} />
                    <Input label="Sobrenome" type="text" placeholder="Seu sobrenome" value={lastName} name="lastName" autoComplete="family-name" onChange={(e) => setLastName(e.target.value)} />
                </div>
                <Input icon={<AtSign size={15} />} label="E-mail" type="email" placeholder="seu@email.com" value={email} name="email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
                <Input icon={<LockKeyhole size={15} />} label="Senha" type="password" placeholder="Crie uma senha" value={password} name="password" autoComplete="new-password" showPasswordToggle onChange={(e) => setPassword(e.target.value)} />

                {error && <Message message={error} type="error" />}
                {success && <Message message={success} type="success" />}

                <Button type="submit" disabled={loading} className="mt-2 w-full">
                    {loading ? <LoaderCircle size={17} className="animate-spin" /> : <ArrowRight size={17} />}
                    {loading ? "Registrando..." : "Registrar"}
                </Button>
            </form>

            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-sm text-[#b9b9b9]">
                <span>Já tem conta?</span>
                <button type="button" className="font-semibold text-[#32dfff] transition-colors hover:text-white" onClick={() => onType("login")}>Entrar</button>
            </div>
        </div>
    );
};

export default Register;
