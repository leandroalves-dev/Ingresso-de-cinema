    import './App.css'

    import { BrowserRouter, Route, Routes } from 'react-router-dom'

    //components
    import Header from './components/Header'
    import Footer from './components/Footer'
    import DetailsNews from './components/DetailsNews'

    //pages
    import Home from './pages/Home'
    import About from './pages/About'
    import Price from './pages/Price'
    import Sale from './pages/Sale'
    import Seats from './pages/Seats'
    import DetailsMovies from './pages/DetailsMovies'

    //context
    import { PaymentProvider } from './context/PaymentContext'
    import { SeatProvider } from './context/SeatContext'
    import { MovieProvider } from './context/MovieContext'


    function App() {
        return (
            <MovieProvider>
                <PaymentProvider>
                    <SeatProvider>
                        <div className='flex flex-col min-h-screen bg-[#111]'>
                            <BrowserRouter basename="/projects/cinema">
                                <Header />
                                <Routes>
                                    <Route path='/' element={<Home />} />
                                    <Route path='/about' element={<About />} />
                                    <Route path='/price' element={<Price />} />
                                    <Route path='/sale' element={<Sale />} />
                                    <Route path='/seats' element={<Seats />} />
                                    <Route path='/details-news/:id' element={<DetailsNews />} />
                                    <Route path='/details-movies/:id' element={<DetailsMovies />} />
                                </Routes>
                                <Footer />
                            </BrowserRouter>
                        </div>
                    </SeatProvider>
                </PaymentProvider>
            </MovieProvider>
        
            
        )
    }

    export default App
