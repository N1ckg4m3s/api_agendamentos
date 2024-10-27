const request = require('supertest');
var { app, server } = require('./index');
const db = require('./Connect_DataBase');

afterAll(async () => {
  await db.finalizarConexao();
  server.close()
});

beforeAll(async () => {
  await db.connect();
});

describe("Inicio dos testes", () => {
  test('Connectar ao banco', async () => {
    await expect(db.connect()).resolves.toBeUndefined();
  });
})

describe("Apenas Obtenções", () => {
  test('Deve retornar uma lista de Servicos', async () => {
    const response = await request(app).get('/Servico/Obter_Todos_Servico');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
})