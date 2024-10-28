// /Client

const express = require('express');
const router = express.Router();
const Funcoes_Cliente=require('../Controller/Cliente')

router.post("/Novo_Cliente",Funcoes_Cliente.Novo_Cliente);

router.delete("/Remover_Cliente",Funcoes_Cliente.Remover_Cliente);

router.put("/Alterar_Informacoes_Cliente",Funcoes_Cliente.Alterar_Informacoes_Cliente);

router.get("/Verificar_Credenciais_Cliente",Funcoes_Cliente.Verificar_Credenciais_Cliente);

module.exports = router