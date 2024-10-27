// /Agendamento

const express = require('express');
const router = express.Router();
const Funcoes_Agendameto = require('../Controller/Agendamentos')

router.get("/Novo_Agendamento", Funcoes_Agendameto.Novo_Agendamento);

router.get("/Obter_Agendamentos", Funcoes_Agendameto.Obter_Agendamentos);
router.get("/Obter_Agendamentos_do_Dia", Funcoes_Agendameto.Obter_Agendamentos_do_Dia);
router.get("/Obter_Agendamentos_do_Usuario", Funcoes_Agendameto.Obter_Agendamentos_do_Usuario);

router.get("/Obter_Todos_Agendamentos_do_Funcionario", Funcoes_Agendameto.Obter_Todos_Agendamentos_do_Funcionario);
router.get("/Obter_Agendamentos_do_Funcionario_dia", Funcoes_Agendameto.Obter_Agendamentos_do_Funcionario_dia);

router.get("/Modificar_Agendamento", Funcoes_Agendameto.Modificar_Agendamento);
router.get("/Remover_Agendamento", Funcoes_Agendameto.Remover_Agendamento);
router.get("/Verificar_Disponibilidade", Funcoes_Agendameto.Verificar_Disponibilidade);

module.exports = router