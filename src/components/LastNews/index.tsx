import { ArrowUpRight, CalendarDays, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

import { useMovies } from "../../hooks/useMovies";
import Container from "../Container";
import { Card } from "../ui/card";
import "./last-news.css";

const LastNews = () => {
    const { news, loading } = useMovies();

    if (loading && news.length === 0) return null;

    const formatDate = (dateStr: string): string => {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    };

    return (
        <section className="news-journal-section cinematic-section" aria-labelledby="latest-news-title">
            <Container>
                <header className="news-journal-header">
                    <div className="news-journal-heading">
                        <p className="news-journal-eyebrow"><Newspaper size={14} aria-hidden="true" /> CineSphere Journal</p>
                        <h2 id="latest-news-title">Últimas notícias</h2>
                        <p>Fique por dentro de tudo que rola no mundo do cinema.</p>
                    </div>
                    <div className="news-journal-heading-mark" aria-hidden="true">
                        <span>NEWS</span>
                        <i />
                    </div>
                </header>

                <div className="news-journal-grid">
                    {news.map((item, index) => (
                        <Card key={item.id} className="news-journal-card group">
                            <Link to={`/details-news/${item.id}`} className="news-journal-link">
                                <div className="news-journal-image-wrap">
                                    <img src={item.image} alt={item.title} loading="lazy" decoding="async" className="news-journal-image" />
                                    <span className="news-journal-image-shade" aria-hidden="true" />
                                    <span className="news-journal-card-index">{String(index + 1).padStart(2, "0")}</span>
                                    <span className="news-journal-read-label">Ler notícia <ArrowUpRight size={14} aria-hidden="true" /></span>
                                </div>
                                <div className="news-journal-content">
                                    <span className="news-journal-kicker">Em foco</span>
                                    <h3>{item.title}</h3>
                                    <div className="news-journal-meta">
                                        <span><CalendarDays size={13} aria-hidden="true" /> {formatDate(item.data)}</span>
                                        <ArrowUpRight size={17} aria-hidden="true" />
                                    </div>
                                </div>
                            </Link>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default LastNews;
