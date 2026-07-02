import { authApi } from '../../support/api/authApi';
import { usersApi } from '../../support/api/usersApi';
import { productsApi } from '../../support/api/productsApi';
import { buildAdminUser, toUserApiPayload } from '../../support/factories/userFactory';
import { buildProduct } from '../../support/factories/productFactory';

describe('API - /produtos', () => {
  let token;

  // Pré-condição: cria um admin e autentica para obter o token,
  // já que as rotas de escrita de produto exigem Authorization de admin.
  beforeEach(() => {
    const admin = buildAdminUser();
    usersApi.create(toUserApiPayload(admin)).its('status').should('eq', 201);

    authApi
      .login({ email: admin.email, password: admin.password })
      .then((res) => {
        expect(res.status).to.eq(200);
        token = res.body.authorization;
      });
  });

  it('deve cadastrar um produto com token válido (201)', () => {
    const product = buildProduct();

    productsApi.create(product, token).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.message).to.eq('Cadastro realizado com sucesso');
      expect(res.body._id).to.be.a('string').and.not.to.be.empty;
    });
  });

  it('deve buscar por ID o produto criado e refletir os dados enviados', () => {
    const product = buildProduct();

    productsApi.create(product, token).then((res) => {
      const id = res.body._id;

      productsApi.getById(id).then((getRes) => {
        expect(getRes.status).to.eq(200);
        expect(getRes.body).to.include({
          _id: id,
          nome: product.nome,
          preco: product.preco,
          descricao: product.descricao,
          quantidade: product.quantidade,
        });
      });
    });
  });

  it('não deve cadastrar produto com nome duplicado (400)', () => {
    const product = buildProduct();

    productsApi.create(product, token).its('status').should('eq', 201);

    productsApi.create(product, token).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.eq('Já existe produto com esse nome');
    });
  });

  it('não deve cadastrar produto sem token de autenticação (401)', () => {
    const product = buildProduct();

    productsApi.create(product).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.message).to.eq(
        'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais'
      );
    });
  });

  it('deve excluir um produto criado (200)', () => {
    const product = buildProduct();

    productsApi.create(product, token).then((res) => {
      const id = res.body._id;

      productsApi.remove(id, token).then((delRes) => {
        expect(delRes.status).to.eq(200);
        expect(delRes.body.message).to.eq('Registro excluído com sucesso');
      });
    });
  });
});
