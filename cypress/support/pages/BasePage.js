/**
 * Classe base para todos os Page Objects.
 * Concentra comportamentos comuns (navegação e leitura de alertas)
 * para evitar duplicação e facilitar manutenção.
 */
export default class BasePage {
  /**
   * @param {string} path - rota relativa à baseUrl
   */
  visit(path = '/') {
    cy.visit(path);
    return this;
  }

  /**
   * Retorna o(s) elemento(s) de alerta exibido(s) pela aplicação.
   * O serverest usa a classe .alert tanto para erro quanto para sucesso.
   */
  alert() {
    return cy.get('.alert');
  }
}
