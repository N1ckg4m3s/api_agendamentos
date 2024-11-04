/*
    Main do codigo responsavel por efetuar a inicialização do banco de dados
    junto de redirecionar os getter's para suas respectivas funções;

        Criação: Nicolas de Aguiar Silva (22/10/2024);
        Ultima_Atualização: ## (##/##/##);
*/
const express = require('express');

const Route_Cliente=require("./Rotas/Cliente")
const Route_Agendamento=require("./Rotas/Agendamentos")
const Route_Funcionario=require("./Rotas/Funcionario")
const Route_Servico=require("./Rotas/Servico")

// Requisição dos .env
require('dotenv').config();

const app = express();
const port = process.env.Porta_acesso || 3000;

app.get('/', (req, res) => {res.send('Olá Mundo')});

app.use('/Client', Route_Cliente);
app.use('/Agendamento', Route_Agendamento);
app.use('/Funcionario', Route_Funcionario);
app.use('/Servico', Route_Servico);

const server = app.listen(port, () => {/*console.log(`Servidor Executando em http://localhost:${port}`)*/});
  
module.exports = { app, server };
