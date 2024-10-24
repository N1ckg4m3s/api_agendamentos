/*
    Script responsável por efetuar a conexão com o banco de dados

        Criação: Nicolas de Aguiar Silva (22/10/2024);
        Última Atualização: ## (##/##/##);
*/

const mysql = require('mysql2');

class ConexaoDataBase {
    constructor() {
        this.connection = mysql.createPool({
            host: process.env.Hospedagem_banco,
            user: process.env.Usuario,
            password: process.env.Senha,
            database: process.env.Banco,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        this.connection.getConnection((err, connection) => {
            if (err) {
                console.error('Erro ao conectar: ' + err.stack);
                return;
            }
            console.log('Conectado como ID ' + connection.threadId);
            connection.release(); // Libera a conexão após verificar
        });
    }

    Query(sql, params) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    Finalizar_conexao() {
        this.connection.end((err) => {
            if (err) {
                console.error('Erro ao finalizar a conexão: ' + err.stack);
            } else {
                console.log('Conexões encerradas.');
            }
        });
    }
}

module.exports = ConexaoDataBase;