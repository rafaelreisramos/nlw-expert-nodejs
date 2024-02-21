# O Projeto

Uma API para criação de enquetes com atualização dos resultados em tempo real desenvolvida durante o evento **nlw-expert-nodejs** da [Rocketseat](https://www.rocketseat.com.br/).

### Tecnologias

- [Node.js](https://nodejs.org/en) com o [Fastify](https://github.com/fastify/fastify) para a construção da API
- [Typescript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/) ORM com banco de dados [PostgreSQL](https://www.postgresql.org/)
- [WebSocket](https://github.com/fastify/fastify-websocket) para subscrição dos resultados em tempo real
- [Redis](https://redis.io/) para acumulação dos resultados

## O que você pode aprender por aqui...

O uso do docker em ambiente de desenvolvimento para facilitar a integração com o banco de dados.

O uso de variáveis ambiente com suporte nativo do Node.js.

O uso do ORM Prisma para abstrair a conexão e chamadas ao banco de dados Postgres.

O uso de cookies de sessão para identificação do usuário votante (**Obs.:** não é a melhor maneira mas uma alternativa neste projeto onde não temos autenticação do usuário.)

O padrão Pub/Sub para publicar e subscrever o resultado de uma enquete.

O uso de WebSocket para atualização de resultados da enquete em tempo real.

## Instalação

### Requisitos

Você pode acessar o material com os requisitos e instruções de instalação da própria Rocketseat [aqui](https://efficient-sloth-d85.notion.site/Node-js-5fee22f8325040e5835fccce11beb0a5)

Caso o material não esteja disponível no link acima os requisitos básicos são:

- Docker e Docker Compose
- Node.js
- VS Code ou outro editor de sua preferência.
- [Hoppscotch em tempo real](https://hoppscotch.io/realtime/websocket) para verificar a comunicação do socket.

### Como rodar o Projeto

Clone o repositório

```sh
git clone https://github.com/rafaelreisramos/nlw-expert-nodejs.git
```

Copie o arquivo .env.example para um arquivo .env

```sh
cp .env.example .env
```

Instale os pacotes

```sh
pnpm i
```

Suba os containers docker

```sh
docker compose up -D
```

Rode as migrations

```sh
pnpm prisma migrate dev
```

Rode a API

```sh
pnpm run dev
```

Agora você já pode acessar as rotas da API.

Publicar uma enquete:

`POST /polls`

Listar as enquetes:

`GET /polls/:pollId`

Votar em uma enquete:

`POST /polls/:pollId/vote`

Subscrever e verificar a comunicação em tempo real dos resultados:
`WS /polls/:pollId/results`

O arquivo [polls.ts](./polls.http) tem a documentação das rotas e as estruturas de dados para as rotas do tipo `POST`. O arquivo funcionando em conjunto com a extensão [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) do VS Code já substitui as variáveis que retornam na criação das enquetes no campo `pollId`. Caso queira fazer em outro cliente substitua diretamente o parâmetro `pollId` da rota.

Para alterar a opção do voto você pode modificar diretamente o índice de `options` do corpo da requisição da rota de votação. Caso não esteja usando a extensão do VS Code substitua pelo id da opção desejada.
