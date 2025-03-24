import Logo from '../../assets/logo.png'

//icons
import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs'

//components
import Container from '../Container'

const Footer = () => {
    return (
      <footer className='bg-neutral-800 p-10 flex flex-col items-center'>
            <Container>
                <div className='flex flex-col items-center justify-center'>
                    
                    <div className='mb-5'>
                        <img src={Logo} alt='CineSphere - venha curtir essa experiência' className='w-52' />
                    </div>
                    
                    <div>
                        <ul className='flex flex-row gap-5 text-white mb-3 text-sm max-sm:flex-col max-sm:items-center max-sm:gap-2'>
                            <li><a href="#">Página inicial</a></li>
                            <li><a href="#">Sobre a CineSphere</a></li>
                            <li><a href="#">Programação</a></li>
                            <li><a href="#">Central de atendimento</a></li>
                            <li><a href="#">Notícias</a></li>
                        </ul>
                    </div>

                    <div>
                        <ul className='flex flex-row gap-5 text-white mb-3 text-sm'>
                            <li className='flex flex-row items-center gap-2'><BsFacebook /> <span>Facebook</span></li>
                            <li className='flex flex-row items-center gap-2'><BsInstagram /> <span>Instagram</span></li>
                            <li className='flex flex-row items-center gap-2'><BsYoutube /> <span>Youtube</span></li>
                        </ul>
                    </div>        

                </div>

                <div className='font-normal w-full flex items-center justify-center pt-3 text-white border-t-1 border-t-neutral-700 text-sm'>
                    <address className='not-italic'>&copy; Copyright - Todos os direitos reservados - 2025</address>
                </div>

            </Container>
      </footer>
    )
  }
  
  export default Footer
  