const express = require('express');
const router = express.Router();
const Funcoes_Cliente=require('../Controller/Funcoes_Cliente')

                /* FUNÇÕES DE GET [CLIENT] */
// Obter Horários Disponíveis: Para listar os horários disponíveis com base no tempo requerido.
router.get('/Obter_Horarios_Disponiveis', (req, res) => {
    res.send('Retorno : Agendamento/Obter_Horarios_Disponiveis');
});

// Verificar Disponibilidade: Para verificar se um horário específico está disponível para agendamento.
router.get('/Verificar_Disponibilidade', (req, res) => {
    res.send('Retorno : Agendamento/Verificar_Disponibilidade');
});

                /* FUNÇÕES DE POST [CLIENT] */
// Novo Agendamento: Para agendar um novo horário para um serviço.
router.post('/Novo_Agendamento', (req, res) => {
    res.send('Retorno : Agendamento/Novo_Agendamento');
});

                /* FUNÇÕES DE PUT [CLIENT] */
// Modificar Agendamento: Para atualizar os detalhes de um agendamento.
router.put('/Modificar_Agendamento', (req, res) => {
    res.send('Retorno : Agendamento/Modificar_Agendamento');
});

                /* FUNÇÕES DE DELETE [CLIENT] */
// Excluir Agendamento: Para cancelar um agendamento.
router.delete('/Excluir_Agendamento', (req, res) => {
    res.send('Retorno : Agendamento/Modificar_Agendamento');
});

module.exports = router;