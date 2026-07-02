import BasePage from './BasePage';

/**
 * Page Object da tela de Login (/login).
 * Encapsula seletores e ações, expondo uma API de negócio para os testes.
 */
class LoginPage extends BasePage {
  elements = {
    email: () => cy.get('[data-testid="email"]'),
    password: () => cy.get('[data-testid="senha"]'),
    submit: () => cy.get('[data-testid="entrar"]'),
    registerLink: () => cy.get('[data-testid="cadastrar"]'),
  };

  visit() {
    return super.visit('/login');
  }

  fillEmail(email) {
    this.elements.email().clear().type(email);
    return this;
  }

  fillPassword(password) {
    this.elements.password().clear().type(password, { log: false });
    return this;
  }

  submit() {
    this.elements.submit().click();
    return this;
  }

  /**
   * Fluxo completo de login.
   */
  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
    return this;
  }

  goToRegister() {
    this.elements.registerLink().click();
    return this;
  }
}

export default new LoginPage();
