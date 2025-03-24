//components
import Container from '../../components/Container'
import LastNews from '../../components/LastNews'
import MovieList from '../../components/MoviesList'

const Home = () => {
    return (
        <>
            <Container>
                <MovieList />                
            </Container>
            <LastNews />
        </>
    )
}

export default Home