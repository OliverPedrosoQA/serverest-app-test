import registerPage from '../../support/pages/RegisterPage';
import loginPage from '../../support/pages/LoginPage';
import { buildUser, buildAdminUser } from '../../support/factories/userFactory';

describe('UI - Cadastro de usuário', () => {
  context('Fluxos válidos', () => {
    it('deve cadastrar um usuário administrador com sucesso', () => {
      const user = buildAdminUser();

      registerPage.visit();
      registerPage.register(user);

      registerPage.alert().should('contain', 'Cadastro realizado com sucesso');
    });

    it('deve cadastrar um usuário comum (não administrador) com sucesso', () => {
      const user = buildUser();

      registerPage.visit();
      registerPage.register(user);

      registerPage.alert().should('contain', 'Cadastro realizado com sucesso');
    });
  });

  context('Fluxos alternativos e negativos', () => {
    it('deve exibir mensagens de obrigatoriedade ao enviar formulário vazio', () => {
      registerPage.visit();
      registerPage.submit();

      registerPage.alert().should('contain', 'Nome é obrigatório');
      registerPage.alert().should('contain', 'Email é obrigatório');
      registerPage.alert().should('contain', 'Password é obrigatório');
    });

    it('não deve permitir cadastrar e-mail já utilizado', () => {
      const user = buildUser();

      // Primeiro cadastro deve funcionar.
      registerPage.visit();
      registerPage.register(user);
      registerPage.alert().should('contain', 'Cadastro realizado com sucesso');

      // Segundo cadastro com o mesmo e-mail deve ser bloqueado.
      registerPage.visit();
      registerPage.register(user);
      registerPage.alert().should('contain', 'Este email já está sendo usado');
    });

    it('deve navegar do cadastro para a tela de login', () => {
      registerPage.visit();
      registerPage.elements.loginLink().click();

      cy.url().should('include', '/login');
      loginPage.elements.submit().should('be.visible');
    });
  });
});
