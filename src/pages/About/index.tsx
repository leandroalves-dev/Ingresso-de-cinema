import { Clapperboard, Heart, Popcorn, Sparkles, UsersRound, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../../components/Container";
import "./about.css";

const experiencePillars = [
  {
    icon: Sparkles,
    eyebrow: "Imersão",
    title: "Cada frame importa",
    description: "Salas, som e imagem pensados para fazer você esquecer o mundo lá fora e entrar de verdade na história.",
  },
  {
    icon: Heart,
    eyebrow: "Acolhimento",
    title: "Cinema para compartilhar",
    description: "Um ambiente confortável e inclusivo para transformar uma sessão comum em uma memória especial.",
  },
  {
    icon: Popcorn,
    eyebrow: "Detalhes",
    title: "O ritual completo",
    description: "Da escolha do filme ao último crédito, cuidamos de cada detalhe para a sua experiência começar antes da sessão.",
  },
];

const About = () => {
  return (
    <main className="about-page">
      <Container>
        <section className="about-hero" aria-labelledby="about-title">
          <div className="about-hero-copy">
            <p className="about-eyebrow"><Clapperboard size={14} aria-hidden="true" /> A experiência CineSphere</p>
            <h1 id="about-title">Mais do que assistir.<br /><span>É viver o cinema.</span></h1>
            <p className="about-hero-lead">
              Criamos um lugar onde grandes histórias encontram pessoas, emoções e momentos que continuam depois que as luzes se acendem.
            </p>
            <div className="about-hero-actions">
              <Link to="/" className="about-primary-action">Ver programação <span aria-hidden="true">↗</span></Link>
              <span className="about-hero-note">A sétima arte, do nosso jeito.</span>
            </div>
          </div>

          <div className="about-hero-art" aria-label="Manifesto visual CineSphere">
            <div className="about-hero-orbit about-hero-orbit-one" aria-hidden="true" />
            <div className="about-hero-orbit about-hero-orbit-two" aria-hidden="true" />
            <div className="about-hero-art-copy">
              <span className="about-hero-art-label">CineSphere</span>
              <strong>Uma nova<br /><em>história</em><br />a cada sessão.</strong>
              <span className="about-hero-art-caption"><Volume2 size={13} aria-hidden="true" /> Som, luz e emoção</span>
            </div>
            <span className="about-hero-art-mark" aria-hidden="true">CS</span>
          </div>
        </section>

        <section className="about-introduction" aria-labelledby="about-introduction-title">
          <div className="about-section-heading">
            <p className="about-eyebrow">Quem somos</p>
            <h2 id="about-introduction-title">Um cinema feito para sentir.</h2>
          </div>
          <div className="about-introduction-copy">
            <p>
              O CineSphere nasceu da vontade de transformar a ida ao cinema em uma experiência completa. Somos um espaço dedicado às histórias que nos fazem rir, pensar, sonhar e dividir o mesmo silêncio com desconhecidos.
            </p>
            <p>
              Nossa programação combina os lançamentos mais esperados, clássicos que atravessam gerações e encontros especiais para quem acredita que uma boa sessão começa muito antes do primeiro minuto do filme.
            </p>
          </div>
        </section>

        <section className="about-manifesto" aria-label="Manifesto CineSphere">
          <div className="about-manifesto-line" aria-hidden="true" />
          <p>“No escuro da sala, toda história pode se tornar parte da sua.”</p>
          <span>CineSphere · Onde a experiência ganha vida</span>
        </section>

        <section className="about-pillars" aria-labelledby="about-pillars-title">
          <div className="about-section-heading about-pillars-heading">
            <p className="about-eyebrow">O que nos move</p>
            <h2 id="about-pillars-title">Pensado nos mínimos detalhes.</h2>
          </div>
          <div className="about-pillar-grid">
            {experiencePillars.map(({ icon: Icon, eyebrow, title, description }) => (
              <article className="about-pillar-card" key={title}>
                <div className="about-pillar-icon"><Icon size={20} strokeWidth={1.7} aria-hidden="true" /></div>
                <p className="about-pillar-eyebrow">{eyebrow}</p>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-closing" aria-labelledby="about-closing-title">
          <div>
            <p className="about-eyebrow"><UsersRound size={14} aria-hidden="true" /> A próxima sessão começa aqui</p>
            <h2 id="about-closing-title">Escolha uma história<br /><span>para chamar de sua.</span></h2>
          </div>
          <Link to="/" className="about-secondary-action">Explorar filmes <span aria-hidden="true">→</span></Link>
        </section>
      </Container>
    </main>
  );
};

export default About;
