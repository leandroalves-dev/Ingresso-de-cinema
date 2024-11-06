import './Header.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// icons
import { BsLock, BsPersonFill, BsList } from 'react-icons/bs';

//components
// import Cart from '../Cart/Cart';
import Logo from '../Logo/Logo';
import Modal from '../../components/Modal/Modal';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Login/Register'

const Header = () => {

    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [nome, setNome] = useState('');

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogin = () => { 
        setIsLogin(true);
        setShowModal(true);
    }

    const handleRegister = () => { 
        setIsLogin(false);
        setShowModal(true);
    }

    const handleLoginSubmit = ({ nome, email, password }) => {
         // Salvar dados no localStorage
         localStorage.setItem('Dados', JSON.stringify({ nome, email, password }));
         setNome(nome);
         setShowModal(false); 
    };

    const handleLoginSuccess = (userNome) => {
        setNome(userNome); // Atualiza o nome do usuário no header
        setShowModal(false); // Fecha o modal após login
    };

    const handleLogout = () => {
        setNome(''); 
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <header>
                <div className="user">
                    <div className="grid-user">
                        <ul>
                            {nome ? (
                                <>
                                    <li>Olá {nome}</li>
                                    <li className='logout' onClick={handleLogout}>Sair</li>
                                </>

                            ):(
                                <>
                                    <li>Olá visitante</li>
                                    <li onClick={handleLogin}><BsLock /> Cadastra-se</li>
                                    <li onClick={handleRegister}><BsPersonFill /> Entrar</li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="container">

                    <div className="menu-icon" onClick={toggleSidebar}>
                        <BsList size={30} />
                    </div>
                    <div className="header">
                        <Logo />
                        <nav>
                            <ul className="desktop-menu">
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/quem-somos'>Quem Somos</Link></li>
                                <li><Link to='/price'>Preços</Link></li>
                                <li><Link to='/sale'>Promoções</Link></li>
                            </ul>
                        </nav>
                        {/* <Cart /> */}
                    </div>
                </div>

                {/* Sidebar menu para mobile */}
                <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                    <div>
                        <span>Menu</span>
                        <span className="close-menu" onClick={toggleSidebar}>x</span>
                    </div>
                    <ul className='menu-mobile'>
                        <li><Link to='/' onClick={toggleSidebar}>Home</Link></li>
                        <li><Link to='/quem-somos' onClick={toggleSidebar}>Quem Somos</Link></li>
                        <li><Link to='/price' onClick={toggleSidebar}>Preços</Link></li>
                        <li><Link to='/sale' onClick={toggleSidebar}>Promoções</Link></li>
                    </ul>
                    <ul className='menu-user-mobile'>
                        {nome ? (
                            <>
                                <li>Olá {nome}</li>
                                <li className='logout' onClick={handleLogout}>Sair</li>
                            </>

                        ):(
                            <>
                                <li>Olá visitante</li>
                                <li onClick={handleLogin}><BsLock /> Cadastra-se</li>
                                <li onClick={handleRegister}><BsPersonFill /> Entrar</li>
                            </>
                        )}
                    </ul>
                </div>
            </header>

            {showModal && (
                <>
                    <Modal>
                        <span className="close" onClick={() => setShowModal(false)}>X</span>
                        {!isLogin ? <Login onLoginSuccess={handleLoginSuccess} /> : <Register onSubmit={handleLoginSubmit} />}   
                        {!isLogin ? (
                            <p>Não tem conta? <span onClick={() => setIsLogin(true)}>Cadastrar-se</span></p>
                        ):(
                            <p>Já tem conta? <span onClick={() => setIsLogin(false)}>Entrar</span></p>
                        )}  
                    </Modal>
                </>
            )}
        </>
    )
}

export default Header