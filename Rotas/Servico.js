
// /Servico

const express = require('express');
const router = express.Router();
const Funcoes_Servico=require('../Controller/Servico')

router.post("/Novo_Servico",Funcoes_Servico.Novo_Servico); // ' fazer '

router.delete("/Remover_Servico",Funcoes_Servico.Remover_Servico); // ' fazer '

router.put("/Alterar_Informacoes_Servico",Funcoes_Servico.Alterar_Informacoes_Servico); // ' fazer '

router.get("/Obter_Todos_Servico",Funcoes_Servico.Obter_Todos_Servico); // ' feito '

module.exports = router