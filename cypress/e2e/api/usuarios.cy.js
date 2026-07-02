import { usuariosApi } from '../../support/api/usuariosApi';
import { buildUser, toUserApiPayload } from '../../support/factories/userFactory';

describe('API - /usuarios', () => {
  it('deve cadastrar um usuário com sucesso (201)', () => {
    const user = buildUser();

    usuariosApi.create(toUserApiPayload(user)).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.message).to.eq('Cadastro realizado com sucesso');
      expect(res.body._id).to.be.a('string').and.not.to.be.empty;
    });
  });

  it('não deve cadastrar usuário com e-mail já utilizado (400)', () => {
    const user = buildUser();
    const payload = toUserApiPayload(user);

    usuariosApi.create(payload).its('status').should('eq', 201);

    usuariosApi.create(payload).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.eq('Este email já está sendo usado');
    });
  });

  it('deve buscar por ID o usuário recém-criado e refletir os dados enviados', () => {
    const user = buildUser();
    const payload = toUserApiPayload(user);

    usuariosApi.create(payload).then((res) => {
      const id = res.body._id;

      usuariosApi.getById(id).then((getRes) => {
        expect(getRes.status).to.eq(200);
        expect(getRes.body).to.include({
          _id: id,
          nome: payload.nome,
          email: payload.email,
          administrador: payload.administrador,
        });
      });
    });
  });

  it('deve filtrar a listagem por e-mail e excluir o usuário ao final', () => {
    const user = buildUser();
    const payload = toUserApiPayload(user);

    usuariosApi.create(payload).then((res) => {
      const id = res.body._id;

      // Filtro por e-mail deve retornar exatamente o usuário criado.
      usuariosApi.list({ email: payload.email }).then((listRes) => {
        expect(listRes.status).to.eq(200);
        expect(listRes.body.quantidade).to.eq(1);
        expect(listRes.body.usuarios[0]._id).to.eq(id);
      });

      // Limpeza da massa criada.
      usuariosApi.remove(id).then((delRes) => {
        expect(delRes.status).to.eq(200);
        expect(delRes.body.message).to.eq('Registro excluído com sucesso');
      });
    });
  });
});
