import { authApi } from '../../support/api/authApi';
import { usuariosApi } from '../../support/api/usuariosApi';
import { buildAdminUser, toUserApiPayload } from '../../support/factories/userFactory';

describe('API - POST /login', () => {
  it('deve autenticar com credenciais válidas e retornar token', () => {
    const user = buildAdminUser();

    // Pré-condição: garante um usuário existente para autenticar.
    usuariosApi.create(toUserApiPayload(user)).its('status').should('eq', 201);

    authApi.login({ email: user.email, password: user.password }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq('Login realizado com sucesso');
      expect(res.body.authorization).to.be.a('string').and.to.include('Bearer');
    });
  });

  it('deve retornar 401 para senha incorreta', () => {
    const user = buildAdminUser();
    usuariosApi.create(toUserApiPayload(user));

    authApi.login({ email: user.email, password: 'senha-errada' }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body.message).to.eq('Email e/ou senha inválidos');
    });
  });

  it('deve retornar 401 para usuário inexistente', () => {
    authApi
      .login({ email: 'inexistente@serverest-qa.com', password: 'qualquer' })
      .then((res) => {
        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq('Email e/ou senha inválidos');
      });
  });

  it('deve retornar 400 e mensagens de obrigatoriedade com corpo vazio', () => {
    authApi.login({}).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.deep.include({
        email: 'email é obrigatório',
        password: 'password é obrigatório',
      });
    });
  });
});
