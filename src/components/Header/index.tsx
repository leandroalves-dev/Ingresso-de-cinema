import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//Logo Img
import Logo from '../../assets/logo.png';

//icons
import { BsLock, BsPersonFill, BsJustify, BsX } from 'react-icons/bs';

//components
import Container from '../Container';
import Modal from '../Modal';
import Register from '../../pages/Login/Register';
import Logar from '../../pages/Login/Logar';

//hooks
import useAuth from '../../hooks/useAuth';

//context api
import { SeatContext } from '../../context/SeatContext';
import { PaymentContext } from '../../context/PaymentContext';

const Header = () => {

    const paymentContext = useContext(PaymentContext);
    if(!paymentContext) throw new Error('Erro no provider');
    
    const {resetPayment} = paymentContext;
    const {resetSeat} = useContext(SeatContext);

    const [menuOpen, setMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<string | null>(null);

    const { user, setUser } = useAuth();

    const navigate = useNavigate();

    console.log(showModal)

    const handleRegister = () => {
        setShowModal(true);
        setModalType('register')

        if(menuOpen){
            setMenuOpen(false)
        }
    }

    const handleLogin = () => {
        setShowModal(true);
        setModalType('login')

        if(menuOpen){
            setMenuOpen(false)
        }
    }

    const handleSuccess = () => {
        setShowModal(false);
        setModalType(null);
        
        const storedUser = localStorage.getItem("User") 
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(`${userData.name}`);
        }
    };

    const handleLogout = () => {
        setUser('')
        localStorage.removeItem('User');

        const stepStorage = localStorage.getItem('step');
        if(stepStorage){
            navigate('/');
        }
    }

    const handleReset = () => {
        resetSeat();
        resetPayment();
    }

    return (
        <>
            <header className='bg-[#141414] border-b-neutral-950 border-b-2'>
            
                <div className='bg-neutral-950 p-3 hidden md:flex'>
                    <Container>
                        <ul className='flex flex-row justify-end gap-5 text-white w-full'>
                            {user ? (
                                <>
                                    <li>Olá {user}</li>
                                    <li className='cursor-pointer hover:underline' onClick={handleLogout}>Sair</li>
                                </>
                            ) : (
                                <>
                                    <li>Olá Visitante</li>
                                    <li className='flex items-center gap-1.5 cursor-pointer hover:underline' onClick={handleRegister}><BsLock /> Cadastrar</li>
                                    <li className='flex items-center gap-1.5 cursor-pointer hover:underline' onClick={handleLogin}><BsPersonFill /> Entrar</li>
                                </>
                            )}
                            
                        </ul>
                    </Container>
                </div>

                <Container>
                    <div className='flex justify-between items-center h-40 md:w-full max-md:justify-center'>
                        
                        <div>
                            <Link to='/' onClick={handleReset}>
                                <img className='w-80 h-auto' src={Logo} alt='CineSphere - A diversão começa aqui' />
                            </Link>     
                        </div>

                        <div className='md:hidden absolute top-2.5 left-2.5 '>
                            <button onClick={() => setMenuOpen(!menuOpen)}>
                                {!menuOpen && (
                                    <BsJustify size={30} className='text-white' />
                                )}
                            </button>
                        </div>
                        
                        <nav className='hidden md:flex'>
                            <ul className='flex gap-8 text-white text-lg'>
                                <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                                <li><Link to="/about" onClick={() => setMenuOpen(false)}>Quem Somos</Link></li>
                                <li><Link to="/price" onClick={() => setMenuOpen(false)}>Preços</Link></li>
                                <li><Link to="/sale" onClick={() => setMenuOpen(false)}>Promoções</Link></li>
                            </ul>
                        </nav> 

                        <div className={`fixed top-0 right-0 w-64 h-full bg-neutral-900 z-99  transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
                            <button className="absolute top-4 right-4 text-white" onClick={() => setMenuOpen(false)}>
                                <BsX size={30} />
                            </button>
                            <ul className='text-white bg-gray-800 p-6'>
                                {user ? (
                                    <>
                                        <li>Olá {user}</li>
                                        <li className='cursor-pointer hover:underline' onClick={handleLogout}>Sair</li>
                                    </>
                                ) : (

                                    <>
                                        <li className='mb-3'>Olá Visitante</li>
                                        <li className='flex items-center gap-1.5 mb-3' onClick={handleRegister}><BsLock /> Cadastrar</li>
                                        <li className='flex items-center gap-1.5' onClick={handleLogin}><BsPersonFill /> Entrar</li>
                                    </>
                                )}
                            </ul>
                            <ul className="flex flex-col gap-2 p-6 text-white text-lg">                            
                                <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                                <li><Link to="/about" onClick={() => setMenuOpen(false)}>Quem Somos</Link></li>
                                <li><Link to="/price" onClick={() => setMenuOpen(false)}>Preços</Link></li>
                                <li><Link to="/sale" onClick={() => setMenuOpen(false)}>Promoções</Link></li>
                            </ul>
                        </div>
                    
                    </div>
                </Container>
                
            </header>

            {modalType && (
                <Modal title={modalType === 'register' ? 'Cadastre-se' : 'Faça seu login'}>
                    <button className="absolute top-0 right-0 text-white bg-red-800 px-2 pb-1 text-xl" onClick={() => setModalType(null)}>x</button>
                    {modalType === 'register' ? <Register onType={setModalType} onSuccess={handleSuccess} /> : <Logar onType={setModalType} onSuccess={handleSuccess} />}
                </Modal>
            )}

        </>
    ) 
}

export default Header
