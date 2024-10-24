/*
    Main do codigo responsavel por efetuar a inicialização do banco de dados
    junto de redirecionar os getter's para suas respectivas funções;

        Criação: Nicolas de Aguiar Silva (22/10/2024);
        Ultima_Atualização: ## (##/##/##);
*/

const Conexao=require('./Connect_DataBase')
const express = require('express');
require('dotenv').config();
require('dotenv').config({ path: 'Secundary.env' })

const app = express();
const port = process.env.Porta_acesso || 3000;
const db = new Conexao(); 

app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

app.listen(port, () => {
  console.log(`Servidor Executando em http://localhost:${port}`);
});
