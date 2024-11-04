/*
    Script responsavel por efetuar todas as funções determinadas para o Funcionario.
        Criação: Nicolas de Aguiar Silva (27/10/2024);
        Ultima_Atualização: ## (##/##/##);
*/
const db = require('../Connect_DataBase');
const Criptografia=require('../Criptografia');
require('dotenv').config();

const ChaveCrypto=process.env.Chave_Cripto_Funcionario

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
async function Verificar_Funcionario(req, res) {
    const { Acesso, Senha } = req.query;
    try {
        const result = await db.query(
            'SELECT * FROM meuEsquema.Profissional WHERE Acesso = @Acesso AND Senha = @Senha',
            {
                Acesso: Acesso,
                Senha: Senha
            }
        );

        
        if (result.recordset.length > 0) {
            const Rowrecordset = result.recordset[0]
            
            const Parametros = {
                DataType: "Profissional",
                Id: Rowrecordset.id,
                Nome: Rowrecordset.Nome,
                Acesso: Rowrecordset.Acesso,
                Tipo_Acesso: Rowrecordset.Tipo_Acesso
            }

            return res.status(200).json(Criptografia.Criptografar_Dados(JSON.stringify(Parametros),ChaveCrypto));
        } else {
            return res.status(404).json({ error: "Credenciais não encontradas" });
        }
    } catch (e) {
        return res.status(500).json({ error: "Erro ao verificar credenciais" });
    }
}

async function Verificar_Credenciais_Funcionario(Credenciais) {
    const Dados_Descriptografados = Criptografia.Descriptografar_Dados(Credenciais,ChaveCrypto)
    if (!Dados_Descriptografados) return true

    const Dados_Parse = JSON.parse(Dados_Descriptografados)
    if (!Dados_Descriptografados) return true

    if (!Dados_Parse.Id ||
        !Dados_Parse.Nome ||
        !Dados_Parse.Acesso ||
        !Dados_Parse.Tipo_Acesso) return true

    return { Verificar_Credenciais: false, Funcionario_Id: Dados_Parse.Id };
}

module.exports = {
    Novo_Funcionario,
    Remover_Funcionario,
    Alterar_Informacoes_Funcionario,
    Verificar_Funcionario,
    Verificar_Credenciais_Funcionario
}