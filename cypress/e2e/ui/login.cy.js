import loginPage from '../../support/pages/LoginPage';
import adminHomePage from '../../support/pages/AdminHomePage';
import { buildAdminUser } from '../../support/factories/userFactory';

describe('UI - Login', () => {
  context('Fluxos válidos', () => {
    let user;

    // Cria um usuário admin novo via API antes de cada teste do contexto,
    // garantindo independência: cada cenário tem sua própria massa de dados.
    beforeEach(() => {
      user = buildAdminUser();
      cy.createUserViaApi(user);
    });

    it('deve autenticar com credenciais válidas e acessar a home do admin', () => {
      loginPage.visit();
      loginPage.login(user.email, user.password);

      cy.url().should('include', '/admin/home');
      adminHomePage
        .welcomeMessage()
        .should('be.visible')
        .and('contain', user.nome);
      adminHomePage.elements.logout().should('be.visible');
    });
  });

  context('Fluxos alternativos e negativos', () => {
    it('deve exibir mensagens de obrigatoriedade ao enviar o formulário vazio', () => {
      loginPage.visit();
      loginPage.submit();

      loginPage.alert().should('contain', 'Email é obrigatório');
      loginPage.alert().should('contain', 'Password é obrigatório');
      cy.url().should('include', '/login');
    });

    it('deve bloquear login com senha incorreta', () => {
      const user = buildAdminUser();
      cy.createUserViaApi(user);

      loginPage.visit();
      loginPage.login(user.email, 'senha-invalida-123');

      loginPage.alert().should('contain', 'Email e/ou senha inválidos');
      cy.url().should('include', '/login');
    });

    it('deve bloquear login de usuário inexistente', () => {
      loginPage.visit();
      loginPage.login('inexistente@serverest-qa.com', 'qualquer123');

      loginPage.alert().should('contain', 'Email e/ou senha inválidos');
    });
  });
});
