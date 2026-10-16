import { ArrowLeft, ArrowUpRight, CalendarDays, Info, Newspaper } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import Container from "../Container";
import Loading from "../Loading";
import { useMovies } from "../../hooks/useMovies";
import "./details-news.css";

const DetailsNews = () => {
    const { id } = useParams();
    const { news, loading } = useMovies();
    const newsItem = news.find((item) => item.id.toString() === id);

    const formatDate = (dateStr: string): string => {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    };

    if (loading && !newsItem) return <Loading />;

    if (!newsItem) {
        return (
            <main className="news-detail-page">
                <Container>
                    <div className="news-detail-not-found">
                        <div className="news-detail-not-found-icon"><Info size={27} aria-hidden="true" /></div>
                        <p className="news-detail-eyebrow">CineSphere Journal</p>
                        <h1>Notícia não encontrada</h1>
                        <p>Não conseguimos localizar essa notícia. Volte ao Journal para continuar explorando.</p>
                        <Link to="/" className="news-detail-back-action"><ArrowLeft size={16} aria-hidden="true" /> Voltar para a página inicial</Link>
                    </div>
                </Container>
            </main>
        );
    }

    return (
        <main className="news-detail-page">
            <Container>
                <nav className="news-detail-breadcrumb" aria-label="Navegação estrutural">
                    <Link to="/"><ArrowLeft size={15} aria-hidden="true" /> Últimas notícias</Link>
                    <span aria-hidden="true">/</span>
                    <span>Artigo</span>
                </nav>

                <article className="news-detail-article">
                    <header className="news-detail-hero">
                        <img src={newsItem.image} alt="" className="news-detail-hero-image" />
                        <div className="news-detail-hero-shade" aria-hidden="true" />
                        <div className="news-detail-hero-content">
                            <p className="news-detail-eyebrow"><Newspaper size={14} aria-hidden="true" /> CineSphere Journal</p>
                            <h1>{newsItem.title}</h1>
                            <div className="news-detail-meta">
                                <span><CalendarDays size={14} aria-hidden="true" /> Publicado em {formatDate(newsItem.data)}</span>
                                <span className="news-detail-meta-separator" aria-hidden="true" />
                                <span>Leitura CineSphere</span>
                            </div>
                        </div>
                        <span className="news-detail-hero-index" aria-hidden="true">#{String(newsItem.id).padStart(2, "0")}</span>
                    </header>

                    <div className="news-detail-body">
                        <aside className="news-detail-aside" aria-label="Informações da notícia">
                            <span className="news-detail-aside-label">Em destaque</span>
                            <span className="news-detail-aside-line" aria-hidden="true" />
                            <span className="news-detail-aside-mark">CS</span>
                        </aside>
                        <div className="news-detail-copy">
                            <p className="news-detail-lead">Uma leitura para quem gosta de acompanhar as histórias que movimentam o cinema, as séries e a cultura pop.</p>
                            <p>{newsItem.news}</p>
                            <div className="news-detail-footer">
                                <span>Você está no CineSphere Journal</span>
                                <ArrowUpRight size={16} aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </article>

                <div className="news-detail-bottom-action">
                    <Link to="/"><ArrowLeft size={16} aria-hidden="true" /> Continuar explorando notícias</Link>
                </div>
            </Container>
        </main>
    );
};

export default DetailsNews;
