import { BadgeDollarSign, CalendarDays, Clapperboard, Crown, Info, Sparkles, Ticket, UsersRound } from "lucide-react";

import { useMovies } from "../../hooks/useMovies";
import { Prices } from "../../types/Prices";
import Container from "../../components/Container";
import "./price.css";

type SessionType = keyof Prices["sessions"];

const sessionTypes: SessionType[] = ["2D", "3D", "premium"];

const sessionDetails: Record<SessionType, {
  label: string;
  eyebrow: string;
  description: string;
  icon: typeof Clapperboard;
}> = {
  "2D": {
    label: "Sessão 2D",
    eyebrow: "A experiência essencial",
    description: "A forma clássica de se conectar com cada história, com conforto e qualidade CineSphere.",
    icon: Clapperboard,
  },
  "3D": {
    label: "Sessão 3D",
    eyebrow: "Mais perto da ação",
    description: "Uma camada extra de profundidade para fazer cada cena saltar da tela e envolver você.",
    icon: Sparkles,
  },
  premium: {
    label: "Sessão Premium",
    eyebrow: "Uma experiência especial",
    description: "Para quem quer transformar a sessão em um momento ainda mais marcante.",
    icon: Crown,
  },
};

const Price = () => {
  const { prices } = useMovies();

  if (!prices) return null;

  return (
    <main className="price-page">
      <Container>
        <section className="price-hero" aria-labelledby="price-title">
          <div className="price-hero-copy">
            <p className="price-eyebrow"><BadgeDollarSign size={14} aria-hidden="true" /> CineSphere · Valores transparentes</p>
            <h1 id="price-title">Escolha como quer<br /><span>viver o cinema.</span></h1>
            <p className="price-hero-lead">
              Encontre a sessão ideal para o seu momento. Todos os valores estão organizados de forma simples para você planejar sua próxima experiência.
            </p>
            <div className="price-hero-highlights" aria-label="Destaques da tabela de preços">
              <span><Ticket size={14} aria-hidden="true" /> Inteira e meia-entrada</span>
              <span><CalendarDays size={14} aria-hidden="true" /> Semana e fim de semana</span>
            </div>
          </div>

          <div className="price-hero-art" aria-hidden="true">
            <div className="price-hero-art-ring price-hero-art-ring-one" />
            <div className="price-hero-art-ring price-hero-art-ring-two" />
            <div className="price-hero-art-copy">
              <span>O próximo capítulo</span>
              <strong>tem o seu<br /><em>lugar.</em></strong>
              <small>CineSphere · preços para todos os momentos</small>
            </div>
            <div className="price-hero-art-mark">¢</div>
          </div>
        </section>

        <section className="price-board" aria-labelledby="price-board-title">
          <div className="price-section-heading">
            <div>
              <p className="price-eyebrow">Tabela de preços</p>
              <h2 id="price-board-title">Encontre sua sessão.</h2>
            </div>
            <span className="price-board-note">Valores em reais (R$)</span>
          </div>

          <div className="price-session-grid">
            {sessionTypes.map((sessionType) => {
              const price = prices.sessions[sessionType];
              const details = sessionDetails[sessionType];
              const Icon = details.icon;

              return (
                <article className={`price-session-card price-session-card-${sessionType}`} key={sessionType}>
                  <header className="price-session-header">
                    <div className="price-session-icon"><Icon size={20} strokeWidth={1.7} aria-hidden="true" /></div>
                    <div>
                      <p>{details.eyebrow}</p>
                      <h3>{details.label}</h3>
                    </div>
                  </header>
                  <p className="price-session-description">{details.description}</p>

                  <div className="price-table-wrap">
                    <table className="price-table">
                      <caption className="sr-only">Preços da {details.label}</caption>
                      <thead>
                        <tr>
                          <th scope="col">Período</th>
                          <th scope="col">Inteira</th>
                          <th scope="col">Meia</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row"><span>Segunda à quinta</span></th>
                          <td>R$ {price.weekdays.fullPrice.toFixed(2)}</td>
                          <td>R$ {price.weekdays.halfPrice.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <th scope="row"><span>Sexta à domingo</span></th>
                          <td>R$ {price.weekends.fullPrice.toFixed(2)}</td>
                          <td>R$ {price.weekends.halfPrice.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="price-information" aria-labelledby="price-information-title">
          <div className="price-section-heading">
            <div>
              <p className="price-eyebrow"><Info size={14} aria-hidden="true" /> Antes de reservar</p>
              <h2 id="price-information-title">Informações importantes.</h2>
            </div>
          </div>
          <div className="price-information-grid">
            <article className="price-information-card">
              <CalendarDays size={18} aria-hidden="true" />
              <div>
                <h3>Feriados e pontos facultativos</h3>
                <p>Nessas datas, serão considerados os preços de final de semana.</p>
              </div>
            </article>
            <article className="price-information-card">
              <UsersRound size={18} aria-hidden="true" />
              <div>
                <h3>Descontos e benefícios</h3>
                <p>Descontos promocionais não são acumulativos com outros benefícios, incluindo meia-entrada.</p>
              </div>
            </article>
            <article className="price-information-card">
              <Sparkles size={18} aria-hidden="true" />
              <div>
                <h3>Sessões de pré-estreia</h3>
                <p>Pré-estreias realizadas às quartas-feiras seguem os valores praticados aos sábados e domingos.</p>
              </div>
            </article>
          </div>
        </section>
      </Container>
    </main>
  );
};

export default Price;
