# CozinhaRamosTCC

````md
# Cozinha Ramos TCC

Sistema web desenvolvido como Trabalho de Conclusão de Curso (TCC), com foco na comparação entre os frameworks React e Angular no desenvolvimento Front-End, utilizando um Backend em Node.js com persistência de dados em MongoDB.

O projeto simula uma plataforma simples de pedidos online para restaurante, permitindo autenticação básica de usuários, visualização de cardápio, gerenciamento de carrinho e envio de pedidos via WhatsApp.


# Objetivo do Projeto

O principal objetivo deste projeto é analisar e comparar a utilização de dois frameworks Front-End modernos — React e Angular — aplicados em um mesmo contexto de negócio.

Além disso, o sistema busca demonstrar:

- Estruturação de aplicações em monorepo;
- Compartilhamento de tipos e constantes entre aplicações;
- Integração entre Front-End, Backend e Banco de Dados;
- Implementação de autenticação básica;
- Persistência de dados utilizando MongoDB;
- Organização de código e separação de responsabilidades.


# Tecnologias Utilizadas

## Front-End

### React App
- React
- TypeScript
- Vite
- TailwindCSS
- Axios

### Angular App
- Angular
- TypeScript
- RxJS


## Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- bcryptjs
- CORS
- dotenv


# Estrutura do Projeto

CozinhaRamosTCC/
│
├── apps/
│   ├── angular-app/
│   └── react-app/
│
├── backend/
│
├── database/
│   └── seed.ts
│
├── metrics/
│   ├── bundle-size/
│   ├── lighthouse/
│   └── reports/
│
├── shared/
│   ├── constants/
│   │   └── config.ts
│   └── types/
│       └── Produto.ts
│
├── package.json
├── package-lock.json
└── README.md
````


# Funcionalidades

## Usuários

* Cadastro de usuário;
* Login;
* Persistência de sessão com localStorage.

## Cardápio

* Listagem de produtos;
* Filtragem por categorias;
* Exibição de disponibilidade.

## Carrinho

* Adicionar itens;
* Remover itens;
* Atualizar quantidade;
* Cálculo automático do total.

## Pedidos

* Registro do pedido no MongoDB;
* Envio automático para WhatsApp;
* Persistência de dados no banco.

<br>

# Banco de Dados

O sistema utiliza MongoDB para persistência das informações.

Coleções utilizadas:

* usuarios
* produtos
* pedidos

<br>

# Arquitetura

O projeto foi estruturado em formato de monorepo, permitindo:

* Compartilhamento de tipos;
* Compartilhamento de constantes;
* Padronização entre aplicações;
* Melhor organização do projeto.

<br>

# Execução do Projeto

## 1. Instalar dependências

```
npm install
```


## 2. Executar Backend

```
cd backend
npm run dev
```

Servidor disponível em:

```
http://localhost:3001
```


## 3. Executar React App

```
cd apps/react-app
npm run dev
```


## 4. Executar Angular App

```
cd apps/angular-app
ng serve
```

<br><br>

# Métricas

As métricas do projeto são armazenadas na pasta:

```
metrics/
```

Incluindo:

* Lighthouse;
* Bundle Size;
* Relatórios comparativos.

<br>

# Resultados Esperados

O projeto busca comparar:

* Performance;
* Organização estrutural;
* Experiência de desenvolvimento;
* Reutilização de código;
* Facilidade de manutenção.

<br>

# Autores

Rafael Almeida<br>
Kaike Garcia

Projeto desenvolvido para fins acadêmicos como Trabalho de Conclusão de Curso.