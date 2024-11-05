import './Footer.css';

import { Link } from 'react-router-dom';

// icons
import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs'

//components
import Logo from '../../components/Logo/Logo'; 

const Footer = () => {
    return (
        <footer>

            <div className="logo-foter">
                <Logo />
            </div>

            <div className="grid-footer">
                <div className="links">
                    <ul>
                        <li><Link>Página inicial</Link></li>
                        <li><Link>Sobre a CineSphere</Link></li>
                        <li><Link>Programação</Link></li>
                        <li><Link>Central de atendimento</Link></li>
                        <li><Link>Notícias</Link></li>
                    </ul>
                </div>
                <div className="redes-sociais">
                    <ul>
                        <li><Link><BsFacebook /> <span>Facebook</span></Link></li>
                        <li><Link><BsInstagram /> <span>Instagram</span></Link></li>
                        <li><Link><BsYoutube /> <span>YouTube</span></Link></li>
                    </ul>
                </div>
            </div>

            <address>&copy; Copyright - Todos os direitos reservados - 2024</address>
        </footer>
    )
}

export default Footer