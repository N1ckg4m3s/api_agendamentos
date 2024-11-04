
// /Funcionario

const express = require('express');
const router = express.Router();
const Funcoes_Funcionario=require('../Controller/Funcionario')

router.post("/Novo_Funcionario",Funcoes_Funcionario.Novo_Funcionario); // ' fazer '

router.delete("/Remover_Funcionario",Funcoes_Funcionario.Remover_Funcionario); // ' fazer '

router.put("/Alterar_Informacoes_Funcionario",Funcoes_Funcionario.Alterar_Informacoes_Funcionario); // ' fazer '

router.get("/Verificar_Funcionario",Funcoes_Funcionario.Verificar_Funcionario); // ' feito '

module.exports = router