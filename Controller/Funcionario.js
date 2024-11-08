/*
    Script responsavel por efetuar todas as funções determinadas para o Funcionario.
        Criação: Nicolas de Aguiar Silva (27/10/2024);
        Ultima_Atualização: ## (##/##/##);
*/
const db = require('../Connect_DataBase');
const Criptografia = require('../Criptografia');
require('dotenv').config();

const ChaveCrypto = process.env.Chave_Cripto_Funcionario

function VerficarInjection(input) {
    const sqlInjectionPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|--|\*|\bOR\b|\bAND\b)\b)/i;
    return sqlInjectionPattern.test(input);
}

async function Novo_Funcionario(req, res) {
    // Adiciona um novo funcionario
    const { Nome, Acesso, Senha, Tipo_Acesso, Credenciais } = req.query
    try {
        if (!Nome) throw ('Sem nome');
        if (VerficarInjection(Nome)) throw ('Possivel ingection');

        if (!Acesso) throw ('Sem Acesso');
        if (VerficarInjection(Acesso)) throw ('Possivel ingection');

        if (!Senha) throw ('Sem Senha');
        if (VerficarInjection(Senha)) throw ('Possivel ingection');

        if (!Tipo_Acesso) throw ('Sem Tipo_Acesso');
        if (VerficarInjection(Tipo_Acesso)) throw ('Possivel ingection');

        const { Verificar_Credenciais, _ } = await Verificar_Credenciais_Funcionario(Credenciais)
        if (Verificar_Credenciais == undefined || Verificar_Credenciais) throw ('Credenciais Errada');

        const Result = await db.query(
            'INSERT INTO meuEsquema.Profissional (Nome, Acesso, Senha, Tipo_Acesso) VALUES (@Nome, @Acesso, @Senha, @Tipo_Acesso)', {
            Nome: Nome,
            Acesso: Acesso,
            Senha: Senha,
            Tipo_Acesso: Tipo_Acesso
        });
        return Result.rowsAffected[0] > 0 && res.status(200).send('Sucess');
    } catch (e) {
        return res.status(500).send('Informações incorretar/indevidas')
    }
}
async function Remover_Funcionario(req, res) {
    // Remove um funcionario
    const { Id, Credenciais } = req.query
    // Remove do banco de dados
    try {
        const { Verificar_Credenciais, Funcionario_Id } = await Verificar_Credenciais_Funcionario(Credenciais)
        if (Verificar_Credenciais == undefined || Verificar_Credenciais) throw ('Credenciais Errada');

        if (!Id) throw ('Sem Id');
        if (VerficarInjection(Id)) throw ('Possivel ingection');

        if (Id != Funcionario_Id) throw ('Id Diferente');

        const Ag_Result = await db.query('DELETE FROM meuEsquema.Trabalho_Profissional WHERE Profissional_Id=@Id', { Id: Id });
        const Cl_Result = await db.query('DELETE FROM meuEsquema.Profissional WHERE id=@Id', { Id: Id });

        if (Ag_Result.rowCount === 0 || Cl_Result.rowCount === 0) throw ('Nenhum registro encontrado para o Id fornecido');

        return Cl_Result.rowsAffected[0] > 0 && res.status(200).send('Sucess');
    } catch (e) {
        return res.status(500).send('Informações incorretar/indevidas')
    }
}
async function Alterar_Informacoes_Funcionario(req, res) {
    // Altera informações do funcionario
    const { Id, Credenciais, Mudancas } = req.query
    try {
        if (!Id) throw ('Sem Id');
        if (VerficarInjection(Id)) throw ('Possivel Ingection no Id');

        if (!Mudancas.Nome) throw ('Sem Mudancas.Nome');
        if (VerficarInjection(Mudancas.Nome)) throw ('Possivel Ingection no Nome');

        if (!Mudancas.Senha) throw ('Sem Mudancas.Senha');
        if (VerficarInjection(Mudancas.Senha)) throw ('Possivel Ingection na Senha');

        if (!Mudancas.Tipo_Acesso) throw ('Sem Mudancas.Tipo_Acesso');
        if (VerficarInjection(Mudancas.Tipo_Acesso)) throw ('Possivel Ingection na Tipo_Acesso');

        const { Verificar_Credenciais, Funcionario_Id } = await Verificar_Credenciais_Cliente(Credenciais)
        if (Verificar_Credenciais == undefined || Verificar_Credenciais) throw ('Credenciais Errada');

        if (Funcionario_Id != Id) throw ('Ids Diferente');

        const Result = await db.query(
            'UPDATE meuEsquema.Profissional SET Nome = @Nome, Senha = @Senha, Tipo_Acesso = @Tipo_Acesso WHERE id = @id', {
            Id: 1,
            Nome: Mudancas.Nome,
            Senha: Mudancas.Senha,
            Tipo_Acesso: Mudancas.Tipo_Acesso
        });
        return Result.rowsAffected[0] > 0 && res.status(200).send('Sucess');
    } catch (e) {
        return res.status(500).send('Informações incorretar/indevidas')
    }
}
async function Verificar_Funcionario(req, res) {
    const { Acesso, Senha } = req.query;
    try {
        if (!Acesso) throw ('Sem Acesso');
        if (VerficarInjection(Acesso)) throw ('Possivel ingection');

        if (!Senha) throw ('Sem Senha');
        if (VerficarInjection(Senha)) throw ('Possivel ingection');

        const result = await db.query(
            'SELECT * FROM meuEsquema.Profissional WHERE Acesso = @Acesso AND Senha = @Senha', {
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
                Tipo_Acesso: Rowrecordset.Tipo_Acesso
            }

            return res.status(200).json(Criptografia.Criptografar_Dados(JSON.stringify(Parametros), ChaveCrypto));
        } else {
            return res.status(404).json({ error: "Credenciais não encontradas" });
        }
    } catch (e) {
        return res.status(500).json({ error: "Erro ao verificar credenciais" });
    }
}

async function Verificar_Credenciais_Funcionario(Credenciais) {
    const Dados_Descriptografados = Criptografia.Descriptografar_Dados(Credenciais, ChaveCrypto)
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