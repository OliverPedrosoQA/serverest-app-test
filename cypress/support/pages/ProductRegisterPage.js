import BasePage from './BasePage';

/**
 * Page Object da tela de Cadastro de Produtos (/admin/cadastrarprodutos).
 * Observação: o botão de submit do serverest usa o data-testid
 * "cadastarProdutos" (grafia original da aplicação).
 */
class ProductRegisterPage extends BasePage {
  elements = {
    nome: () => cy.get('[data-testid="nome"]'),
    preco: () => cy.get('[data-testid="preco"]'),
    descricao: () => cy.get('[data-testid="descricao"]'),
    quantidade: () => cy.get('[data-testid="quantity"]'),
    imagem: () => cy.get('[data-testid="imagem"]'),
    submit: () => cy.get('[data-testid="cadastarProdutos"]'),
  };

  visit() {
    return super.visit('/admin/cadastrarprodutos');
  }

  fillName(nome) {
    this.elements.nome().clear().type(nome);
    return this;
  }

  fillPrice(preco) {
    this.elements.preco().clear().type(String(preco));
    return this;
  }

  fillDescription(descricao) {
    this.elements.descricao().clear().type(descricao);
    return this;
  }

  fillQuantity(quantidade) {
    this.elements.quantidade().clear().type(String(quantidade));
    return this;
  }

  attachImage(fixturePath = 'produto-teste.jpg') {
    this.elements.imagem().selectFile(`cypress/fixtures/${fixturePath}`, {
      force: true,
    });
    return this;
  }

  submit() {
    this.elements.submit().click();
    return this;
  }

  /**
   * Fluxo completo de cadastro de produto.
   * @param {object} product - { nome, preco, descricao, quantidade }
   * @param {string} imageFixture - nome do arquivo em cypress/fixtures
   */
  register(product, imageFixture = 'produto-teste.jpg') {
    this.fillName(product.nome);
    this.fillPrice(product.preco);
    this.fillDescription(product.descricao);
    this.fillQuantity(product.quantidade);
    this.attachImage(imageFixture);
    this.submit();
    return this;
  }
}

export default new ProductRegisterPage();
