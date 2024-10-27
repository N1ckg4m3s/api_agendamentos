/*
    Script responsavel por efetuar todas as funções determinadas para o Cliente.
        Criação: Nicolas de Aguiar Silva (27/10/2024);
        Ultima_Atualização: ## (##/##/##);
*/
const db = require('../Connect_DataBase');

async function Novo_Cliente(req, res) {
    // Adiciona um novo Cliente ao banco de dados
    return res.status(503).send('Under Construction');
}
async function Remover_Cliente(req, res) {
    // Remove o cliente do banco de dados
    return res.status(503).send('Under Construction');
}
async function Alterar_Informacoes_Cliente(req, res) {
    // Altera as inforações do cliente
    return res.status(503).send('Under Construction');
}
async function Verificar_Credenciais_Cliente(req, res) {
    // Verifica as credenciais (Acesso e senha) do cliente
    return res.status(503).send('Under Construction');
}

module.exports = {
    Novo_Cliente,
    Remover_Cliente,
    Alterar_Informacoes_Cliente,
    Verificar_Credenciais_Cliente
}