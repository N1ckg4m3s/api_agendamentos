/*
    Script responsavel por efetuar todas as funções determinadas para o cliente,
    Tanto com requisições ao banco de dados, quanto com funções de funcionalidades.
    
    Aqui tera funções determinadas como: Verificações, Obter um grupo de dados especificos...;

        Criação: Nicolas de Aguiar Silva (22/10/2024);
        Ultima_Atualização: ## (##/##/##);
*/
const {db} =require('../index')

/* FUNÇÕES DE GET */
function Obter_Servicos(){
    // Obter Serviços: Para listar todos os serviços disponíveis.
}

function Obter_Horarios_Disponiveis(){
    // Obter Horários Disponíveis: Para listar os horários disponíveis com base no tempo requerido.
}

function Obter_Agendamentos_Do_Usuario(){
    // Obter Agendamentos do Usuário: Para listar todos os agendamentos de um usuário específico.
}

function Verificar_Disponibilidade(){
    // Verificar Disponibilidade: Para verificar se um horário específico está disponível para agendamento.
}

/* FUNÇÕES DE POST */
function Novo_Agendamento(){
    // Novo Agendamento: Para agendar um novo horário para um serviço.
}

/* FUNÇÕES DE PUT */
function Modificar_Agendamento(){
    // Modificar Agendamento: Para atualizar os detalhes de um agendamento.
}

/* FUNÇÕES DE DELETE */
function Excluir_Agendamento(){
    // Excluir Agendamento: Para cancelar um agendamento.
}


module.exports={
    // Get
    Obter_Servicos,
    Obter_Horarios_Disponiveis,
    Obter_Agendamentos_Do_Usuario,
    Verificar_Disponibilidade,

    // Post
    Novo_Agendamento,

    // Put
    Modificar_Agendamento,

    // Delete
    Excluir_Agendamento,

    Teste: async () => {
        try {
            const results = await db.query("SELECT * FROM meuEsquema.Cliente", []);
            return results; // Retorna os resultados
        } catch (error) {
            console.error('Erro ao executar a query:', error);
            throw error; // Repassa o erro
        }
    }
}