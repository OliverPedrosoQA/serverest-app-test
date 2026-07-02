const baseUrl = () => Cypress.env('apiUrl');

/**
 * Camada de acesso ao recurso de Produtos (/produtos).
 * As rotas de escrita exigem token de administrador no header Authorization.
 */
export const produtosApi = {
  /**
   * @param {object} body - { nome, preco, descricao, quantidade }
   * @param {string} [token] - authorization retornado no /login
   */
  create(body, token) {
    return cy.request({
      method: 'POST',
      url: `${baseUrl()}/produtos`,
      failOnStatusCode: false,
      headers: token ? { Authorization: token } : {},
      body,
    });
  },

  getById(id) {
    return cy.request({
      method: 'GET',
      url: `${baseUrl()}/produtos/${id}`,
      failOnStatusCode: false,
    });
  },

  list(qs = {}) {
    return cy.request({
      method: 'GET',
      url: `${baseUrl()}/produtos`,
      qs,
    });
  },

  remove(id, token) {
    return cy.request({
      method: 'DELETE',
      url: `${baseUrl()}/produtos/${id}`,
      failOnStatusCode: false,
      headers: token ? { Authorization: token } : {},
    });
  },
};
