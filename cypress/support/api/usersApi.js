const baseUrl = () => Cypress.env('apiUrl');

/**
 * Camada de acesso ao recurso de Usuários (/usuarios).
 * failOnStatusCode: false permite que os specs assertem sobre respostas
 * de erro (4xx) sem que o Cypress interrompa o teste.
 */
export const usersApi = {
  /**
   * @param {object} body - { nome, email, password, administrador: 'true'|'false' }
   */
  create(body) {
    return cy.request({
      method: 'POST',
      url: `${baseUrl()}/usuarios`,
      failOnStatusCode: false,
      body,
    });
  },

  getById(id) {
    return cy.request({
      method: 'GET',
      url: `${baseUrl()}/usuarios/${id}`,
      failOnStatusCode: false,
    });
  },

  /**
   * @param {object} qs - filtros de query string (ex.: { email })
   */
  list(qs = {}) {
    return cy.request({
      method: 'GET',
      url: `${baseUrl()}/usuarios`,
      qs,
    });
  },

  remove(id) {
    return cy.request({
      method: 'DELETE',
      url: `${baseUrl()}/usuarios/${id}`,
      failOnStatusCode: false,
    });
  },
};
