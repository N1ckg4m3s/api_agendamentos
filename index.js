/*
    Main do codigo responsavel por efetuar a inicialização do banco de dados
    junto de redirecionar os getter's para suas respectivas funções;

        Criação: Nicolas de Aguiar Silva (22/10/2024);
        Ultima_Atualização: ## (##/##/##);
*/
const ConexaoDataBase=require('./Connect_DataBase')
const db=new ConexaoDataBase();

const express = require('express');
const Client_Routes=require("./Rotas/Router_Cliente")
const Agendamento_Routes=require("./Rotas/Router_Agendamento")
const Funcionario_Routes=require("./Rotas/Router_Funcionario")
const Dono_Routes=require("./Rotas/Router_Dono")

// Requisição dos .env
require('dotenv').config();
require('dotenv').config({ path: 'Secundary.env' })

const app = express();
const port = process.env.Porta_acesso || 3000;

app.get('/', (req, res) => {res.send('Hola Mundo')});

                /* FUNÇÕES DO CLIENT */
app.use('/Client', Client_Routes);
app.use('/Agendamento', Agendamento_Routes);
app.use('/Funcionario', Funcionario_Routes);
app.use('/Dono', Dono_Routes);

                /* FUNÇÕES DO FUNCIONARIO */
// app.use('/Funcionario', Client_Routes);

                /* FUNÇÕES DO DONO */
// app.use('/Dono', Client_Routes);


/*Get's Possiveis [FUNCIONARIO]
    Obter Agenda: Listar o usuario e o Horario dos agendamentos.
*/

/*Get's Possiveis [DONO]
    Obter Serviços: Para listar todos os serviços disponíveis.
    Listar Profissionais: Para listar todos os profissionais disponíveis para os serviços.
*/
/*Post's Possiveis [DONO]
    Criar Serviço: Para adicionar um novo serviço.
    Adicionar Funcionario: Para adicionar um novo funcionario.
*/
/*Put's Possiveis [DONO]
    Atualizar Serviço: Para atualizar as informações de um serviço existente.
    Atualizar Funcionario: Para atualizar as informações de um funcionario.
*/
/*Delete's Possiveis [DONO]
    Excluir Serviço: Para remover um serviço do sistema.
    Excluir Funcionario: Para remover um funcionario do sistema.
*/

const server = app.listen(port, () => {/*console.log(`Servidor Executando em http://localhost:${port}`)*/});
  
module.exports = { app, server,db };
