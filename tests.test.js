const request = require('supertest');
const { app, server } = require('./index');
const db = require('./Connect_DataBase');

var CredenciaisRandom = '8227fa3b958fbd5e231389097080eb13ca966506a20c931e831566021e820c72881101e68bc13736f4004ae1cfb9b0d8963862f4a7c533b2bf971dc56e9195d9'

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
    const response = await request(app).get('/Client/Verificar_Cliente')
      .query({
        Acesso: "acesso1",
        Senha: "senha1",
      });
    const records = response.body || [];
    expect(response.status).toBe(200);
    expect(records).toBeDefined();
  });
  test('Verificação com Ingection do Cliente', async () => {
    const injectionResponse = await request(app).get('/Client/Verificar_Cliente')
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
        Acesso: "acesso1",
        Senha: "senha1",
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
    const response = await request(app).get('/Client/Verificar_Cliente')
      .query({
        Acesso: "",
        Senha: "",
      });
    const records = response.recordset || [];
    expect(response.status).not.toBe(200);
  });
  test('Verificação Com apenas o Acesso', async () => {

  });
  test('Verificação Com apenas a Senha', async () => {
    const response = await request(app).get('/Client/Verificar_Cliente')
      .query({
        Acesso: "",
        Senha: "Senha_ALTERADO",
      });
    const records = response.recordset || [];
    expect(response.status).not.toBe(200);
  });
  test('Verificação Tudo Errado', async () => {
    const response = await request(app).get('/Client/Verificar_Cliente')
      .query({
        Acesso: "Acesso_ALTER",
        Senha: "Senha_ALTER",
      });
    const records = response.recordset || [];
    expect(response.status).not.toBe(200);
  });
})

test("Obter os Verificar Disponibilidade Horario Mesmo Dia", async () => {
  const response = await request(app).get('/Agendamento/Verificar_Disponibilidade')
    .query({
      Data: "2024-10-28",
      Consumo_Tempo: 10,
      Trabalho_Id: 1,
    });
  const records = response.body || [];
  expect(response.status).toBe(200);
});

describe("Tentativas de agendar sem informação correta", () => {
  test("Agendar sem NADA", async () => {
    const response = await request(app).post('/Agendamento/Novo_Agendamento')
      .query({
        Credenciais: '',
        Horario: '',
        Profissional: '',
        Trabalho: '',
        Data: '',
        Consumo_Tempo: '',
      });
    expect(response.status).not.toBe(200);
  });
  test("Agendar sem Credenciais", async () => {
    const response = await request(app).post('/Agendamento/Novo_Agendamento')
      .query({
        Credenciais: '',
        Horario: '3',
        Profissional: '3',
        Trabalho: '3',
        Data: '2024-10-30',
        Consumo_Tempo: '5',
      });
    expect(response.status).not.toBe(200);
  });
  test("Agendar Credenciais errada", async () => {
    const response = await request(app).post('/Agendamento/Novo_Agendamento')
      .query({
        Credenciais: 'OLÁ :)',
        Horario: '3',
        Profissional: '3',
        Trabalho: '3',
        Data: '2024-10-30',
        Consumo_Tempo: '5',
      });
    expect(response.status).not.toBe(200);
  });
  test("Tentar agendar sem Horario definido", async () => {
    const response = await request(app).post('/Agendamento/Novo_Agendamento')
      .query({
        Credenciais: CredenciaisRandom,
        Horario: '',
        Profissional: '3',
        Trabalho: '3',
        Data: '2024-10-30',
        Consumo_Tempo: '5',
      });
    expect(response.status).not.toBe(200);
  });
  test("Tentar agendar sem Profissional definido", async () => {
    const response = await request(app).post('/Agendamento/Novo_Agendamento')
      .query({
        Credenciais: CredenciaisRandom,
        Horario: '3',
        Profissional: '',
        Trabalho: '3',
        Data: '2024-10-30',
        Consumo_Tempo: '5',
      });
    expect(response.status).not.toBe(200);
  });
  test("Tentar agendar sem Trabalho definido", async () => {
    const response = await request(app).post('/Agendamento/Novo_Agendamento')
      .query({
        Credenciais: CredenciaisRandom,
        Horario: '3',
        Profissional: '3',
        Trabalho: '',
        Data: '2024-10-30',
        Consumo_Tempo: '5',
      });
    expect(response.status).not.toBe(200);
  });
  test("Tentar agendar sem Data definida", async () => {
    const response = await request(app).post('/Agendamento/Novo_Agendamento')
      .query({
        Credenciais: CredenciaisRandom,
        Horario: '3',
        Profissional: '3',
        Trabalho: '3',
        Data: '',
        Consumo_Tempo: '5',
      });
    expect(response.status).not.toBe(200);
  });
  test("Tentar agendar Data Aleatoria definida", async () => {
    const response = await request(app).post('/Agendamento/Novo_Agendamento')
      .query({
        Credenciais: CredenciaisRandom,
        Horario: '3',
        Profissional: '3',
        Trabalho: '3',
        Data: '30-10-2024',
        Consumo_Tempo: '5',
      });
    expect(response.status).not.toBe(200);
  });
  test("Tentar agendar Data Antes definida", async () => {
    const response = await request(app).post('/Agendamento/Novo_Agendamento')
      .query({
        Credenciais: CredenciaisRandom,
        Horario: '3',
        Profissional: '3',
        Trabalho: '3',
        Data: '2024-10-21',
        Consumo_Tempo: '5',
      });
    expect(response.status).not.toBe(200);
  });
  test("Tentar agendar sem consumo de tempo definido", async () => {
    const response = await request(app).post('/Agendamento/Novo_Agendamento')
      .query({
        Credenciais: CredenciaisRandom,
        Horario: '3',
        Profissional: '3',
        Trabalho: '3',
        Data: '2024-10-30',
        Consumo_Tempo: '',
      });
    expect(response.status).not.toBe(200);
  });

  test("Agendar com todos os dados certinho", async () => {
    const response = await request(app).post('/Agendamento/Novo_Agendamento')
      .query({
        Credenciais: CredenciaisRandom,
        Horario: '20',
        Profissional: '3',
        Trabalho: '3',
        Data: '2024-10-30',
        Consumo_Tempo: '5',
      });
    expect(response.status).toBe(200);
  });
})

describe("Tentativas de modificar sem informação correta", () => {
  // test("sem Id do Agendamento", async () => { });
  // test("sem Credenciais", async () => { });
  // test("De outra pessoa", async () => { });

  // test("Modificar Agendamento", async () => { });
})

describe("Tentativas de excluir sem informação correta", () => {
  // test("Sem Id", async () => { });
  // test("Sem Credenciais", async () => { });
  // test("De outra pessoa", async () => { });

  // test("Excluir Agendamento", async () => { });
})

