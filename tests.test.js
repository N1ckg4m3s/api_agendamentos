const request = require('supertest');
const { app, server } = require('./index');
const db = require('./Connect_DataBase');

const Cred_Cliente='c37c2d5f0e134cdc9e1048fac227ae8a218ac8c16bcf1d35f28cff0f8fd833ca70298d6a73ff5a7a6a1254ae1e2194bfb6da1ef45e1719cccede02e5e967c65e29c0365b56fb01b444935a49b81d3bb5350f10a4ced2911ec1e1903fdc4cb108';
const Cred_Func='461c01d815a83c29eb1080c552749b2a3c493a3e41938f456ca64334fd59d11ac1cd36f7d9c5aa77cb2d424f0842d4a28c5937de1a5a5690800db48cd4a219acf7aa310bf6a94631f538262d0f9f216484e355ac08e38ff68555e938a41b3b9d';

const Testar_Agendamentos=false
const Testar_Cliente=false
const Testar_Funcionarios=false
const Testar_Servicos=false

const TESTAR_TUDO=false


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

if (Testar_Agendamentos || TESTAR_TUDO){
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
          Credenciais: Cred_Cliente,
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
          Credenciais: Cred_Cliente,
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
          Credenciais: Cred_Cliente,
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
          Credenciais: Cred_Cliente,
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
          Credenciais: Cred_Cliente,
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
          Credenciais: Cred_Cliente,
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
          Credenciais: Cred_Cliente,
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
          Credenciais: Cred_Cliente,
          Horario: '20',
          Profissional: '3',
          Trabalho: '3',
          Data: '2024-11-05',
          Consumo_Tempo: '5',
        });
      expect(response.status).toBe(200);
    });
  })
  
  describe("Tentativas de modificar sem informação correta", () => {
    // Credenciais, AgendamentoID, Mudancas
    test("sem Credenciais", async () => {
      const response = await request(app).put('/Agendamento/Modificar_Agendamento')
        .query({
          Credenciais: '',
          AgendamentoID: '',
          Mudancas: {
            Profissional_Id: '',
            Trabalho_Id: '',
            Horario: '',
            Data: '',
            Consumo_Tempo: ''
          }
        });
      expect(response.status).not.toBe(200);
    });
    test("Credenciais Random", async () => {
      const response = await request(app).put('/Agendamento/Modificar_Agendamento')
        .query({
          Credenciais: 'potato :)',
          AgendamentoID: '',
          Mudancas: {
            Profissional_Id: '',
            Trabalho_Id: '',
            Horario: '',
            Data: '',
            Consumo_Tempo: ''
          }
        });
      expect(response.status).not.toBe(200);
    });
    test("sem Id do Agendamento", async () => {
      const response = await request(app).put('/Agendamento/Modificar_Agendamento')
        .query({
          Credenciais: Cred_Cliente,
          AgendamentoID: '',
          Mudancas: {
            Profissional_Id: '',
            Trabalho_Id: '',
            Horario: '',
            Data: '',
            Consumo_Tempo: ''
          }
        });
      expect(response.status).not.toBe(200);
    });
    test('Modificar Sem nada', async () => {
      const response = await request(app).put('/Agendamento/Modificar_Agendamento')
        .query({
          Credenciais: Cred_Cliente,
          AgendamentoID: '',
          Mudancas: {
            Profissional_Id: '',
            Trabalho_Id: '',
            Horario: '',
            Data: '',
            Consumo_Tempo: ''
          }
        });
      expect(response.status).not.toBe(200);
    })
    test('Sem Profissional', async () => {
      const response = await request(app).put('/Agendamento/Modificar_Agendamento')
        .query({
          Credenciais: Cred_Cliente,
          AgendamentoID: '1',
          Mudancas: {
            Profissional_Id: '',
            Trabalho_Id: '3',
            Horario: '5',
            Data: '2024-11-07',
            Consumo_Tempo: '12'
          }
        });
      expect(response.status).not.toBe(200);
    })
    test('Sem Trabalho', async () => {
      const response = await request(app).put('/Agendamento/Modificar_Agendamento')
        .query({
          Credenciais: Cred_Cliente,
          AgendamentoID: '1',
          Mudancas: {
            Profissional_Id: '2',
            Trabalho_Id: '',
            Horario: '5',
            Data: '2024-11-07',
            Consumo_Tempo: '12'
          }
        });
      expect(response.status).not.toBe(200);
    })
    test('Sem Horario', async () => {
      const response = await request(app).put('/Agendamento/Modificar_Agendamento')
        .query({
          Credenciais: Cred_Cliente,
          AgendamentoID: '1',
          Mudancas: {
            Profissional_Id: '2',
            Trabalho_Id: '3',
            Horario: '',
            Data: '2024-11-07',
            Consumo_Tempo: '12'
          }
        });
      expect(response.status).not.toBe(200);
    })
    test('Sem Data', async () => {
      const response = await request(app).put('/Agendamento/Modificar_Agendamento')
        .query({
          Credenciais: Cred_Cliente,
          AgendamentoID: '1',
          Mudancas: {
            Profissional_Id: '2',
            Trabalho_Id: '3',
            Horario: '5',
            Data: '',
            Consumo_Tempo: '12'
          }
        });
      expect(response.status).not.toBe(200);
    })
    test('Sem Consumo tempo', async () => {
      const response = await request(app).put('/Agendamento/Modificar_Agendamento')
        .query({
          Credenciais: Cred_Cliente,
          AgendamentoID: '1',
          Mudancas: {
            Profissional_Id: '2',
            Trabalho_Id: '3',
            Horario: '5',
            Data: '2024-11-07',
            Consumo_Tempo: ''
          }
        });
      expect(response.status).not.toBe(200);
    })
  
    test('Modificar com tudo certinho', async () => {
      const response = await request(app).put('/Agendamento/Modificar_Agendamento')
        .query({
          Credenciais: Cred_Cliente,
          AgendamentoID: '9',
          Mudancas: {
            Profissional_Id: '2',
            Trabalho_Id: '3',
            Horario: '55',
            Data: '2024-11-07',
            Consumo_Tempo: '12'
          }
        });
      expect(response.status).toBe(200);
    })
  })
  
  describe("Tentativas de excluir sem informação correta", () => {
    test('Sem Credenciais', async () => {
      const response = await request(app).delete('/Agendamento/Remover_Agendamento')
        .query({
          Credenciais: '',
          AgendamentoID: '1',
        });
      expect(response.status).not.toBe(200);
    })
    test('Credenciais Random', async () => {
      const response = await request(app).delete('/Agendamento/Remover_Agendamento')
        .query({
          Credenciais: 'kasjdikasjndojuasndiasndisani',
          AgendamentoID: '1',
        });
      expect(response.status).not.toBe(200);
    })
    test('Sem o Id do Agendamento', async () => {
      const response = await request(app).delete('/Agendamento/Remover_Agendamento')
        .query({
          Credenciais: 'kasjdikasjndojuasndiasndisani',
          AgendamentoID: '',
        });
      expect(response.status).not.toBe(200);
    })
  
    test('Excluir com tudo certinho', async () => {
      // ta funcionando, mas retirei pois precisava ficar trocando o ID
      // const response = await request(app).delete('/Agendamento/Remover_Agendamento')
      //   .query({
      //     Credenciais: Cred_Cliente,
      //     AgendamentoID: '15',
      //   });
      // expect(response.status).toBe(200);
    })
  })
  
  describe('Obtenções de Todos os Agendamentos', () => {
    test('Obter Todos | Sem Credenciais', async () => {
      const response = await request(app).get('/Agendamento/Obter_Agendamentos')
        .query({
          Credenciais: '',
        });
      expect(response.status).not.toBe(200);
    })
    test('Obter Todos | Credenciais Errada', async () => {
      const response = await request(app).get('/Agendamento/Obter_Agendamentos')
        .query({
          Credenciais: 'ash1ash6warfjwAWsdjtrzakz4rk14tkA6dz1k6z1k6zgGfj1dsf16aj1a',
        });
      expect(response.status).not.toBe(200);
    })
    test('Obter Todos | Credenciais de Cliente', async () => {
      const response = await request(app).get('/Agendamento/Obter_Agendamentos')
        .query({
          Credenciais: Cred_Cliente,
        });
      expect(response.status).not.toBe(200);
    })

    test('Obter Todos | Certinho', async () => {
      const response = await request(app).get('/Agendamento/Obter_Agendamentos')
        .query({
          Credenciais: Cred_Func,
        });
      expect(response.status).toBe(200);
    })
  
    test('Obter_Agendamentos_do_Dia | Sem Credenciais', async () => {
      const response = await request(app).get('/Agendamento/Obter_Agendamentos_do_Dia')
        .query({
          Credenciais: '',
          Data:''
        });
      expect(response.status).not.toBe(200);
    })
    test('Obter_Agendamentos_do_Dia | Credenciais Errada', async () => {
      const response = await request(app).get('/Agendamento/Obter_Agendamentos_do_Dia')
        .query({
          Credenciais: 'ash1ash6warfjwAWsdjtrzakz4rk14tkA6dz1k6z1k6zgGfj1dsf16aj1a',
          Data:''
        });
      expect(response.status).not.toBe(200);
    })
    test('Obter_Agendamentos_do_Dia | Sem data', async () => {
      const response = await request(app).get('/Agendamento/Obter_Agendamentos_do_Dia')
        .query({
          Credenciais: Cred_Func,
          Data:''
        });
      expect(response.status).not.toBe(200);
    })
    test('Obter_Agendamentos_do_Dia | Data Errada', async () => {
      const response = await request(app).get('/Agendamento/Obter_Agendamentos_do_Dia')
        .query({
          Credenciais: Cred_Func,
          Data:'07/10/2024'
        });
      expect(response.status).not.toBe(200);
    })
    test('Obter_Agendamentos_do_Dia | Certinho', async () => {
      const response = await request(app).get('/Agendamento/Obter_Agendamentos_do_Dia')
        .query({
          Credenciais: Cred_Func,
          Data:'2024-10-28'
        });
      expect(response.status).toBe(200);
    })
  
    test('Obter_Agendamentos_do_Usuario | Sem Credenciais', async () => {
      const response = await request(app).get('/Agendamento/Obter_Agendamentos_do_Usuario')
        .query({
          Credenciais: '',
          UserId:''
        });
      expect(response.status).not.toBe(200);
    })
    test('Obter_Agendamentos_do_Usuario | Credenciais Errada', async () => {
      const response = await request(app).get('/Agendamento/Obter_Agendamentos_do_Usuario')
        .query({
          Credenciais: 'khjasbdjkanskdjbas451ag1 f1dg45 61fg1a 6f1d ',
          UserId:''
        });
      expect(response.status).not.toBe(200);
    })
    test('Obter_Agendamentos_do_Usuario | Credenciais Errada Com ID', async () => {
      const response = await request(app).get('/Agendamento/Obter_Agendamentos_do_Usuario')
        .query({
          Credenciais: 'khjasbdjkanskdjbas451ag1 f1dg45 61fg1a 6f1d ',
          UserId:'1'
        });
      expect(response.status).not.toBe(200);
    })
  
    test('Obter_Agendamentos_do_Usuario | Cred_Cliente Sem ID', async () => {
      const response = await request(app).get('/Agendamento/Obter_Agendamentos_do_Usuario')
        .query({
          Credenciais: Cred_Cliente,
          UserId:''
        });
      expect(response.status).not.toBe(200);
    })
    test('Obter_Agendamentos_do_Usuario | Cred_Func Sem ID', async () => {
      const response = await request(app).get('/Agendamento/Obter_Agendamentos_do_Usuario')
        .query({
          Credenciais: Cred_Func,
          UserId:''
        });
      expect(response.status).not.toBe(200);
    })
    test('Obter_Agendamentos_do_Usuario | Cred_Cliente Id Errado', async () => {
      const response = await request(app).get('/Agendamento/Obter_Agendamentos_do_Usuario')
        .query({
          Credenciais: Cred_Cliente,
          UserId:'2'
        });
      expect(response.status).not.toBe(200);
    })
  
    test('Obter_Agendamentos_do_Usuario | Cred_Func Certinho', async () => {
      const response = await request(app).get('/Agendamento/Obter_Agendamentos_do_Usuario')
        .query({
          Credenciais: Cred_Func,
          UserId:'2'
        });
      expect(response.status).toBe(200);
    })
    test('Obter_Agendamentos_do_Usuario | Cred_Cliente Certinho', async () => {
      const response = await request(app).get('/Agendamento/Obter_Agendamentos_do_Usuario')
        .query({
          Credenciais: Cred_Cliente,
          UserId:'1'
        });
      expect(response.status).toBe(200);
    })
  })
}
if (Testar_Cliente || TESTAR_TUDO){
  describe('Entrar Corretamente',async ()=>{
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
  })

  describe('Verificar erros',async ()=>{
    test('Verificação com Ingection do Cliente', async () => {
      const injectionResponse = await request(app).get('/Client/Verificar_Cliente')
        .query({
          Acesso: "' OR '1'='1",
          Senha: "' OR '1'='1",
        });
      expect(injectionResponse.status).not.toBe(200);
    });

    test('Verificação Sem nada', async () => {
      const response = await request(app).get('/Client/Verificar_Cliente')
        .query({
          Acesso: "",
          Senha: "",
        });
      expect(response.status).not.toBe(200);
    });
    test('Verificação Com apenas o Acesso', async () => {
      const response = await request(app).get('/Client/Verificar_Cliente')
        .query({
          Acesso: "acesso1",
          Senha: "",
        });
      expect(response.status).not.toBe(200);
    });
    test('Verificação Com apenas a Senha', async () => {
      const response = await request(app).get('/Client/Verificar_Cliente')
        .query({
          Acesso: "",
          Senha: "senha1",
        });
      expect(response.status).not.toBe(200);
    });
    test('Verificação Tudo Errado', async () => {
      const response = await request(app).get('/Client/Verificar_Cliente')
        .query({
          Acesso: "Acesso_ALTER",
          Senha: "Senha_ALTER",
        });
      expect(response.status).not.toBe(200);
    });

  })
}
if (Testar_Funcionarios || TESTAR_TUDO){
  describe('Entrar Corretamente',async ()=>{
    test('Verificação com Acesso e Senha do Funcionario', async () => {
      const response = await request(app).get('/Funcionario/Verificar_Funcionario')
      .query({
        Acesso: "acesso1",
        Senha: "senha1",
      });
      const records = response.body || [];
      expect(response.status).toBe(200);
      expect(records).toBeDefined();
    });
  })
  describe('Verificar erros',async ()=>{
    test('Verificação com Ingection Funcionario', async () => {
      const injectionResponse = await request(app).get('/Funcionario/Verificar_Funcionario')
        .query({
          Acesso: "' OR '1'='1",
          Senha: "' OR '1'='1",
        });
      expect(injectionResponse.status).not.toBe(200);
    });
    test('Verificação Sem nada', async () => {
      const response = await request(app).get('/Client/Verificar_Funcionario')
        .query({
          Acesso: "",
          Senha: "",
        });
      expect(response.status).not.toBe(200);
    });
    test('Verificação Com apenas o Acesso', async () => {
      const response = await request(app).get('/Client/Verificar_Funcionario')
        .query({
          Acesso: "acesso1",
          Senha: "",
        });
      expect(response.status).not.toBe(200);
    });
    test('Verificação Com apenas a Senha', async () => {
      const response = await request(app).get('/Client/Verificar_Funcionario')
        .query({
          Acesso: "",
          Senha: "senha1",
        });
      expect(response.status).not.toBe(200);
    });
    test('Verificação Tudo Errado', async () => {
      const response = await request(app).get('/Client/Verificar_Funcionario')
        .query({
          Acesso: "Acesso_ALTER",
          Senha: "Senha_ALTER",
        });
      expect(response.status).not.toBe(200);
    });
  })
}
if (Testar_Servicos || TESTAR_TUDO){
  test('Deve retornar uma lista de Servicos', async () => {
    const response = await request(app).get('/Servico/Obter_Todos_Servico');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
}