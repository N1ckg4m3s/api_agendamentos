/*
    Script responsavel por efetuar todas as funções determinadas para o Funcionario.
        Criação: Nicolas de Aguiar Silva (27/10/2024);
        Ultima_Atualização: ## (##/##/##);
*/
const db = require('../Connect_DataBase');
const Criptografia=require('../Criptografia');

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
    try {
        const { Acesso, Senha } = req.query;
        const result = await db.query(
            'SELECT * FROM meuEsquema.Profissional WHERE Acesso = @Acesso AND Senha = @Senha',
            {
                Acesso: Acesso,
                Senha: Senha
            }
        );
        if (result.recordset.length > 0) {
            const Rowrecordset=result.recordset[0]

            const Parametros={
                Id: Rowrecordset.id,
                Nome: Rowrecordset.Nome,
                Acesso: Rowrecordset.Acesso,
                Tipo_Acesso: Rowrecordset.Tipo_Acesso
            }

            return res.status(200).json(Criptografia.Criptografar_Dados(JSON.stringify(Parametros)));
        } else {
            return res.status(404).json({ error: "Credenciais não encontradas" });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Erro ao verificar Credenciais" })
    }
}

module.exports = {
    Novo_Funcionario,
    Remover_Funcionario,
    Alterar_Informacoes_Funcionario,
    Verificar_Credenciais_Funcionario
}