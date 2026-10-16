# CineSphere

Aplicação web de simulação de compra de ingressos de cinema. O CineSphere apresenta uma experiência completa de descoberta de filmes e reserva de sessões, desde a escolha da programação até a geração de um ingresso digital.

> Este projeto é uma simulação para estudo e demonstração de interfaces, navegação, gerenciamento de estado e persistência no navegador. Não existe backend, banco de dados ou processamento real de pagamentos.

## O que é o projeto

O CineSphere representa a jornada de compra de uma experiência de cinema:

- consulta à programação de filmes por data;
- visualização de detalhes, sinopses, trailers e notícias;
- seleção de filme, sala, horário, idioma e data;
- escolha de assentos em um mapa de sala;
- seleção de tipos e quantidades de ingressos;
- seleção de combos de pipoca, bebidas e doces;
- simulação de pagamento por boleto, cartão ou Pix;
- geração de um ingresso digital com os dados do pedido;
- cadastro e login demonstrativos no próprio navegador;
- persistência do rascunho da compra durante atualizações da página.

## Como foi desenvolvido

O projeto foi desenvolvido como uma SPA (Single Page Application), com renderização no cliente e navegação sem recarregamento completo da página.

### Organização da aplicação

- `src/pages`: páginas associadas às rotas da aplicação, incluindo início, detalhes, preços, promoções, assentos, pagamento e confirmação.
- `src/components`: componentes reutilizáveis de layout, cabeçalho, rodapé, modais, programação, cards, paginação e controles de quantidade.
- `src/context`: Context API para compartilhar o filme selecionado, assentos e dados do pedido entre as etapas.
- `src/hooks`: hooks próprios, como `useMovies` e `useAuth`.
- `src/services`: camada de acesso ao catálogo local, preços, combos e notícias.
- `src/json`: dados de demonstração importados estaticamente para o bundle.
- `src/types`: tipos TypeScript para filmes, sessões, preços, combos, notícias e rascunho do checkout.
- `src/utils`: utilitários de autenticação, datas, programação e persistência do checkout.
- `public/imagens`: posters, banners, imagens de combos e demais recursos estáticos.

### Fluxo de compra

O fluxo principal acontece na rota `/seats` e é dividido em etapas:

1. seleção de assentos;
2. escolha dos ingressos;
3. escolha de combos;
4. simulação do pagamento;
5. visualização do ingresso digital.

O estado compartilhado é mantido por três contexts:

- `MovieContext`: filme, sala, sessão, idioma e data selecionados;
- `SeatContext`: assentos escolhidos;
- `PaymentContext`: ingressos, combos, taxas e totais.

O arquivo `src/utils/checkoutStorage.ts` mantém um rascunho versionado no `localStorage`. A leitura é protegida contra JSON inválido, os dados são validados antes de serem restaurados e o step atual permanece após o refresh. O rascunho é limpo ao finalizar a compra ou iniciar explicitamente um novo fluxo.

### Catálogo e dados

O catálogo não utiliza uma API externa. Os dados ficam em arquivos JSON locais:

- `src/json/api.json`: filmes, salas, horários e programação;
- `src/json/prices.json`: preços de sessões 2D, 3D e Premium;
- `src/json/combos.json`: produtos da bomboniere;
- `src/json/movienews.json`: notícias relacionadas a filmes.

`src/services/movieServices.ts` centraliza esses imports e entrega os dados aos componentes por meio do hook `useMovies`. O estado carregado é mantido em cache durante a execução da aplicação para evitar leituras repetidas.

### Autenticação e pagamentos

O cadastro e o login são apenas demonstrativos. Os dados do usuário são armazenados no `localStorage` sob a chave `User` para permitir a simulação do fluxo.

As opções de boleto, cartão e Pix também são simulações locais. Nenhuma transação é enviada para uma instituição financeira e nenhum pagamento real é processado.

Não utilize credenciais reais neste projeto. O armazenamento local do navegador não deve ser tratado como mecanismo seguro de autenticação ou proteção de dados.

## Stacks utilizadas

### Runtime e aplicação

| Tecnologia | Versão declarada | Uso |
| --- | --- | --- |
| React | `19.0.0` | Componentes e ciclo de vida da aplicação |
| React DOM | `19.0.0` | Montagem da aplicação no navegador |
| TypeScript | `5.7.x` | Tipagem estática e contratos dos dados |
| Vite | `6.2.0` | Servidor de desenvolvimento e bundler |
| React Router DOM | `7.3.0` | Rotas e navegação da SPA |

### Interface e estilos

| Tecnologia | Versão declarada | Uso |
| --- | --- | --- |
| Tailwind CSS | `4.0.9` | Utilitários de layout e estilização |
| `@tailwindcss/vite` | `4.0.9` | Integração do Tailwind com o Vite |
| CSS por escopo de página | — | Estilos específicos de páginas, como About, Price e Sale |
| Lucide React | `0.468.0` | Ícones da interface |
| React Icons | `5.5.0` | Ícones complementares |
| React Slick | `0.30.3` | Carrosséis de programação e conteúdo |
| Slick Carousel | `1.8.1` | Estilos e recursos do carrossel |

### Arquitetura e qualidade

- Context API e hooks próprios para estado compartilhado;
- componentes funcionais com React Hooks;
- `strict: true` no TypeScript;
- ESLint 9 com configuração flat;
- `typescript-eslint`, `eslint-plugin-react-hooks` e `eslint-plugin-react-refresh`;
- `tailwind-merge` para combinação segura de classes utilitárias;
- sem biblioteca externa de estado global;
- sem backend, banco de dados ou dependência de autenticação/pagamento real.

## Rotas disponíveis

| Rota | Descrição |
| --- | --- |
| `/` | Programação de filmes e últimas notícias |
| `/about` | Página institucional “Quem somos” |
| `/price` | Tabela de preços por modalidade e período |
| `/sale` | Promoções e benefícios do CineSphere |
| `/seats` | Fluxo de escolha de assentos, ingressos, combos, pagamento e ingresso digital |
| `/details-movies/:id` | Detalhes de um filme |
| `/details-news/:id` | Detalhes de uma notícia |

## Como executar

### Pré-requisitos

- Node.js instalado;
- npm instalado.

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Depois, acesse a URL exibida pelo Vite, normalmente:

```text
http://localhost:5173/
```

### Build de produção

```bash
npm run build
```

O comando executa a verificação TypeScript e gera o bundle de produção na pasta `dist`.

### Preview do build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Verificação do projeto

Antes de considerar uma alteração concluída, utilize:

```bash
npm run lint
npm run build
git diff --check
```

O projeto não possui uma suíte de testes automatizados declarada. Por isso, além das verificações estáticas, os fluxos de login, seleção de filme, assentos, ingressos, combos, pagamento simulado, persistência após refresh e geração do ingresso devem ser verificados manualmente no navegador.
