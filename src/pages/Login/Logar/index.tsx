import { useEffect } from "react";
import { ArrowRight, AtSign, LoaderCircle, LockKeyhole } from "lucide-react";

import Input from "../../../components/Input";
import Message from "../../../components/Message";
import Button from "../../../components/ui/button";
import useAuth from "../../../hooks/useAuth";

interface ModalProps {
    onType: (type: string) => void;
    onSuccess?: () => void;
}

const Logar = ({ onType, onSuccess }: ModalProps) => {
    const { loading, email, setEmail, password, setPassword, error, success, handleSubmitLogin } = useAuth();

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => onSuccess?.(), 1000);
            return () => clearTimeout(timer);
        }
    }, [success, onSuccess]);

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmitLogin} className="space-y-4" aria-busy={loading}>
                <Input icon={<AtSign size={15} />} label="E-mail" type="email" placeholder="seu@email.com" value={email} name="email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
                <Input icon={<LockKeyhole size={15} />} label="Senha" type="password" placeholder="Digite sua senha" value={password} name="password" autoComplete="current-password" showPasswordToggle onChange={(e) => setPassword(e.target.value)} />

                {error && <Message message={error} type="error" />}
                {success && <Message message={success} type="success" />}

                <Button type="submit" disabled={loading} className="mt-2 w-full">
                    {loading ? <LoaderCircle size={17} className="animate-spin" /> : <ArrowRight size={17} />}
                    {loading ? "Entrando..." : "Entrar"}
                </Button>
            </form>

            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-sm text-[#b9b9b9]">
                <span>Não tem conta?</span>
                <button type="button" className="font-semibold text-[#32dfff] transition-colors hover:text-white" onClick={() => onType("register")}>Cadastre-se</button>
            </div>
        </div>
    );
};

export default Logar;
