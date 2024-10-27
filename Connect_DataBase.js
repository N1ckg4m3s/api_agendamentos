/*
    Script responsável por efetuar a conexão com o banco de dados

        Criação: Nicolas de Aguiar Silva (22/10/2024);
        Última Atualização: ## (##/##/##);
*/

const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.Usuario,
    password: process.env.Senha,
    server: process.env.Hospedagem_banco || 'localhost',
    database: process.env.Banco,
    port: 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

class ConexaoDataBase {
    constructor() {
        this.pool = null;
        this.connect();
    }

    async connect() {
        if (this.pool == sql.ConnectionPool) return;
        try {
            this.pool = await sql.connect(config);
            console.log("Conectado ao banco de dados");
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
            return result;
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

const conexaoDB = new ConexaoDataBase(); // Inicializa a conexão
module.exports = conexaoDB; // Exporta a instância da conexão
