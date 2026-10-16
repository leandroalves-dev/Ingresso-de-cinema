<div align="center">

<h2>Sobre o projeto</h2>

<p>
  O <strong>CineSphere</strong> é uma aplicação web de simulação de compra de ingressos de cinema. O projeto foi criado para reproduzir, de forma moderna e imersiva, a jornada de uma pessoa que deseja encontrar um filme, escolher uma sessão, selecionar seus lugares e finalizar um pedido.
</p>

<p>
  A interface foi desenvolvida com uma identidade visual cinematográfica, utilizando fundos escuros, contrastes em vermelho e ciano, iluminação atmosférica, cards editoriais e componentes responsivos para diferentes tamanhos de tela.
</p>

<h2>Para que serve</h2>

<p>
  O CineSphere serve como uma demonstração prática de desenvolvimento frontend para produtos digitais de entretenimento, explorando experiência do usuário, gerenciamento de estado e construção de fluxos completos em uma Single Page Application.
</p>

<p>Com o projeto, é possível:</p>

<ul>
  <li>Explorar filmes, sessões, horários e notícias do universo cinematográfico;</li>
  <li>Visualizar detalhes, sinopses, trailers e informações dos filmes;</li>
  <li>Selecionar data, idioma, sala, horário e assentos;</li>
  <li>Escolher tipos e quantidades de ingressos;</li>
  <li>Adicionar combos de pipoca, bebidas e doces;</li>
  <li>Simular pagamentos por boleto, cartão e Pix;</li>
  <li>Gerar um ingresso digital com o resumo do pedido;</li>
  <li>Preservar o rascunho da compra após a atualização da página;</li>
  <li>Testar um fluxo demonstrativo de cadastro e login.</li>
</ul>

<h2>Principais características</h2>

<table>
  <thead>
    <tr>
      <th>Área</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Programação</strong></td>
      <td>Consulta de sessões por data, sala, idioma e horário.</td>
    </tr>
    <tr>
      <td><strong>Experiência editorial</strong></td>
      <td>Páginas premium para filmes, notícias, preços, promoções e apresentação institucional.</td>
    </tr>
    <tr>
      <td><strong>Checkout</strong></td>
      <td>Fluxo dividido em assentos, ingressos, combos, pagamento e confirmação.</td>
    </tr>
    <tr>
      <td><strong>Persistência local</strong></td>
      <td>Rascunho versionado no navegador para manter os dados durante atualizações da página.</td>
    </tr>
    <tr>
      <td><strong>Responsividade</strong></td>
      <td>Layouts adaptados para desktop, tablet e dispositivos móveis.</td>
    </tr>
    <tr>
      <td><strong>Acessibilidade</strong></td>
      <td>Uso de labels, landmarks, estados de foco, textos alternativos e semântica HTML.</td>
    </tr>
  </tbody>
</table>

<h2>Como foi desenvolvido</h2>

<p>
  A aplicação foi construída como uma <strong>SPA (Single Page Application)</strong>, com navegação no cliente e rotas gerenciadas pelo React Router. Os dados de filmes, preços, combos e notícias são locais e ficam organizados em arquivos JSON, acessados por uma camada de services.
</p>

<p>
  O estado do fluxo de compra é compartilhado por contexts específicos, mantendo cada responsabilidade separada:
</p>

<ul>
  <li><strong>MovieContext:</strong> filme, sala, horário, idioma e data selecionados;</li>
  <li><strong>SeatContext:</strong> assentos selecionados pelo usuário;</li>
  <li><strong>PaymentContext:</strong> ingressos, combos, taxas e valores totais;</li>
  <li><strong>checkoutStorage:</strong> validação e persistência do rascunho da compra no localStorage.</li>
</ul>

<p>
  A arquitetura prioriza componentes funcionais, hooks próprios, tipagem estática, estilos escopados por página e reutilização de componentes de interface.
</p>

<h2>Stacks utilizadas</h2>

<h3>Aplicação</h3>

<ul>
  <li><strong>React 19:</strong> construção dos componentes e interfaces;</li>
  <li><strong>TypeScript 5.7:</strong> tipagem estática e segurança dos contratos;</li>
  <li><strong>Vite 6.2:</strong> desenvolvimento local e build de produção;</li>
  <li><strong>React Router DOM 7.3:</strong> rotas e navegação da aplicação.</li>
</ul>

<h3>Interface e experiência visual</h3>

<ul>
  <li><strong>Tailwind CSS 4:</strong> utilitários de layout, espaçamento e responsividade;</li>
  <li><strong>CSS:</strong> efeitos cinematográficos, animações, sombras e estilos específicos das páginas;</li>
  <li><strong>Lucide React:</strong> ícones principais da interface;</li>
  <li><strong>React Icons:</strong> ícones complementares;</li>
  <li><strong>React Slick:</strong> carrosséis de conteúdo e programação.</li>
</ul>

<h3>Arquitetura e qualidade</h3>

<ul>
  <li><strong>Context API:</strong> gerenciamento de estado compartilhado;</li>
  <li><strong>React Hooks:</strong> comportamento, carregamento e autenticação demonstrativa;</li>
  <li><strong>ESLint 9:</strong> análise estática e padronização;</li>
  <li><strong>TypeScript strict:</strong> maior segurança durante o desenvolvimento;</li>
  <li><strong>JSON local:</strong> catálogo de filmes, preços, combos e notícias.</li>
</ul>

<h2>Observação</h2>

<p>
  O CineSphere é um projeto frontend demonstrativo. Não possui backend, banco de dados, autenticação real ou processamento financeiro. O cadastro, o login, a persistência do checkout e os métodos de pagamento representam simulações executadas no navegador.
</p>

<p align="center">
  <strong>CineSphere · Onde cada sessão se transforma em uma experiência.</strong>
</p>
