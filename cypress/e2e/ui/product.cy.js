import productRegisterPage from '../../support/pages/ProductRegisterPage';
import productListPage from '../../support/pages/ProductListPage';
import { buildAdminUser } from '../../support/factories/userFactory';
import { buildProduct } from '../../support/factories/productFactory';

describe('UI - Cadastro de produto (fluxo do administrador)', () => {
  let admin;

  // Pré-condição via API: cria o admin e autentica pela UI antes de cada teste.
  beforeEach(() => {
    admin = buildAdminUser();
    cy.createUserViaApi(admin);
    cy.uiLogin(admin.email, admin.password);
    cy.url().should('include', '/admin/home');
  });

  it('deve cadastrar um produto e exibi-lo na listagem', () => {
    const product = buildProduct();

    productRegisterPage.visit();
    productRegisterPage.register(product);

    // Após cadastrar, a aplicação redireciona para a listagem de produtos.
    cy.url().should('include', '/admin/listarprodutos');
    productListPage
      .rowByProductName(product.nome)
      .should('be.visible')
      .and('contain', product.preco)
      .and('contain', product.quantidade);
  });

  it('deve exibir mensagens de obrigatoriedade ao enviar produto sem dados', () => {
    productRegisterPage.visit();
    productRegisterPage.submit();

    productRegisterPage.alert().should('contain', 'Nome é obrigatório');
    productRegisterPage.alert().should('contain', 'Preco é obrigatório');
    productRegisterPage.alert().should('contain', 'Descricao é obrigatório');
    productRegisterPage.alert().should('contain', 'Quantidade é obrigatório');
  });

  it('não deve permitir cadastrar dois produtos com o mesmo nome', () => {
    const product = buildProduct();

    productRegisterPage.visit();
    productRegisterPage.register(product);
    cy.url().should('include', '/admin/listarprodutos');

    // Tenta cadastrar novamente com o mesmo nome.
    productRegisterPage.visit();
    productRegisterPage.register(product);
    productRegisterPage
      .alert()
      .should('contain', 'Já existe produto com esse nome');
  });
});
