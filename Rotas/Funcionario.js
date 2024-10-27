
// /Funcionario

const express = require('express');
const router = express.Router();
const Funcoes_Funcionario=require('../Controller/Funcionario')

router.get("/Novo_Funcionario",Funcoes_Funcionario.Novo_Funcionario);

router.get("/Remover_Funcionario",Funcoes_Funcionario.Remover_Funcionario);

router.get("/Alterar_Informacoes_Funcionario",Funcoes_Funcionario.Alterar_Informacoes_Funcionario);

router.get("/Verificar_Credenciais_Funcionario",Funcoes_Funcionario.Verificar_Credenciais_Funcionario);

module.exports = router