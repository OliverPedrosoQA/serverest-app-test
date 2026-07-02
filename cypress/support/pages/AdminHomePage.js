import BasePage from './BasePage';

/**
 * Page Object da Home do administrador (/admin/home).
 * Também concentra a navegação da barra superior, compartilhada
 * pelas telas administrativas.
 */
class AdminHomePage extends BasePage {
  elements = {
    welcome: () => cy.contains('h1', 'Bem Vindo'),
    logout: () => cy.get('[data-testid="logout"]'),
    navRegisterProducts: () => cy.contains('a', 'Cadastrar Produtos'),
    navListProducts: () => cy.contains('a', 'Listar Produtos'),
    navRegisterUsers: () => cy.contains('a', 'Cadastrar Usuários'),
    navListUsers: () => cy.contains('a', 'Listar Usuários'),
  };

  welcomeMessage() {
    return this.elements.welcome();
  }

  logout() {
    this.elements.logout().click();
    return this;
  }

  goToRegisterProduct() {
    this.elements.navRegisterProducts().click();
    return this;
  }

  goToListProducts() {
    this.elements.navListProducts().click();
    return this;
  }
}

export default new AdminHomePage();
