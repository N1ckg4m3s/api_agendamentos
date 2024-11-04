// /Client

const express = require('express');
const router = express.Router();
const Funcoes_Cliente=require('../Controller/Cliente')

router.post("/Novo_Cliente",Funcoes_Cliente.Novo_Cliente); // ' fazer '

router.delete("/Remover_Cliente",Funcoes_Cliente.Remover_Cliente); // ' fazer '

router.put("/Alterar_Informacoes_Cliente",Funcoes_Cliente.Alterar_Informacoes_Cliente); // ' fazer '

router.get("/Verificar_Cliente",Funcoes_Cliente.Verificar_Cliente);; // ' feito '

module.exports = router