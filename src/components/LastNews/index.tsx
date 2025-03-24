import { Link } from "react-router-dom";
import { useMovies } from "../../hooks/useMovies";
import Container from "../Container";

const LastNews = () => {
    const { news } = useMovies();

    const formatDate = (dateStr: string): string => {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="p-6 bg-center border-t-1 border-neutral-800" style={{ backgroundImage: "url('/bg.png')" }}>
            <Container>
                <h1 className="text-white text-[22px]">Últimas notícias</h1>
                <p className="text-white mb-10">Fique por dentro de tudo que rola no mundo do cinema!</p>
                
                <div className="flex flex-wrap gap-5">
                    {news.map(itens => (
                        <div key={itens.id} className='flex-1 cursor-pointer min-w-[350px] text-white p-4' style={{ backgroundColor: 'rgba(2, 0, 7, 0.5)'} }>        
                            <Link to={`/details-news/${itens.id}`}  >
                            <img src={itens.image} alt={itens.title} className="w-full h-48 object-cover mb-4" />
                            {itens.title}
                            <span className="my-3 text-[12px] block">{formatDate(itens.data)}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default LastNews;
