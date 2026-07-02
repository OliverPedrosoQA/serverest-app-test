import { faker } from '@faker-js/faker';

/**
 * Gera um produto válido com dados dinâmicos.
 * O nome recebe um sufixo aleatório para evitar colisão de nomes
 * (a API do serverest não permite produtos com nome duplicado).
 * @param {object} overrides - campos que se deseja sobrescrever
 */
export function buildProduct(overrides = {}) {
  return {
    nome: `${faker.commerce.productName()} ${faker.string.alphanumeric(5)}`,
    preco: faker.number.int({ min: 1, max: 5000 }),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.number.int({ min: 1, max: 500 }),
    ...overrides,
  };
}
