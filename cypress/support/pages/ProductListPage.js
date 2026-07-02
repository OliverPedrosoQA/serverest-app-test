import BasePage from './BasePage';

/**
 * Page Object da tela de Listagem de Produtos (/admin/listarprodutos).
 */
class ProductListPage extends BasePage {
  elements = {
    title: () => cy.contains('h1', 'Lista dos Produtos'),
    table: () => cy.get('table'),
    rows: () => cy.get('table tbody tr'),
  };

  visit() {
    return super.visit('/admin/listarprodutos');
  }

  /**
   * Retorna a linha da tabela que contém o nome do produto informado.
   */
  rowByProductName(nome) {
    return this.elements.table().contains('td', nome).parent('tr');
  }
}

export default new ProductListPage();
