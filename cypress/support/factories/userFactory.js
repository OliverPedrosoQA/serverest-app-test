import { faker } from '@faker-js/faker';

/**
 * Gera um usuário válido com dados dinâmicos.
 * Garante independência entre cenários: cada execução usa um e-mail único.
 * @param {object} overrides - campos que se deseja sobrescrever
 */
export function buildUser(overrides = {}) {
  return {
    nome: faker.person.fullName(),
    email: faker.internet
      .email({ provider: 'serverest-qa.com' })
      .toLowerCase(),
    password: faker.internet.password({ length: 12 }),
    administrador: false,
    ...overrides,
  };
}

/**
 * Gera um usuário administrador válido.
 */
export function buildAdminUser(overrides = {}) {
  return buildUser({ administrador: true, ...overrides });
}
