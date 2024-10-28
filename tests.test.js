const request = require('supertest');
var { app, server } = require('./index');
const db = require('./Connect_DataBase');

CredenciaisRandom='698ef89b3d8a7ad429a1f6005d2c013f3b981abf0a7dd69529eb41890e7ea6c18aab881957a9564fdaf3f3abcfb296c8'

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

describe("Verificação de credenciais", () => {
  test('Verificação com Acesso e Senha do Cliente', async () => {
    const response = await request(app).get('/Client/Verificar_Credenciais_Cliente')
      .query({
        Acesso: "Acesso_ALTERADO",
        Senha: "Senha_ALTERADO",
      });
    const records = response.recordset || [];
    expect(response.status).toBe(200);
    expect(records).toBeDefined();
  });
  test('Verificação com Ingection do Cliente', async () => {
    const injectionResponse = await request(app).get('/Client/Verificar_Credenciais_Cliente')
      .query({
        Acesso: "' OR '1'='1",
        Senha: "' OR '1'='1",
      });
    expect(injectionResponse.status).not.toBe(200);
  });
  test('Verificação com Acesso e Senha do Funcionario', async () => {
    // Teste com credenciais válidas
    const response = await request(app).get('/Funcionario/Verificar_Credenciais_Funcionario')
      .query({
        Acesso: "Acesso_ALTERADO",
        Senha: "Senha_ALTERADO",
      });
    const records = response.recordset || [];
    expect(response.status).toBe(200);
    expect(records).toBeDefined();
  });
  test('Verificação com Ingection Funcionario', async () => {
    const injectionResponse = await request(app).get('/Funcionario/Verificar_Credenciais_Funcionario')
      .query({
        Acesso: "' OR '1'='1",
        Senha: "' OR '1'='1",
      });
    expect(injectionResponse.status).not.toBe(200);
  });
})

describe("Verificação de credenciais | 2", () => {
  test('Verificação Sem nada', async () => {
    const response = await request(app).get('/Client/Verificar_Credenciais_Cliente')
      .query({
        Acesso: "",
        Senha: "",
      });
    const records = response.recordset || [];
    expect(response.status).not.toBe(200);
  });
  test('Verificação Com apenas o Acesso', async () => {
    const response = await request(app).get('/Client/Verificar_Credenciais_Cliente')
      .query({
        Acesso: "Acesso_ALTERADO",
        Senha: "",
      });
    const records = response.recordset || [];
    expect(response.status).not.toBe(200);
  });
  test('Verificação Com apenas a Senha', async () => {
    const response = await request(app).get('/Client/Verificar_Credenciais_Cliente')
      .query({
        Acesso: "",
        Senha: "Senha_ALTERADO",
      });
    const records = response.recordset || [];
    expect(response.status).not.toBe(200);
  });
  test('Verificação Tudo Errado', async () => {
    const response = await request(app).get('/Client/Verificar_Credenciais_Cliente')
      .query({
        Acesso: "Acesso_ALTER",
        Senha: "Senha_ALTER",
      });
    const records = response.recordset || [];
    expect(response.status).not.toBe(200);
  });
})

