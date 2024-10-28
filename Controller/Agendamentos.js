/*
    Script responsavel por efetuar todas as funções determinadas para Agendamentos.
        Criação: Nicolas de Aguiar Silva (27/10/2024);
        Ultima_Atualização: ## (##/##/##);
*/
// LOCAL CLASS
class AgendamentosProfissional {
    constructor(Id) {
        this.Id = Id
        this.Agenda = []
    }
}
class HorarioAgenda {
    constructor(Hora, Consumo_Tempo) {
        this.Hora = Hora
        this.Consumo_Tempo = Consumo_Tempo
    }
}

// REQUIRES
const { Verificar_Credenciais_Cliente } = require('./Cliente');
require('dotenv').config({ path: '../.env' })
const db = require('../Connect_DataBase');

async function Novo_Agendamento(req, res) {
    const { Credenciais, Horario,
        Profissional, Trabalho,
        Data, Consumo_Tempo } = req.query
    try {
        function VerificarData(Data) {
            const NewDate = new Date(Data).getTime();

            if (isNaN(NewDate)) return true;
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            return NewDate < today.getTime();
        }

        if (!Credenciais) throw ('Sem Credenciais')
        const { Verificar_Credenciais, Cliente_Id } = await Verificar_Credenciais_Cliente(Credenciais)

        if (!Verificar_Credenciais==undefined || Verificar_Credenciais) throw ('Credenciais Errada')
        if (!Horario) throw ('Sem Horario')
        if (!Profissional) throw ('Sem Profissional')
        if (!Trabalho) throw ('Sem Trabalho')
        if (VerificarData(Data)) throw ('Sem Data')
        if (!Consumo_Tempo) throw ('Sem Consumo_Tempo')

        const Result = await db.query(
            'INSERT INTO meuEsquema.Agendamento (Cliente_Id, Profissional_Id, Trabalho_Id, Horario, Data, Consumo_Tempo) VALUES (@Cliente_Id, @Profissional_Id, @Trabalho_Id, @Horario, @Data, @Consumo_Tempo)', {
            Cliente_Id: Cliente_Id,
            Profissional_Id: Profissional,
            Trabalho_Id: Trabalho,
            Horario: Horario,
            Data: Data,
            Consumo_Tempo: Consumo_Tempo
        });

        if (Result.rowsAffected[0] > 0) return res.status(200).send("ok")

        return res.status(503).send('Under Construction');
    } catch (e) {
        return res.status(400).json({ message: 'Todos os parâmetros são obrigatórios e a data deve ser válida.' });
    }
}
async function Obter_Agendamentos(req, res) {
    // Obtem TODOS os Agendamentos de todos, do dia até N dias a frente
    return res.status(503).send('Under Construction');
}
async function Obter_Agendamentos_do_Dia(req, res) {
    // Obtem de todos os Agendamentos do dia
    return res.status(503).send('Under Construction');
}
async function Obter_Agendamentos_do_Usuario(req, res) {
    // Obtem os Agendamentos do usuario
    return res.status(503).send('Under Construction');
}
async function Obter_Todos_Agendamentos_do_Funcionario(req, res) {
    // Obtem todos os Agendamentos do funcionario
    return res.status(503).send('Under Construction');
}
async function Obter_Agendamentos_do_Funcionario_dia(req, res) {
    // Obtem os Agendamentos do funcionario para o dia
    return res.status(503).send('Under Construction');
}
async function Modificar_Agendamento(req, res) {
    // Altera alguma informação de um Agendamento
    return res.status(503).send('Under Construction');
}
async function Remover_Agendamento(req, res) {
    // Remove o Agendamentos em Especifico
    return res.status(503).send('Under Construction');
}
async function Verificar_Disponibilidade(req, res) {
    const { Data, Consumo_Tempo, Trabalho_Id } = req.query;
    try {
        if (Data == "") { return res.status(400).send("Falta de informação") }
        if (Consumo_Tempo <= 0) { return res.status(400).send("Falta de informação") }

        // Essa querry obtem todos os agendamentos com base no dia e com base no Trabalho_Profissinal
        // Que visa focar os agendamentos apenas nos profissionais dedicados a esse trabalho
        const Agendamentos_Dia_Focado_Profissional = await db.query(
            `SELECT a.* FROM meuEsquema.Agendamento AS a
            JOIN meuEsquema.Trabalho_Profissional AS tp 
            ON a.Trabalho_Id = tp.TrabalhoId 
            WHERE a.Data = @Dia AND tp.ProfissionalId IN (
                SELECT Profissional_Id 
                FROM meuEsquema.Trabalho_Profissional 
                WHERE TrabalhoId = @TrabalhoId
            )`,
            {
                TrabalhoId: Trabalho_Id,
                Dia: Data
            }
        );
        const RecordSet = Agendamentos_Dia_Focado_Profissional.recordset || [];

        // Gerar Agenda Simples
        const AgendaProfissionais = [];
        RecordSet.forEach((value) => {
            const ProfId = value.Profissional_Id;
            let ClasseCriada = AgendaProfissionais.find((v) => v.Id === ProfId);
            if (ClasseCriada === undefined) {
                ClasseCriada = new AgendamentosProfissional(ProfId);
                AgendaProfissionais.push(ClasseCriada);
            }
            ClasseCriada.Agenda.push(new HorarioAgenda(value.Horario, value.Consumo_Tempo));
        });

        // Gerar Lista Possibilidades Agendamento
        const RetornoLista = []
        const Slot_tempo = Number(process.env.Slot_tempo)

        const EspacoDeTempo = (Number(process.env.Fim_do_trabalho) - Number(process.env.Inicio_do_trabalho)) * 60
        const MaxSlotsTempo = EspacoDeTempo / Slot_tempo

        for (let N = 0; N < MaxSlotsTempo; N++) {
            const idsDisponiveis = [];

            AgendaProfissionais.forEach((profissional) => {
                let podeAgendar = true;
                profissional.Agenda.forEach((agendamento) => {
                    const horarioFinal = agendamento.Hora + agendamento.Consumo_Tempo;
                    if (N < horarioFinal && N + Slot_tempo > agendamento.Hora) {
                        podeAgendar = false;
                    }
                });
                if (podeAgendar) {
                    idsDisponiveis.push(profissional.Id);
                }
            });
            if (idsDisponiveis.length > 0) {
                RetornoLista[N] = idsDisponiveis;
            }
        }
        return res.status(200).json(RetornoLista)

    } catch (e) {
        console.error(e);
        return res.status(404).send('ERROR');
    }
}

module.exports = {
    Novo_Agendamento,
    Obter_Agendamentos,
    Obter_Agendamentos_do_Dia,
    Obter_Agendamentos_do_Usuario,
    Obter_Todos_Agendamentos_do_Funcionario,
    Obter_Agendamentos_do_Funcionario_dia,
    Modificar_Agendamento,
    Remover_Agendamento,
    Verificar_Disponibilidade,
}