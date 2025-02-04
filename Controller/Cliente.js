/*
    Script responsavel por efetuar todas as funções determinadas para o Cliente.
        Criação: Nicolas de Aguiar Silva (27/10/2024);
        Ultima_Atualização: ## (##/##/##);
*/
const db = require('../Connect_DataBase');
const Criptografia = require('../Criptografia');
const { Verificar_Credenciais_Funcionario } = require('./Funcionario');
require('dotenv').config();

function VerficarInjection(input) {
    const sqlInjectionPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|--|\*|\bOR\b|\bAND\b)\b)/i;
    return sqlInjectionPattern.test(input);
}
const ChaveCrypto = process.env.Chave_Cripto_Cliente

async function Novo_Cliente(req, res) {
    // Adiciona um novo Cliente ao banco de dados
    const { Nome, Acesso, Senha, Credenciais } = req.query
    try {
        if (!Nome) throw ('Sem nome');
        if (VerficarInjection(Nome)) throw ('Possivel ingection');

        if (!Acesso) throw ('Sem Acesso');
        if (VerficarInjection(Acesso)) throw ('Possivel ingection');

        if (!Senha) throw ('Sem Senha');
        if (VerficarInjection(Senha)) throw ('Possivel ingection');

        const { Verificar_Credenciais, _ } = await Verificar_Credenciais_Funcionario(Credenciais)
        if (Verificar_Credenciais == undefined || Verificar_Credenciais) throw ('Credenciais Errada');

        const Result = await db.query(
            'INSERT INTO meuEsquema.Cliente (Nome, Acesso, Senha) VALUES (@Nome, @Acesso, @Senha)', {
            Nome: Nome,
            Acesso: Acesso,
            Senha: Senha
        });
        return Result.rowsAffected[0] > 0 && res.status(200).send('Sucess');
    } catch (e) {
        return res.status(500).send('Informações incorretar/indevidas')
    }
}
async function Remover_Cliente(req, res) {
    const { Id, Credenciais } = req.query
    // Remove o cliente do banco de dados
    try {
        const { Verificar_Credenciais, Cliente_Id } = await Verificar_Credenciais_Cliente(Credenciais)
        if (Verificar_Credenciais == undefined || Verificar_Credenciais) throw ('Credenciais Errada');

        if (!Id) throw ('Sem Id');
        if (VerficarInjection(Id)) throw ('Possivel ingection');

        if (Id != Cliente_Id) throw ('Id Diferente');

        const Ag_Result = await db.query('DELETE FROM meuEsquema.Agendamento WHERE Cliente_Id=@Id', { Id: Id });
        const Cl_Result = await db.query('DELETE FROM meuEsquema.Cliente WHERE id=@Id', { Id: Id });

        if (Ag_Result.rowCount === 0 || Cl_Result.rowCount === 0) throw ('Nenhum registro encontrado para o Id fornecido');

        return Cl_Result.rowsAffected[0] > 0 && res.status(200).send('Sucess');
    } catch (e) {
        return res.status(500).send('Informações incorretar/indevidas')
    }
}
async function Alterar_Informacoes_Cliente(req, res) {
    // Altera as inforações do cliente
    const { Id, Credenciais, Mudancas } = req.query
    try {
        if (!Id) throw ('Sem Id');
        if (VerficarInjection(Id)) throw ('Possivel Ingection no Id');

        if (!Mudancas.Nome) throw ('Sem Mudancas.Nome');
        if (VerficarInjection(Mudancas.Nome)) throw ('Possivel Ingection no Nome');

        if (!Mudancas.Senha) throw ('Sem Mudancas.Senha');
        if (VerficarInjection(Mudancas.Senha)) throw ('Possivel Ingection na Senha');

        const { Verificar_Credenciais, Cliente_Id } = await Verificar_Credenciais_Cliente(Credenciais)
        if (Verificar_Credenciais == undefined || Verificar_Credenciais) throw ('Credenciais Errada');

        if (Cliente_Id != Id) throw ('Ids Diferente');

        const Result = await db.query(
            'UPDATE meuEsquema.Cliente SET Nome = @Nome, Senha = @Senha WHERE id = @id', {
            Id: 1,
            Nome: Mudancas.Nome,
            Senha: Mudancas.Senha,
        });
        return Result.rowsAffected[0] > 0 && res.status(200).send('Sucess');
    } catch (e) {
        return res.status(500).send('Informações incorretar/indevidas')
    }
}
async function Verificar_Cliente(req, res) {
    const { Acesso, Senha } = req.query;
    try {
        if (!Acesso) throw ('Sem Acesso');
        if (VerficarInjection(Acesso)) throw ('Possivel ingection');

        if (!Senha) throw ('Sem Senha');
        if (VerficarInjection(Senha)) throw ('Possivel ingection');

        const result = await db.query(
            'SELECT * FROM meuEsquema.Cliente WHERE Acesso = @Acesso AND Senha = @Senha', {
            Acesso: Acesso,
            Senha: Senha
        });
        if (result.recordset.length > 0) {
            const Rowrecordset = result.recordset[0]

            const Parametros = {
                DataType: "Cliente",
                Id: Rowrecordset.id,
                Nome: Rowrecordset.Nome,
                Acesso: Rowrecordset.Acesso,
                Tipo_Acesso: -1
            }

            return res.status(200).json(Criptografia.Criptografar_Dados(JSON.stringify(Parametros), ChaveCrypto));
        } else {
            return res.status(404).json({ error: "Credenciais não encontradas" });
        }
    } catch (e) {
        return res.status(500).json({ error: "Erro ao verificar credenciais" });
    }
}

async function Verificar_Credenciais_Cliente(Credenciais) {
    const Dados_Descriptografados = Criptografia.Descriptografar_Dados(Credenciais, ChaveCrypto)
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