# Meu Projeto

Sistema de Simulação de Compra de Ingressos de Cinema

Este projeto é uma aplicação interativa onde o usuário pode simular a compra de ingressos de cinema de forma completa. O usuário pode:

- Escolher o filme desejado
- Selecionar o assento
- Definir o tipo de ingresso (ex: inteira, meia)
- Escolher opções de bebida e pipoca

Para finalizar a simulação da compra, o usuário precisa estar logado. Toda a persistência de dados é feita via localStorage, ou seja, não há integração com banco de dados. Ao deslogar, os dados são automaticamente removidos.

Após a finalização do pedido, um bilhete digital é gerado com todas as informações da compra. Trata-se de uma simulação completa do processo de compra de ingresso, ideal para fins de estudo e demonstração de fluxo de usuários, manipulação de estado e uso de armazenamento local no navegador.

## Tecnologias usadas

- ![JavaScript](https://img.shields.io/badge/JavaScript-yellow?style=flat&logo=javascript&logoColor=white) 
- ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) 
- ![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)
- ![Axios Badge](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)


## Como rodar o projeto

1. Clone este repositório:
   ```bash
    git clone https://github.com/leandroalves-dev/sistema-ingresso-cinema-react.git

2. Instale as dependências:
   ```bash
   npm install

3. Rode o projeto
    ```bash
    npm run dev
