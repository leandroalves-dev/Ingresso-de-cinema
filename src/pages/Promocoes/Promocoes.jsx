import './Promocoes.css';

const Promocoes = () => {
    return (
        <div className='container'>

            <div className="promotion">
                <h2>Combo Dupla Dinâmica</h2>
                <p>Na compra de dois ingressos para o mesmo filme e horário, os clientes ganham um desconto de 20% no combo de pipoca e refrigerante.</p>
            </div>

            <div className="promotion">
                <h2>Sessão Pipoca Grátis</h2>
                <p>Em sessões de quarta-feira, quem comprar um ingresso inteiro ganha uma pipoca média grátis.</p>
            </div>

            <div className="promotion">
                <h2>Ingresso Família</h2>
                <p>Para grupos de quatro ou mais pessoas (mínimo dois ingressos inteiros), um desconto de 25% é aplicado ao total, válido para qualquer sessão aos sábados.</p>
            </div>

            <div className="promotion">
                <h2>Semana do Clássico</h2>
                <p>Durante a exibição de filmes clássicos ou retro, os ingressos são vendidos pela metade do preço, e combos de pipoca média e bebida têm 15% de desconto.</p>
            </div>

            <div className="promotion">
                <h2>Pontos em Dobro</h2>
                <p>Programa de fidelidade em que, durante o final de semana, clientes acumulam pontos em dobro ao comprar ingressos e combos. Esses pontos podem ser trocados por ingressos ou descontos em bomboniere.</p>
            </div>

            <div className="promotion">
                <h2>Noite dos Namorados</h2>
                <p>Em exibições após as 19h nas sextas e sábados, pares de ingressos ganham uma sobremesa ou dois mini-brownies ao comprar o combo maior de pipoca e bebida.</p>
            </div>
        </div>
    )
}

export default Promocoes