// const request = require('supertest');
const { app, server, db } = require('./index');

const FuncoesCliente = require("./Controller/Funcoes_Cliente")

afterAll(async () => {
  await db.finalizarConexao();
  server.close(); // Fecha o servidor
});

test('CONECTAR AO BANCO DE DADOS', async () => {
  await expect(db.connect()).resolves.toBeUndefined();
});

test('INICIAR REDE DE TESTES | APAGAR DATA BASE', async () => {
  await db.query('DELETE FROM meuEsquema.Trabalho_Profissional');
  await db.query('DELETE FROM meuEsquema.Agendamento');
  await db.query('DELETE FROM meuEsquema.Trabalho');
  await db.query('DELETE FROM meuEsquema.Profissional');
  await db.query('DELETE FROM meuEsquema.Cliente');
});

        /* TESTES LADO CLIENTE */
    /* GET */
// test('TESTE GET', async () => {
// });
    /* POST */
// test('TESTE POST', async () => {
// });
    /* PUT */
// test('TESTE PUT', async () => {
// });
    /* DELETE */
// test('TESTE DELETE', async () => {
// });


