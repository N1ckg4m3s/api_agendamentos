const express = require('express');
const router = express.Router();
const Funcoes_Cliente=require('../Controller/Funcoes_Cliente')

                /* FUNÇÕES DE GET [CLIENT] */
// Obter Serviços: Para listar todos os serviços disponíveis.
router.get('/Obter_Servicos', (req, res) => {
    res.send('Retorno : Client/Obter_Servicos');
});

// Obter Agendamentos do Usuário: Para listar todos os agendamentos de um usuário específico.
router.get('/Obter_Agendamentos_Do_Usuario', (req, res) => {
    res.send('Retorno : Client/Obter_Agendamentos_Do_Usuario');
});

// Verificar Disponibilidade: Para verificar se um horário específico está disponível para agendamento.
router.get('/Verificar_Disponibilidade', (req, res) => {
    res.send('Retorno : Client/Verificar_Disponibilidade');
});

module.exports = router;