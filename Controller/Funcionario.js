/*
    Script responsavel por efetuar todas as funções determinadas para o Funcionario.
        Criação: Nicolas de Aguiar Silva (27/10/2024);
        Ultima_Atualização: ## (##/##/##);
*/
const db = require('../Connect_DataBase');

async function Novo_Funcionario(req, res) {
    // Adiciona um novo funcionario
    return res.status(503).send('Under Construction');
}
async function Remover_Funcionario(req, res) {
    // Remove um funcionario
    return res.status(503).send('Under Construction');
}
async function Alterar_Informacoes_Funcionario(req, res) {
    // Altera informações do funcionario
    return res.status(503).send('Under Construction');
}
async function Verificar_Credenciais_Funcionario(req, res) {
    // Verifica Credenciais do Funcionario
    return res.status(503).send('Under Construction');
}

module.exports = {
    Novo_Funcionario,
    Remover_Funcionario,
    Alterar_Informacoes_Funcionario,
    Verificar_Credenciais_Funcionario
}