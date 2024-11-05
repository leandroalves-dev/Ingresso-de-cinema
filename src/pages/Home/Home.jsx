import './Home.css';

//components
import Movies from '../../components/Movies/Movies';

const Home = () => {
	return (
		<>
			{/* <Banner /> */}
			<main>
				<div className="container">
					<Movies />
				</div>
			</main>
		</>
	)
}

export default Home