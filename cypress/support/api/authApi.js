const baseUrl = () => Cypress.env('apiUrl');

/**
 * Camada de acesso à rota de autenticação (/login).
 * Centraliza a montagem das requisições, mantendo os specs focados
 * apenas em cenário e asserções (equivalente ao POM para API).
 */
export const authApi = {
  /**
   * @param {object} body - { email, password }
   */
  login(body) {
    return cy.request({
      method: 'POST',
      url: `${baseUrl()}/login`,
      failOnStatusCode: false,
      body,
    });
  },
};
