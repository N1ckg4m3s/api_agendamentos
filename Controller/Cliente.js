/*
    Script responsavel por efetuar todas as funções determinadas para o Cliente.
        Criação: Nicolas de Aguiar Silva (27/10/2024);
        Ultima_Atualização: ## (##/##/##);
*/
const db = require('../Connect_DataBase');
const Criptografia=require('../Criptografia');

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
            const Rowrecordset=result.recordset[0]

            const Id=Rowrecordset.id
            const Nome=Rowrecordset.Nome
            const Acesso=Rowrecordset.Acesso

            return res.status(200).json(Criptografia.Criptografar_Dados(`${Id}/*\\${Nome}/*\\${Acesso}`));
        } else {
            return res.status(404).json({ error: "Credenciais não encontradas" });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Erro ao verificar credenciais" });
    }
    
}

module.exports = {
    Novo_Cliente,
    Remover_Cliente,
    Alterar_Informacoes_Cliente,
    Verificar_Credenciais_Cliente
}