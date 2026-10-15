import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LockKeyhole, LogIn, LogOut, Menu, UserRound, X } from "lucide-react";

import Logo from "../../assets/logo.png";
import Container from "../Container";
import Modal from "../Modal";
import Register from "../../pages/Login/Register";
import Logar from "../../pages/Login/Logar";
import useAuth from "../../hooks/useAuth";
import { SeatContext } from "../../context/SeatContext";
import { PaymentContext } from "../../context/PaymentContext";

const navigation = [
    { label: "Home", to: "/" },
    { label: "Quem Somos", to: "/about" },
    { label: "Preços", to: "/price" },
    { label: "Promoções", to: "/sale" },
];

const Header = () => {
    const paymentContext = useContext(PaymentContext);
    if (!paymentContext) throw new Error("Erro no provider");

    const { resetPayment } = paymentContext;
    const { resetSeat } = useContext(SeatContext);
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalType, setModalType] = useState<string | null>(null);

    const handleReset = () => {
        resetSeat();
        resetPayment();
    };

    const openModal = (type: "register" | "login") => {
        setModalType(type);
        setMenuOpen(false);
    };

    const handleSuccess = () => {
        setModalType(null);
        const storedUser = localStorage.getItem("User");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(`${userData.name}`);
        }
    };

    const handleLogout = () => {
        setUser("");
        localStorage.removeItem("User");
        if (localStorage.getItem("step")) navigate("/");
    };

    return (
        <>
            <header className="relative z-40 border-b border-white/[0.08] bg-[#0b0c0c]/88 backdrop-blur-md">
                <div className="border-b border-white/[0.06] bg-black/30">
                    <Container>
                        <div className="flex min-h-9 items-center justify-end gap-5 text-xs text-[#b9b9b9]">
                            {user ? (
                                <>
                                    <span className="text-[#f7f7f7]">Olá, {user}</span>
                                    <button className="inline-flex items-center gap-1.5 hover:text-white" onClick={handleLogout}><LogOut size={14} /> Sair</button>
                                </>
                            ) : (
                                <>
                                    <span>Olá, visitante</span>
                                    <button className="inline-flex items-center gap-1.5 hover:text-white" onClick={() => openModal("register")}><LockKeyhole size={14} /> Cadastrar</button>
                                    <button className="inline-flex items-center gap-1.5 hover:text-white" onClick={() => openModal("login")}><UserRound size={14} /> Entrar</button>
                                </>
                            )}
                        </div>
                    </Container>
                </div>

                <Container>
                    <div className="neon-divider" />
                    <div className="flex min-h-[100px] items-center justify-between gap-8 py-4 md:min-h-[128px]">
                        <Link to="/" onClick={handleReset} className="shrink-0" aria-label="CineSphere - página inicial">
                            <img className="w-52 sm:w-64 md:w-72" src={Logo} alt="CineSphere - A diversão começa aqui" />
                        </Link>

                        <nav className="hidden md:flex" aria-label="Navegação principal">
                            <ul className="flex items-center gap-7 text-sm font-semibold text-[#b9b9b9] lg:gap-9">
                                {navigation.map((item) => (
                                    <li key={item.to}>
                                        <NavLink to={item.to} end={item.to === "/"} className={({ isActive }) => `relative py-3 transition-colors hover:text-white ${isActive ? "text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-[#ff252d] after:shadow-[0_0_10px_rgba(255,37,45,0.8)]" : ""}`}>
                                            {item.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <button type="button" className="inline-flex size-11 items-center justify-center rounded-sm border border-white/10 text-white hover:border-[#32dfff]/70 hover:text-[#32dfff] md:hidden" onClick={() => setMenuOpen(true)} aria-label="Abrir menu" aria-expanded={menuOpen}>
                            <Menu size={22} />
                        </button>
                    </div>
                </Container>

                {menuOpen && <button className="fixed inset-0 z-40 bg-black/70 md:hidden" onClick={() => setMenuOpen(false)} aria-label="Fechar menu" />}
                <aside className={`fixed right-0 top-0 z-50 flex h-full w-[min(86vw,340px)] flex-col border-l border-white/10 bg-[#101111] p-6 shadow-2xl transition-transform duration-200 md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`} aria-hidden={!menuOpen}>
                    <div className="flex items-center justify-between border-b border-white/10 pb-5">
                        <span className="section-eyebrow">Menu</span>
                        <button type="button" className="text-[#b9b9b9] hover:text-white" onClick={() => setMenuOpen(false)} aria-label="Fechar menu"><X size={22} /></button>
                    </div>
                    <div className="flex flex-col gap-5 py-7 text-sm text-[#b9b9b9]">
                        {navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.to === "/"} onClick={() => setMenuOpen(false)} className="hover:text-white">{item.label}</NavLink>)}
                    </div>
                    <div className="mt-auto border-t border-white/10 pt-6 text-sm text-[#b9b9b9]">
                        {user ? (
                            <div className="flex items-center justify-between gap-4"><span>Olá, {user}</span><button className="inline-flex items-center gap-2 hover:text-white" onClick={handleLogout}><LogOut size={15} /> Sair</button></div>
                        ) : (
                            <div className="flex flex-col gap-4"><span>Olá, visitante</span><button className="inline-flex items-center gap-2 text-left hover:text-white" onClick={() => openModal("register")}><LockKeyhole size={15} /> Cadastrar</button><button className="inline-flex items-center gap-2 text-left hover:text-white" onClick={() => openModal("login")}><LogIn size={15} /> Entrar</button></div>
                        )}
                    </div>
                </aside>
            </header>

            {modalType && (
                <Modal title={modalType === "register" ? "Cadastre-se" : "Faça seu login"}>
                    <button className="absolute right-3 top-3 text-[#b9b9b9] hover:text-white" onClick={() => setModalType(null)} aria-label="Fechar"><X size={20} /></button>
                    {modalType === "register" ? <Register onType={setModalType} onSuccess={handleSuccess} /> : <Logar onType={setModalType} onSuccess={handleSuccess} />}
                </Modal>
            )}
        </>
    );
};

export default Header;
