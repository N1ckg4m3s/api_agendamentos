/*
    Script responsavel por efetuar todas as funções determinadas para o Cliente.
        Criação: Nicolas de Aguiar Silva (27/10/2024);
        Ultima_Atualização: ## (##/##/##);
*/
const db = require('../Connect_DataBase');
const Criptografia = require('../Criptografia');

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
async function Verificar_Cliente(req, res) {
    try {
        const { Acesso, Senha } = req.query;
        const result = await db.query(
            'SELECT * FROM meuEsquema.Cliente WHERE Acesso = @Acesso AND Senha = @Senha',
            {
                Acesso: Acesso,
                Senha: Senha
            }
        );
        if (result.recordset.length > 0) {
            const Rowrecordset = result.recordset[0]

            const Parametros = {
                Id: Rowrecordset.id,
                Nome: Rowrecordset.Nome,
                Acesso: Rowrecordset.Acesso,
                Tipo_Acesso: -1
            }

            return res.status(200).json(Criptografia.Criptografar_Dados(JSON.stringify(Parametros)));
        } else {
            return res.status(404).json({ error: "Credenciais não encontradas" });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Erro ao verificar credenciais" });
    }

}
async function Verificar_Credenciais_Cliente(Credenciais) {
    const Dados_Descriptografados = Criptografia.Descriptografar_Dados(Credenciais)
    if (!Dados_Descriptografados) return true

    const Dados_Parse = JSON.parse(Dados_Descriptografados)
    if (!Dados_Descriptografados) return true

    if (!Dados_Parse.Id ||
        !Dados_Parse.Nome ||
        !Dados_Parse.Acesso ||
        !Dados_Parse.Tipo_Acesso) return true

    return { Verificar_Credenciais: false, Cliente_Id: Dados_Parse.Id };
}

module.exports = {
    Novo_Cliente,
    Remover_Cliente,
    Alterar_Informacoes_Cliente,
    Verificar_Cliente,
    Verificar_Credenciais_Cliente
}