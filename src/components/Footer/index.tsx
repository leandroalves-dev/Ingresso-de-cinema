import { Facebook, Instagram, Youtube } from "lucide-react";

import Logo from "../../assets/logo.png";
import Container from "../Container";

const footerLinks = ["Página inicial", "Sobre a CineSphere", "Programação", "Central de atendimento", "Notícias"];

const Footer = () => (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0b0c0c] py-12">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff252d] to-transparent opacity-70 shadow-[0_0_14px_rgba(255,37,45,0.4)]" />
        <Container>
            <div className="flex flex-col items-center text-center">
                <img src={Logo} alt="CineSphere - venha curtir essa experiência" className="mb-7 w-48 sm:w-56" />
                <nav aria-label="Navegação do rodapé" className="mb-6">
                    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-[#b9b9b9]">
                        {footerLinks.map((link) => <li key={link}><a href="#" className="transition-colors hover:text-white">{link}</a></li>)}
                    </ul>
                </nav>
                <ul className="mb-8 flex flex-wrap justify-center gap-5 text-xs text-[#b9b9b9]">
                    <li><a href="#" className="inline-flex items-center gap-2 hover:text-white"><Facebook size={14} /> Facebook</a></li>
                    <li><a href="#" className="inline-flex items-center gap-2 hover:text-white"><Instagram size={14} /> Instagram</a></li>
                    <li><a href="#" className="inline-flex items-center gap-2 hover:text-white"><Youtube size={14} /> Youtube</a></li>
                </ul>
                <div className="w-full border-t border-white/10 pt-5 text-xs text-[#818181]">
                    <address className="not-italic">&copy; Copyright - Todos os direitos reservados - 2025</address>
                </div>
            </div>
        </Container>
    </footer>
);

export default Footer;
