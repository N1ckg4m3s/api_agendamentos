/*
    Script responsavel por efetuar todas as funções determinadas para Agendamentos.
        Criação: Nicolas de Aguiar Silva (27/10/2024);
        Ultima_Atualização: ## (##/##/##);
*/
const db = require('../Connect_DataBase');

async function Novo_Agendamento(req,res) {
    // Adiciona um novo Agendamento
    return res.status(503).send('Under Construction');
}
async function Obter_Agendamentos(req,res) {
    // Obtem TODOS os Agendamentos de todos, do dia até N dias a frente
    return res.status(503).send('Under Construction');
}
async function Obter_Agendamentos_do_Dia(req,res) {
    // Obtem de todos os Agendamentos do dia
    return res.status(503).send('Under Construction');
}
async function Obter_Agendamentos_do_Usuario(req,res) {
    // Obtem os Agendamentos do usuario
    return res.status(503).send('Under Construction');
}
async function Obter_Todos_Agendamentos_do_Funcionario(req,res) {
    // Obtem todos os Agendamentos do funcionario
    return res.status(503).send('Under Construction');
}
async function Obter_Agendamentos_do_Funcionario_dia(req,res) {
    // Obtem os Agendamentos do funcionario para o dia
    return res.status(503).send('Under Construction');
}
async function Modificar_Agendamento(req,res) {
    // Altera alguma informação de um Agendamento
    return res.status(503).send('Under Construction');
}
async function Remover_Agendamento(req,res) {
    // Remove o Agendamentos em Especifico
    return res.status(503).send('Under Construction');
}
async function Verificar_Disponibilidade(req,res) {
    // Verifica se no dia esta disponivel aquele agendamento e os horarios possiveis
    return res.status(503).send('Under Construction');
}

module.exports = {
    Novo_Agendamento,
    Obter_Agendamentos,
    Obter_Agendamentos_do_Dia,
    Obter_Agendamentos_do_Usuario,
    Obter_Todos_Agendamentos_do_Funcionario,
    Obter_Agendamentos_do_Funcionario_dia,
    Modificar_Agendamento,
    Remover_Agendamento,
    Verificar_Disponibilidade,
}