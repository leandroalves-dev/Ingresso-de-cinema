import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

import { useMovies } from "../../hooks/useMovies";
import Container from "../Container";
import { Card } from "../ui/card";

const LastNews = () => {
    const { news, loading } = useMovies();

    if (loading && news.length === 0) return null;

    const formatDate = (dateStr: string): string => {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
    };

    return (
        <section className="latest-news-section cinematic-section border-t border-white/[0.08] py-14 sm:py-20" aria-labelledby="latest-news-title">
            <Container>
                <div className="latest-news-header mb-8 flex items-end justify-between gap-4">
                    <div>
                        <p className="section-eyebrow mb-2">Cinesphere journal</p>
                        <h2 id="latest-news-title" className="text-2xl font-semibold tracking-tight text-[#f7f7f7] sm:text-3xl">Últimas notícias</h2>
                        <p className="mt-2 max-w-xl text-sm text-[#b9b9b9]">Fique por dentro de tudo que rola no mundo do cinema.</p>
                    </div>
                    <span className="latest-news-divider hidden h-px max-w-xs flex-1 bg-gradient-to-r from-[#ff252d]/70 to-transparent sm:block" />
                </div>

                <div className="latest-news-grid grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {news.map((item) => (
                        <Card key={item.id} className="latest-news-card group overflow-hidden">
                            <Link to={`/details-news/${item.id}`} className="block h-full">
                                <img src={item.image} alt={item.title} loading="lazy" decoding="async" className="latest-news-image aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                                <div className="latest-news-content flex min-h-32 flex-col justify-between gap-5 p-5">
                                    <h3 className="latest-news-headline line-clamp-2 text-sm font-semibold leading-6 text-[#f7f7f7] group-hover:text-white">{item.title}</h3>
                                    <span className="latest-news-date flex items-center justify-between text-xs text-[#818181]">
                                        <span className="inline-flex items-center gap-2"><CalendarDays size={14} /> {formatDate(item.data)}</span>
                                        <ArrowUpRight size={17} className="text-[#ff252d]" />
                                    </span>
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
