# Regra de stack e dependências

Esta regra se aplica a todo o projeto. Antes de alterar dependências, configuração de build ou padrões de código, consulte este documento e confirme o `package.json` e o `package-lock.json` atuais.

## Stack oficial do projeto

- Aplicação web SPA em React com TypeScript.
- Vite `6.2.0` como servidor de desenvolvimento e bundler.
- React `19.0.0` e React DOM `19.0.0`.
- TypeScript com `strict: true`, `moduleResolution: "bundler"`, JSX `react-jsx` e saída gerada pelo Vite.
- React Router DOM `7.3.0` para a navegação no cliente.
- Tailwind CSS `4.0.9`, integrado pelo `@tailwindcss/vite` `4.0.9`.
- Dados de catálogo locais em `src/json`, importados estaticamente por `src/services/movieServices.ts`.
- Context API e hooks próprios para estado de autenticação, filme, assentos e pagamento; não há biblioteca externa de estado global.
- React Slick `0.30.3` + Slick Carousel `1.8.1` para carrosséis.
- React Icons `5.5.0` para ícones.
- ESLint `9.21.0` com flat config em `eslint.config.js`.

O projeto é uma simulação de compra de ingressos no navegador. Não há backend, banco de dados ou biblioteca de autenticação/pagamento real nas dependências atuais. O estado persistido e os dados locais devem continuar sendo tratados como comportamento de demonstração, não como segurança ou persistência de produção.

## Dependências de runtime

As versões abaixo mostram a faixa declarada no `package.json` e a versão atualmente resolvida no lockfile:

| Pacote | Declarado | Lockfile | Uso e regra de manutenção |
| --- | --- | --- | --- |
| `@tailwindcss/vite` | `^4.0.9` | `4.0.9` | Plugin oficial do Tailwind no Vite; manter no array `plugins` de `vite.config.ts`. |
| `react` | `^19.0.0` | `19.0.0` | Componentes e hooks; preferir componentes funcionais e hooks, evitando APIs legadas. |
| `react-dom` | `^19.0.0` | `19.0.0` | Montagem da aplicação em `src/main.tsx`; preservar `createRoot` e `StrictMode`. |
| `react-icons` | `^5.5.0` | `5.5.0` | Ícones; importar somente os ícones utilizados e preservar acessibilidade com `aria-label` quando o ícone for a única indicação de uma ação. |
| `react-router-dom` | `^7.3.0` | `7.3.0` | Rotas e navegação; usar `Link`/`useNavigate` em vez de links que recarreguem a SPA e manter a configuração de rotas em `App.tsx` coerente com os fluxos existentes. |
| `react-slick` | `^0.30.3` | `0.30.3` | Componente React de carrossel; manter as folhas de estilo do Slick carregadas e configurar dimensões responsivas sem causar overflow horizontal. |
| `slick-carousel` | `^1.8.1` | `1.8.1` | CSS e recursos do Slick usados por `react-slick`; atualizar em conjunto com `react-slick` quando necessário. |
| `tailwind-merge` | `^3.0.2` | `3.0.2` | Combinação segura de classes Tailwind, usada pelo componente `Modal`; não substituir por concatenação manual quando houver classes conflitantes. |
| `tailwindcss` | `^4.0.9` | `4.0.9` | Estilização utilitária; o ponto de entrada atual é `@import "tailwindcss"` em `src/index.css`. |

## Dependências de desenvolvimento

| Pacote | Declarado | Lockfile | Boa prática |
| --- | --- | --- | --- |
| `@eslint/js` | `^9.21.0` | `9.21.0` | Preservar as regras recomendadas usadas pela flat config. |
| `@types/react` | `^19.0.10` | `19.0.10` | Manter alinhado com a major do React. |
| `@types/react-dom` | `^19.0.4` | `19.0.4` | Manter alinhado com a major do React DOM. |
| `@types/react-slick` | `^0.23.13` | `0.23.13` | Usar os tipos nas props do carrossel; revisar tipos antes de recorrer a `any`. |
| `@vitejs/plugin-react` | `^4.3.4` | `4.3.4` | Manter como plugin oficial do React no Vite. |
| `eslint` | `^9.21.0` | `9.21.0` | Executar com `npm run lint`; novas regras devem ser compatíveis com flat config. |
| `eslint-plugin-react-hooks` | `^5.1.0` | `5.2.0` | Preservar as regras de hooks; não ocultar violações com desabilitações locais sem justificativa. |
| `eslint-plugin-react-refresh` | `^0.4.19` | `0.4.19` | Preservar a regra que protege o Fast Refresh e exportações de componentes. |
| `globals` | `^15.15.0` | `15.15.0` | Usar somente para declarar os globais de navegador da configuração ESLint. |
| `typescript` | `~5.7.2` | `5.7.3` | Manter o compilador dentro da faixa `5.7.x`; corrigir tipos em vez de relaxar `strict`, `noUnused*` ou `noUncheckedSideEffectImports`. |
| `typescript-eslint` | `^8.24.1` | `8.25.0` | Usar as configurações recomendadas junto com ESLint 9 e manter arquivos `.ts`/`.tsx` tipados. |
| `vite` | `^6.2.0` | `6.2.0` | Usar `vite` para desenvolvimento/build e manter a configuração em `vite.config.ts`. |

## Regras de implementação

### React e TypeScript

- Criar componentes funcionais e hooks; seguir as regras de hooks e manter dependências de `useEffect` completas.
- Preferir props e tipos explícitos. Não introduzir `any`, casts amplos ou `@ts-ignore` para contornar erros.
- Manter a separação existente entre `components`, `pages`, `hooks`, `context`, `services`, `types` e `utils`.
- Para estado compartilhado deste fluxo, reutilizar os contexts existentes antes de criar outra solução global.
- Não armazenar segredos, tokens privados ou credenciais no código enviado ao navegador.
- Preservar `StrictMode`, a acessibilidade dos formulários e estados de carregamento/erro já existentes.

### Rotas e Vite

- Usar `npm run dev` no desenvolvimento, `npm run build` para a verificação de produção e `npm run preview` para servir o build localmente.
- O script `build` executa `tsc -b` antes de `vite build`; qualquer alteração deve continuar passando pelas duas etapas.
- O `base` local do Vite é `/` e o `BrowserRouter` não usa `basename`, portanto a aplicação deve abrir em `http://localhost:5173/`. Ao adicionar rotas, testar navegação direta e refresh em rotas profundas. Se a aplicação voltar a ser publicada em um subcaminho, atualizar de forma coordenada o `base` do Vite, o `<base>` do `index.html` e o `basename` do router.
- Os dados do catálogo são locais e entram no bundle via imports JSON; não criar chamadas HTTP para o próprio catálogo sem uma necessidade explícita. Não colocar chaves privadas em variáveis expostas ao cliente.

### Tailwind CSS 4

- Manter `@tailwindcss/vite` no `vite.config.ts` e `@import "tailwindcss"` em `src/index.css`.
- Preferir as APIs e o modelo CSS-first do Tailwind 4. Não reintroduzir diretivas de entrada do Tailwind 3 (`@tailwind base`, `@tailwind components`, `@tailwind utilities`) sem uma decisão explícita.
- `tailwind.config.js` é uma configuração legada/auxiliar deste repositório. Se forem necessários tokens ou extensões nele, confirmar a compatibilidade com Tailwind 4 e carregá-lo explicitamente; caso contrário, preferir tokens no CSS.
- Usar `tailwind-merge` ao combinar classes potencialmente conflitantes, especialmente em componentes reutilizáveis.

### Dados locais

- Manter os JSON em `src/json` e acessá-los através de funções em `src/services/movieServices.ts`; componentes devem consumir services ou hooks, não importar arquivos de dados diretamente.
- Manter `resolveJsonModule: true` no `tsconfig.app.json` para que os imports sejam verificados pelo TypeScript e processados pelo Vite.
- Tipar payloads e respostas com os tipos de `src/types`; validar estados de carregamento, erro e dados vazios.
- Usar caminhos locais como `/imagens/...` para imagens disponíveis em `public/imagens`; manter URLs externas apenas para conteúdos realmente externos, como vídeos incorporados.
- Representar a programação de filmes com `schedule.weekdays` usando ISO `1` (segunda-feira) a `7` (domingo); não voltar a armazenar listas manuais de datas em `showDates`.
- Calcular datas de sessão com componentes locais de `Date` e formato `YYYY-MM-DD`; não usar `toISOString()` para definir a data local selecionada.
- Tratar dados de `localStorage` como entrada não confiável: fazer parsing defensivo e não considerar a autenticação local como proteção real.
- Não alterar o formato dos JSON sem revisar os consumidores em `src/services`, hooks e páginas.

### ESLint e dependências

- Executar `npm run lint` depois de alterações em `.ts`, `.tsx` ou na configuração do ESLint.
- Executar `npm run build` antes de considerar concluída qualquer alteração de dependência, configuração ou TypeScript.
- Usar `npm ci` em ambientes reprodutíveis/CI para respeitar integralmente o `package-lock.json`; usar `npm install` apenas quando a árvore de dependências precisar ser alterada.
- Ao atualizar um pacote, revisar a compatibilidade entre React, React DOM, tipos React, Vite/plugin React, Tailwind/plugin Vite e ESLint/typescript-eslint. Atualizações major devem ser deliberadas, não automáticas.
- Não executar `npm audit fix` como manutenção cega: revisar o diff e o impacto no lockfile antes de aceitar mudanças de versão.
- Não adicionar bibliotecas para problemas já atendidos pelos hooks, Context API, CSS/Tailwind ou utilitários existentes sem justificar a necessidade.

## Verificação mínima

```bash
npm run lint
npm run build
```

O projeto não declara framework de testes automatizados. Portanto, lint e build confirmam qualidade estática e compilação, mas não substituem a verificação manual dos fluxos de login, escolha de filme, assento, combos, pagamento simulado, persistência local e impressão do ingresso.
