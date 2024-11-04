/*
    Script responsavel por efetuar todas as funções determinadas para os Serviços.
        Criação: Nicolas de Aguiar Silva (27/10/2024);
        Ultima_Atualização: ## (##/##/##);
*/

const db = require('../Connect_DataBase');
const { Verificar_Credenciais_Funcionario } = require('./Funcionario');

async function Novo_Servico(req, res) {
    const { Nome, Descricao, Tempo_Previsto, Valor, Foco_Profissional, Credenciais } = req.query // Necessita das credenciais do funcionario
    try {
        if (!Nome || Nome === '') throw ('Nome não definido');
        if (!Tempo_Previsto || Tempo_Previsto <= 0) throw ('Tempo Previsto não definido');
        if (!Valor || Valor === '') throw ('Valor não definido');
        if (!Foco_Profissional) throw ('Foco_Profissional não definido');
        if (Foco_Profissional.length <= 0) throw ('Foco_Profissional vazio');

        const { Verificar_Credenciais, _ } = await Verificar_Credenciais_Funcionario(Credenciais)
        if (Verificar_Credenciais == undefined || Verificar_Credenciais) throw ('Credenciais Errada');

        const Result_Servico = await db.query(
            'INSERT INTO meuEsquema.Trabalho (Nome, Descricao, Tempo_Previsto, Valor) OUTPUT INSERTED.id VALUES (@Nome, @Descricao, @Tempo_Previsto, @Valor)', {
            Nome: Nome,
            Descricao: Descricao,
            Tempo_Previsto: Tempo_Previsto,
            Valor: Valor
        });
        if (Result_Servico.rowsAffected[0] <= 0) throw ('Trabalho não adicionado corretamente');
        const ID_Trabalho = Result_Servico.recordset[0].id
        const ID_Prodissionais = Foco_Profissional.map(id => `(${ID_Trabalho},${id})`).join(',')

        const Result_Foco = await db.query(`INSERT INTO meuEsquema.Trabalho_Profissional (TrabalhoId, ProfissionalId) VALUES ${ID_Prodissionais}`);

        if (Result_Foco.rowsAffected[0] <= 0) throw ('Foco não adicionado corretamente');
        return res.status(200).send('Sucess');
    } catch (e) {
        return res.status(500).json({ Erro: `Erro ao obter dados do banco de dado` })
    }
}

async function Remover_Servico(req, res) {
    // Remove o Serviço
    const { Id, Credenciais } = req.query // Necessita das credenciais do funcionario

    try {
        if (!Id) throw ('Id Não identificado')

        const { Verificar_Credenciais, _ } = await Verificar_Credenciais_Funcionario(Credenciais)
        if (Verificar_Credenciais == undefined || Verificar_Credenciais) throw ('Credenciais Errada');

        const trabalhoExistente = await db.query('SELECT COUNT(*) as count FROM meuEsquema.Trabalho WHERE id = @Id', { Id: Id });
        if (trabalhoExistente.recordset[0].count === 0) {
            return res.status(404).send('Trabalho não encontrado'); // Retorna um erro se não existir
        }

        await db.query('DELETE FROM meuEsquema.Trabalho_Profissional WHERE TrabalhoId = @Id', { Id: Id });

        await db.query('DELETE FROM meuEsquema.Trabalho WHERE id = @Id', { Id: Id });

        return res.status(200).send();
    } catch (e) {
        return res.status(500).json({ Erro: `Erro ao obter dados do banco de dado` })
    }
}

async function Alterar_Informacoes_Servico(req, res) {
    // Altera informações do Serviço
    const { Id, Credenciais, Alterar } = req.query;
    try {
        if (!Id) throw ('Id Não identificado')

        const { Verificar_Credenciais, _ } = await Verificar_Credenciais_Funcionario(Credenciais)
        if (Verificar_Credenciais == undefined || Verificar_Credenciais) throw ('Credenciais Errada');

        if (!Alterar.Nome || Alterar.Nome === '') throw ('Alterar.Nome não definido');
        if (!Alterar.Tempo_Previsto || Alterar.Tempo_Previsto <= 0) throw ('Alterar.Tempo Previsto não definido');
        if (!Alterar.Valor || Alterar.Valor === '') throw ('Alterar.Valor não definido');
        if (!Alterar.Foco_Profissional) throw ('Alterar.Foco_Profissional não definido');
        if (Alterar.Foco_Profissional.length <= 0) throw ('Alterar.Foco_Profissional vazio');

        await db.query('UPDATE meuEsquema.Trabalho SET Nome=@Nome, Descricao=@Descricao, Tempo_Previsto=@Tempo_Previsto, Valor=@Valor WHERE id=@id', {
            id: Id,
            Nome: Alterar.Nome,
            Descricao: Alterar.Descricao,
            Tempo_Previsto: Alterar.Tempo_Previsto,
            Valor: Alterar.Valor,
        })
        await db.query('DELETE FROM meuEsquema.Trabalho_Profissional WHERE TrabalhoId = @Id', { Id });

        const values = Alterar.Foco_Profissional.map(id => `(${Id}, ${id})`).join(',');
        if (values.length > 0) {
            const insertQuery = `INSERT INTO meuEsquema.Trabalho_Profissional (TrabalhoId, ProfissionalId) VALUES ${values};`;
            await db.query(insertQuery);
        }

        return res.status(200).send();
    } catch (e) {
        return res.status(500).json({ Erro: `Erro ao obter dados do banco de dado` })

    }
    return res.status(503).send('Under Construction');
}
async function Obter_Todos_Servico(req, res) {
    // Obtem todos os serviços do Banco de dados.
    try {
        const result = await db.query('SELECT * FROM meuEsquema.Trabalho')
        const records = result.recordset || [];
        if (records.length === 0) {
            return res.status(204).send();
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