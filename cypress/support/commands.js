/**
 * Cria um usuário diretamente via API do serverest.
 * Usado como pré-condição (setup) para testes de UI que exigem
 * um usuário já cadastrado, evitando depender do fluxo de cadastro pela tela.
 *
 * @param {object} user - objeto no formato { nome, email, password, administrador }
 * @returns {Cypress.Chainable} resposta da requisição, com o body do usuário criado
 */
Cypress.Commands.add('createUserViaApi', (user) => {
  return cy
    .request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      body: {
        nome: user.nome,
        email: user.email,
        password: user.password,
        administrador: String(user.administrador),
      },
    })
    .then((response) => {
      expect(response.status).to.eq(201);
      return { ...user, _id: response.body._id };
    });
});

/**
 * Realiza login pela interface (UI).
 * Mantido como comando para reutilização entre specs que precisam
 * de uma sessão autenticada como pré-condição.
 *
 * @param {string} email
 * @param {string} password
 */
Cypress.Commands.add('uiLogin', (email, password) => {
  cy.visit('/login');
  cy.get('[data-testid="email"]').clear().type(email);
  cy.get('[data-testid="senha"]').clear().type(password, { log: false });
  cy.get('[data-testid="entrar"]').click();
});
