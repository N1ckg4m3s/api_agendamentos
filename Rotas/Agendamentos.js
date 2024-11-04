// /Agendamento

const express = require('express');
const router = express.Router();
const Funcoes_Agendameto = require('../Controller/Agendamentos')

router.post("/Novo_Agendamento", Funcoes_Agendameto.Novo_Agendamento); // ' feito '

router.get("/Obter_Agendamentos", Funcoes_Agendameto.Obter_Agendamentos); // ' feito '
router.get("/Obter_Agendamentos_do_Dia", Funcoes_Agendameto.Obter_Agendamentos_do_Dia); // ' feito '
router.get("/Obter_Agendamentos_do_Usuario", Funcoes_Agendameto.Obter_Agendamentos_do_Usuario); // ' feito '

router.get("/Obter_Todos_Agendamentos_do_Funcionario", Funcoes_Agendameto.Obter_Todos_Agendamentos_do_Funcionario); // ' feito '
router.get("/Obter_Agendamentos_do_Funcionario_dia", Funcoes_Agendameto.Obter_Agendamentos_do_Funcionario_dia); // ' feito '

router.put("/Modificar_Agendamento", Funcoes_Agendameto.Modificar_Agendamento); // ' feito '
router.delete("/Remover_Agendamento", Funcoes_Agendameto.Remover_Agendamento); // ' feito '

router.get("/Verificar_Disponibilidade", Funcoes_Agendameto.Verificar_Disponibilidade); // ' feito '

module.exports = router