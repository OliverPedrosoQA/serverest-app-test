import BasePage from './BasePage';

/**
 * Page Object da tela de Cadastro de usuário (/cadastrarusuarios).
 */
class RegisterPage extends BasePage {
  elements = {
    nome: () => cy.get('[data-testid="nome"]'),
    email: () => cy.get('[data-testid="email"]'),
    password: () => cy.get('[data-testid="password"]'),
    adminCheckbox: () => cy.get('[data-testid="checkbox"]'),
    submit: () => cy.get('[data-testid="cadastrar"]'),
    loginLink: () => cy.get('[data-testid="entrar"]'),
  };

  visit() {
    return super.visit('/cadastrarusuarios');
  }

  fillName(nome) {
    this.elements.nome().clear().type(nome);
    return this;
  }

  fillEmail(email) {
    this.elements.email().clear().type(email);
    return this;
  }

  fillPassword(password) {
    this.elements.password().clear().type(password, { log: false });
    return this;
  }

  checkAdmin() {
    this.elements.adminCheckbox().check();
    return this;
  }

  submit() {
    this.elements.submit().click();
    return this;
  }

  /**
   * Fluxo completo de cadastro a partir de um objeto de usuário.
   * @param {object} user - { nome, email, password, administrador }
   */
  register(user) {
    this.fillName(user.nome);
    this.fillEmail(user.email);
    this.fillPassword(user.password);
    if (user.administrador) {
      this.checkAdmin();
    }
    this.submit();
    return this;
  }
}

export default new RegisterPage();
