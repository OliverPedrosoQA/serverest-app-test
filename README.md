# serverest-app-test

Automação de testes **E2E (UI)** e **API** da aplicação [ServeRest](https://front.serverest.dev/),
utilizando **Cypress** + **JavaScript** com o padrão **Page Object Model (POM)**.

## Stack

- [Cypress](https://www.cypress.io/) 15
- JavaScript (ES Modules nos specs/pages)
- [@faker-js/faker](https://fakerjs.dev/) — geração de massa de dados dinâmica

## Pré-requisitos

- Node.js 18+ (recomendado LTS)
- npm 9+

## Instalação

```bash
npm install
```

O comando acima instala o Cypress e as demais dependências de desenvolvimento.

## Como executar

```bash
# Abre a interface interativa do Cypress (Test Runner)
npm run cy:open

# Executa todos os testes em modo headless
npm run cy:run

# Executa apenas os testes de UI
npm run test:ui

# Executa apenas os testes de API
npm run test:api
```

## Estrutura do projeto

```
.
├── cypress.config.js              # Configuração (baseUrl, timeouts, env, retries)
├── cypress/
│   ├── e2e/
│   │   ├── ui/                    # Cenários E2E de interface
│   │   │   ├── login.cy.js
│   │   │   ├── register.cy.js
│   │   │   └── product.cy.js
│   │   └── api/                   # Cenários de API (a implementar)
│   ├── fixtures/                  # Massa estática (ex.: imagem de produto)
│   └── support/
│       ├── commands.js           # Comandos customizados (createUserViaApi, uiLogin)
│       ├── e2e.js                # Bootstrap do suporte
│       ├── factories/            # Fábricas de dados dinâmicos (faker)
│       │   ├── userFactory.js
│       │   └── productFactory.js
│       └── pages/                # Page Objects (POM)
│           ├── BasePage.js
│           ├── LoginPage.js
│           ├── RegisterPage.js
│           ├── AdminHomePage.js
│           ├── ProductRegisterPage.js
│           └── ProductListPage.js
```

## Decisões de arquitetura

- **Page Object Model (POM):** cada tela é uma classe que encapsula seletores e
  ações, expondo uma API de negócio (ex.: `loginPage.login(email, senha)`). Isso
  isola os testes das mudanças de UI e facilita a manutenção.
- **Seletores por `data-testid`:** priorizam-se atributos estáveis dedicados a
  teste, em vez de classes de CSS ou textos voláteis.
- **Independência entre cenários:** cada teste gera sua própria massa via
  `faker`, evitando dependência de dados pré-existentes ou de ordem de execução.
- **Setup via API:** quando um usuário autenticado é apenas pré-condição (e não o
  objeto do teste), ele é criado via API (`cy.createUserViaApi`), deixando o teste
  mais rápido e estável do que criá-lo pela UI.
- **Sincronização:** utiliza-se a espera automática (retry-ability) das asserções
  do Cypress, sem `wait` fixo.

## Cenários de UI implementados

**Login** (`login.cy.js`)
- Autenticação com credenciais válidas → acesso à home do admin
- Validação de campos obrigatórios (formulário vazio)
- Bloqueio com senha incorreta
- Bloqueio de usuário inexistente

**Cadastro de usuário** (`register.cy.js`)
- Cadastro de administrador com sucesso
- Cadastro de usuário comum com sucesso
- Validação de campos obrigatórios
- Bloqueio de e-mail duplicado
- Navegação para a tela de login

**Cadastro de produto** (`product.cy.js`)
- Cadastro de produto e validação na listagem (E2E completo com login admin)
- Validação de campos obrigatórios
- Bloqueio de produto com nome duplicado

## Testes de API

Os cenários de API ficarão em `cypress/e2e/api/` e serão implementados a partir
do contrato Swagger (https://serverest.dev/).
