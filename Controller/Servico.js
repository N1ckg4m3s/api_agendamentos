/*
    Script responsavel por efetuar todas as funções determinadas para os Serviços.
        Criação: Nicolas de Aguiar Silva (27/10/2024);
        Ultima_Atualização: ## (##/##/##);
*/

const db = require('../Connect_DataBase');

async function Novo_Servico(req, res) {
    // Adiciona um novo Serviço
    return res.status(503).send('Under Construction');
}
async function Remover_Servico(req, res) {
    // Remove o Serviço
    return res.status(503).send('Under Construction');
}
async function Alterar_Informacoes_Servico(req, res) {
    // Altera informações do Serviço
    return res.status(503).send('Under Construction');
}
async function Obter_Todos_Servico(req, res) {
    // Obtem todos os serviços do Banco de dados.
    try {
        const result = await db.query('SELECT * FROM meuEsquema.Trabalho')
        const records = result.recordset || [];
        if (records.length === 0) {
            return res.status(204).send(); // No content, sem mensagem
        }
        return res.status(200).json(records)
    } catch (e) {
        return res.status(500).json({ Erro: `Erro ao obter dados do banco de dado` })
    }
}

module.exports = {
    Novo_Servico,
    Remover_Servico,
    Alterar_Informacoes_Servico,
    Obter_Todos_Servico
}