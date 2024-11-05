import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Resumo from './components/Resumo/Resumo';


//pages
import Home from './pages/Home/Home';
import Filmes from './pages/Filmes/Filmes';
import Precos from './pages/Precos/Precos';
import Promocoes from './pages/Promocoes/Promocoes';
import Seats from './pages/Seats/Seats';
import Tickets from './pages/Tickets/Tickets'; 
import Payments from './pages/Payments/Payments'; 

//ContextAPI
import { PaymentProvider } from './context/PaymentContext';
import { MoviesProvider } from './context/MoviesContext';

//pages
import DetailsMovie from './pages/DetailsMovie/DetailsMovie';
import QuemSomos from './pages/QuemSomos/QuemSomos';
import DetailsNews from './pages/DetailsNews/DetailsNews';


function App() {

    return (
        <>
            <PaymentProvider>
                <MoviesProvider>
                <BrowserRouter>
                    <Header />
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/movies' element={<Filmes />} />
                            <Route path='/quem-somos' element={<QuemSomos />} />
                            <Route path='/price' element={<Precos />} />
                            <Route path='/sale' element={<Promocoes />} />
                            <Route path='/seats' element={<Seats />} />
                            <Route path='/tickets' element={<Tickets />} />
                            <Route path='/resumo' element={<Resumo />} />
                            <Route path='/payments' element={<Payments />} />
                            <Route path='/details/:id' element={<DetailsMovie />} />
                            <Route path='/details-news/:id' element={<DetailsNews />} />
                        </Routes>
                    <Footer />
                </BrowserRouter>
                </MoviesProvider>
            </PaymentProvider>
        </>  
    )
}

export default App
