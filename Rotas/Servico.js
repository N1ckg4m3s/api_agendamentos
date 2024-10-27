
// /Servico

const express = require('express');
const router = express.Router();
const Funcoes_Servico=require('../Controller/Servico')

router.get("/Novo_Servico",Funcoes_Servico.Novo_Servico);

router.get("/Remover_Servico",Funcoes_Servico.Remover_Servico);

router.get("/Alterar_Informacoes_Servico",Funcoes_Servico.Alterar_Informacoes_Servico);

router.get("/Obter_Todos_Servico",Funcoes_Servico.Obter_Todos_Servico);

module.exports = router