/*
    Script responsável por efetuar a conexão com o banco de dados

        Criação: Nicolas de Aguiar Silva (22/10/2024);
        Última Atualização: ## (##/##/##);
*/

const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.Usuario, // 'Teste_Theus_Banco'
    password: process.env.Senha, // 'Teste_Theus_Banco'
    server: process.env.Hospedagem_banco || 'localhost', // ex: '127.0.0.1'
    database: process.env.Banco, // 'Teste_Theus_Banco'
    port: 1433,
    options: {
        encrypt: false, // Defina como true se estiver usando Azure
        trustServerCertificate: true // Use true em ambientes de desenvolvimento
    }
};

class ConexaoDataBase {
    constructor() {this.connect();}

    async connect() {
        try {
            this.pool = await sql.connect(config);
        } catch (err) {
            console.error("Erro ao conectar ao banco de dados:", err);
        }
    }

    async query(sqlQuery, params) {
        try {
            const request = this.pool.request();

            // Adiciona parâmetros se houver
            if (params) {
                for (const [key, value] of Object.entries(params)) {
                    request.input(key, value);
                }
            }

            const result = await request.query(sqlQuery);
            return result.recordset;
        } catch (error) {
            console.error('Erro ao executar a query:', error);
            throw error;
        }
    }

    async finalizarConexao() {
        try {
            await sql.close();
            console.log('Conexões encerradas.');
        } catch (err) {
            console.error('Erro ao finalizar a conexão:', err.stack);
        }
    }
}

module.exports = ConexaoDataBase;
