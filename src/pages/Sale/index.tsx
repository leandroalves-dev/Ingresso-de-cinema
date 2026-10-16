import { BadgePercent, Clapperboard, Gift, Heart, Link as LinkIcon, Sparkles, Ticket, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../../components/Container";
import "./sale.css";

const promotions = [
  {
    icon: Ticket,
    number: "01",
    label: "Para compartilhar",
    title: "Combo Dupla Dinâmica",
    description: "Na compra de dois ingressos para o mesmo filme e horário, os clientes ganham um desconto de 20% no combo de pipoca e refrigerante.",
  },
  {
    icon: Gift,
    number: "02",
    label: "Quarta-feira",
    title: "Sessão Pipoca Grátis",
    description: "Em sessões de quarta-feira, quem comprar um ingresso inteiro ganha uma pipoca média grátis.",
  },
  {
    icon: UsersRound,
    number: "03",
    label: "Para grupos",
    title: "Ingresso Família",
    description: "Para grupos de quatro ou mais pessoas, com no mínimo dois ingressos inteiros, um desconto de 25% é aplicado ao total aos sábados.",
  },
  {
    icon: Clapperboard,
    number: "04",
    label: "Filmes especiais",
    title: "Semana do Clássico",
    description: "Durante a exibição de filmes clássicos ou retrô, os ingressos são vendidos pela metade do preço e combos têm 15% de desconto.",
  },
  {
    icon: Sparkles,
    number: "05",
    label: "Programa CineSphere",
    title: "Pontos em Dobro",
    description: "Durante o final de semana, clientes acumulam pontos em dobro ao comprar ingressos e combos. Os pontos podem ser trocados por ingressos ou descontos.",
  },
  {
    icon: Heart,
    number: "06",
    label: "Sexta e sábado",
    title: "Noite dos Namorados",
    description: "Em exibições após as 19h, pares de ingressos ganham uma sobremesa ou dois mini-brownies ao comprar o combo maior de pipoca e bebida.",
  },
];

const Sale = () => {
  return (
    <main className="sale-page">
      <Container>
        <section className="sale-hero" aria-labelledby="sale-title">
          <div className="sale-hero-copy">
            <p className="sale-eyebrow"><BadgePercent size={14} aria-hidden="true" /> CineSphere · momentos especiais</p>
            <h1 id="sale-title">Mais cinema.<br /><span>Mais motivos para voltar.</span></h1>
            <p className="sale-hero-lead">
              Descubra as experiências e vantagens que tornam cada sessão ainda mais especial — para dividir, comemorar ou simplesmente aproveitar.
            </p>
            <div className="sale-hero-action-row">
              <Link to="/" className="sale-primary-action">Encontrar uma sessão <span aria-hidden="true">↗</span></Link>
              <span className="sale-hero-note">Ofertas pensadas para a sua próxima história.</span>
            </div>
          </div>

          <div className="sale-hero-art" aria-label="Bilhete especial CineSphere">
            <div className="sale-hero-ticket">
              <span className="sale-hero-ticket-top">CineSphere <b>CS</b></span>
              <div className="sale-hero-ticket-body">
                <span>OFERTA</span>
                <strong>Viva mais<br /><em>momentos.</em></strong>
                <small>Uma vantagem para cada história</small>
              </div>
              <span className="sale-hero-ticket-bottom"><Clapperboard size={13} aria-hidden="true" /> A experiência começa aqui</span>
            </div>
            <span className="sale-hero-orb sale-hero-orb-red" aria-hidden="true" />
            <span className="sale-hero-orb sale-hero-orb-cyan" aria-hidden="true" />
          </div>
        </section>

        <section className="sale-offers" aria-labelledby="sale-offers-title">
          <div className="sale-section-heading">
            <div>
              <p className="sale-eyebrow">Ofertas em destaque</p>
              <h2 id="sale-offers-title">Escolha seu momento.</h2>
            </div>
            <span className="sale-section-note">Benefícios para viver o cinema do seu jeito</span>
          </div>

          <div className="sale-offer-grid">
            {promotions.map(({ icon: Icon, number, label, title, description }, index) => (
              <article className={`sale-offer-card sale-offer-card-${index + 1}`} key={title}>
                <div className="sale-offer-card-top">
                  <span className="sale-offer-number">{number}</span>
                  <div className="sale-offer-icon"><Icon size={19} strokeWidth={1.7} aria-hidden="true" /></div>
                </div>
                <p className="sale-offer-label">{label}</p>
                <h3>{title}</h3>
                <p className="sale-offer-description">{description}</p>
                <span className="sale-offer-line" aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="sale-closing" aria-labelledby="sale-closing-title">
          <div className="sale-closing-copy">
            <p className="sale-eyebrow"><LinkIcon size={14} aria-hidden="true" /> O próximo filme está esperando</p>
            <h2 id="sale-closing-title">Uma boa história fica ainda melhor<br /><span>quando é compartilhada.</span></h2>
          </div>
          <Link to="/" className="sale-secondary-action">Ver programação <span aria-hidden="true">→</span></Link>
        </section>
      </Container>
    </main>
  );
};

export default Sale;
