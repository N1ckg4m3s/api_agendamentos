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
const { Verificar_Credenciais_Funcionario } = require('./Funcionario');
require('dotenv').config({ path: '../.env' })
const db = require('../Connect_DataBase');

function VerificarData(Data, OnlyData) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!regex.test(Data)) return true;

    const NewDate = new Date(Data);
    if (isNaN(NewDate.getTime())) return true;

    if (OnlyData) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return NewDate.getTime() < today.getTime();
}

async function Novo_Agendamento(req, res) {
    const { Credenciais, Horario,
        Profissional, Trabalho,
        Data, Consumo_Tempo } = req.query
    try {
        if (!Credenciais) throw ('Sem Credenciais');
        const { Verificar_Credenciais, Cliente_Id } = await Verificar_Credenciais_Cliente(Credenciais);

        if (Verificar_Credenciais == undefined || Verificar_Credenciais) throw ('Credenciais Errada');
        if (!Horario) throw ('Sem Horario');
        if (!Profissional) throw ('Sem Profissional');
        if (!Trabalho) throw ('Sem Trabalho');
        if (VerificarData(Data)) throw ('Sem Data');
        if (!Consumo_Tempo) throw ('Sem Consumo_Tempo');

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

        return res.status(500).send('Erro interno');
    } catch (e) {
        return res.status(400).json({ message: 'Todos os parâmetros são obrigatórios e a data deve ser válida.' });
    }
}
async function Obter_Agendamentos(req, res) {
    // Obtem TODOS os Agendamentos de todos, do dia até N dias a frente
    const { Credenciais } = req.query       // precisa ter as credenciais de funcionario
    try {
        if (!Credenciais) throw ('Sem Credenciais');

        const { Verificar_Credenciais, _ } = await Verificar_Credenciais_Funcionario(Credenciais)
        if (Verificar_Credenciais == undefined || Verificar_Credenciais) throw ('Credenciais Errada');

        const Result = await db.query('SELECT * FROM meuEsquema.Agendamento')
        if (Result && Result.recordset) {
            return res.status(200).json(Result.recordset)
        }
        return res.status(500).send('Erro interno');
    } catch (e) {
        return res.status(400).json({ message: 'Todos os parâmetros são obrigatórios e a data deve ser válida.' });
    }
}
async function Obter_Agendamentos_do_Dia(req, res) {
    // Obtem de todos os Agendamentos do dia
    const { Credenciais, Data } = req.query      // precisa ter as credenciais de funcionario
    try {
        if (!Credenciais) throw ('Sem Credenciais');
        const { Verificar_Credenciais, _ } = await Verificar_Credenciais_Funcionario(Credenciais)
        if (Verificar_Credenciais == undefined || Verificar_Credenciais) throw ('Credenciais Errada')

        if (VerificarData(Data, true)) throw ('Sem Data');

        const Result = await db.query('SELECT * FROM meuEsquema.Agendamento WHERE data = @data', { data: Data })
        if (Result && Result.recordset) {
            return res.status(200).json(Result.recordset)
        }
        return res.status(500).send('Erro interno');
    } catch (e) {
        return res.status(400).json({ message: 'Todos os parâmetros são obrigatórios e a data deve ser válida.' });
    }
}
async function Obter_Agendamentos_do_Usuario(req, res) {
    // Obtém os Agendamentos do usuário
    const { Credenciais, UserId } = req.query; // Precisa ter credenciais do usuário ou funcionário.

    try {
        if (!Credenciais) throw ('Sem Credenciais');
        if (!UserId) throw ('Sem Id do Usuario');

        let Result;
        const { Verificar_Credenciais, Cliente_Id } = await Verificar_Credenciais_Cliente(Credenciais);

        // Se as credenciais forem do cliente
        if ((Verificar_Credenciais!==undefined && !Verificar_Credenciais) && Cliente_Id == UserId) {
            Result = await db.query('SELECT * FROM meuEsquema.Agendamento WHERE Cliente_Id=@UserId', { UserId: UserId });
        } else {
            // Se não for do cliente, verifica se são credenciais de funcionário
            const { Verificar_Credenciais } = await Verificar_Credenciais_Funcionario(Credenciais);
            if ((Verificar_Credenciais!==undefined && !Verificar_Credenciais)) {
                Result = await db.query('SELECT * FROM meuEsquema.Agendamento WHERE Cliente_Id=@UserId', { UserId: UserId });
            } else throw ('Credenciais Erradas');
        }

        if (Result && Result.recordset) {
            return res.status(200).json(Result.recordset);
        }
        return res.status(500).send('Erro interno');
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
}
async function Obter_Todos_Agendamentos_do_Funcionario(req, res) {
    // Obtem todos os Agendamentos do funcionario
    const { Credenciais, FuncionarioId } = req.query     // precisa ter as credenciais de funcionario
    try {
        if (!Credenciais) throw ('Sem Credenciais');

        const { Verificar_Credenciais, _ } = await Verificar_Credenciais_Funcionario(Credenciais)
        if (Verificar_Credenciais == undefined || Verificar_Credenciais) throw ('Credenciais Errada');

        if (!FuncionarioId) throw ('Sem Id do Funcionario');

        const Result = await db.query('SELECT * FROM meuEsquema.Agendamento WHERE Profissional_Id=@Funcionario', { Funcionario: FuncionarioId })

        if (Result && Result.recordset) {
            return res.status(200).json(Result.RecordSet)
        }

        return res.status(500).send('Erro interno');
    } catch (e) {
        return res.status(400).json({ message: 'Todos os parâmetros são obrigatórios e a data deve ser válida.' });
    }
}
async function Obter_Agendamentos_do_Funcionario_dia(req, res) {
    // Obtem os Agendamentos do funcionario para o dia
    const { Credenciais, Data, FuncionarioId } = req.query       // precisa ter as credenciais de funcionario
    try {
        if (!Credenciais) throw ('Sem Credenciais');

        const { Verificar_Credenciais, _ } = await Verificar_Credenciais_Funcionario(Credenciais)
        if (Verificar_Credenciais == undefined || Verificar_Credenciais) throw ('Credenciais Errada');

        if (VerificarData(Data, true)) throw ('Sem Data');

        const Result = await db.query('SELECT * FROM meuEsquema.Agendamento  WHERE Profissional_Id=@Funcionario, data = @Data',
            {
                Funcionario: FuncionarioId,
                Data: Data
            }
        )
        if (Result && Result.recordset) {
            return res.status(200).json(Result.RecordSet)
        }
        return res.status(500).send('Erro interno');
    } catch (e) {
        return res.status(400).json({ message: 'Todos os parâmetros são obrigatórios e a data deve ser válida.' });
    }
}
async function Modificar_Agendamento(req, res) {
    // Altera alguma informação de um Agendamento
    const { Credenciais, AgendamentoID, Mudancas } = req.query        // precisa ter as credenciais de usuario
    try {
        var { Verificar_Credenciais } = await Verificar_Credenciais_Cliente(Credenciais)
        if (!Credenciais || (Verificar_Credenciais == undefined) || Verificar_Credenciais) throw ('Credenciais Errada');

        if (!AgendamentoID) throw ('Sem Id do Agendamento');
        // Vefificação das mudanças se não tem nenhuma vazia

        const { Horario, Profissional_Id, Trabalho_Id, Data, Consumo_Tempo } = Mudancas;
        if (!Horario) throw ('Sem Horario');
        if (!Profissional_Id) throw ('Sem Profissional');
        if (!Trabalho_Id) throw ('Sem Trabalho');
        if (VerificarData(Data)) throw ('Sem Data');
        if (!Consumo_Tempo) throw ('Sem Consumo_Tempo');

        const Result = await db.query('UPDATE meuEsquema.Agendamento SET Profissional_Id=@Profissional_Id, Trabalho_Id=@Trabalho_Id, Horario=@Horario, Data=@Data, Consumo_Tempo=@Consumo_Tempo WHERE id=@id', {
            Profissional_Id: Profissional_Id,
            Trabalho_Id: Trabalho_Id,
            Horario: Horario,
            Data: Data,
            Consumo_Tempo: Consumo_Tempo,
            id: AgendamentoID
        })
        if (Result && Result.rowsAffected[0] > 0) {
            return res.status(200).send('Sucess')
        }
        return res.status(500).send('Erro interno');
    } catch (e) {
        return res.status(400).json({ message: 'Todos os parâmetros são obrigatórios e a data deve ser válida.' });
    }
}
async function Remover_Agendamento(req, res) {
    // Remove o Agendamentos em Especifico
    const { Credenciais, AgendamentoID } = req.query     // precisa ter as credenciais de usuario
    try {
        var { Verificar_Credenciais } = await Verificar_Credenciais_Cliente(Credenciais)
        if (Verificar_Credenciais == undefined || Verificar_Credenciais) throw ('Credenciais Errada');

        if (!AgendamentoID) throw ('Sem id do Agendamento');

        const Result = await db.query('DELETE FROM meuEsquema.Agendamento WHERE id=@Id', {
            Id: AgendamentoID
        })
        if (Result && Result.rowsAffected[0] > 0) {
            return res.status(200).send('Sucess')
        }

        return res.status(500).send('Erro interno');
    } catch (e) {
        return res.status(400).json({ message: 'Todos os parâmetros são obrigatórios e a data deve ser válida.' });
    }
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
            if (idsDisponiveis) {
                RetornoLista[N] = idsDisponiveis;
            }
        }
        return res.status(200).json(RetornoLista)

    } catch (e) {
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