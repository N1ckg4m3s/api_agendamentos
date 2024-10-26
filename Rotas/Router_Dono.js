const express = require('express');
const router = express.Router();
const Funcoes_Cliente=require('../Controller/Funcoes_Cliente')

                /* FUNÇÕES DE GET [CLIENT] */
// Obter Serviços: Para listar todos os serviços disponíveis.
router.get('/Client/Obter_Servicos', (req, res) => {
    res.send('Retorno : Client/Obter_Servicos');
});

// Obter Horários Disponíveis: Para listar os horários disponíveis com base no tempo requerido.
router.get('/Client/Obter_Horarios_Disponiveis', (req, res) => {
    res.send('Retorno : Client/Obter_Horarios_Disponiveis');
});

// Obter Agendamentos do Usuário: Para listar todos os agendamentos de um usuário específico.
router.get('/Client/Obter_Agendamentos_Do_Usuario', (req, res) => {
    res.send('Retorno : Client/Obter_Agendamentos_Do_Usuario');
});

// Verificar Disponibilidade: Para verificar se um horário específico está disponível para agendamento.
router.get('/Client/Verificar_Disponibilidade', (req, res) => {
    res.send('Retorno : Client/Verificar_Disponibilidade');
});

                /* FUNÇÕES DE POST [CLIENT] */
// Novo Agendamento: Para agendar um novo horário para um serviço.
router.post('/Client/Novo_Agendamento', (req, res) => {
    res.send('Retorno : Client/Novo_Agendamento');
});

                /* FUNÇÕES DE PUT [CLIENT] */
// Modificar Agendamento: Para atualizar os detalhes de um agendamento.
router.put('/Client/Modificar_Agendamento', (req, res) => {
    res.send('Retorno : Client/Modificar_Agendamento');
});

                /* FUNÇÕES DE DELETE [CLIENT] */
// Excluir Agendamento: Para cancelar um agendamento.
router.delete('/Client/Excluir_Agendamento', (req, res) => {
    res.send('Retorno : Client/Modificar_Agendamento');
});

module.exports = router;