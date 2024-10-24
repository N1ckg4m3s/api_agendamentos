/*
    Script apenas com as classes, visando facilitar a passagem de data entre as funções
*/

class Trabalho_Class {
    constructor(Nome, Descricao, TempoPrevisto, Foco_Profissionais) {
        this.Nome = Nome;
        this.Descricao = Descricao;
        this.TempoPrevisto = TempoPrevisto;
        this.Foco_Profissionais = Foco_Profissionais;
    }
}
class Profissional_Class {
    constructor(id, Nome) {
        this.id = id;
        this.Nome = Nome;
    }
}

class Agendamento_Class {
    constructor(Trabalho, Horario) {
        this.Trabalho = Trabalho
        this.Horario = Horario
    }
}

class Cliente_Class {
    constructor(Id, Nome, Acesso, Senha) {
        this.Id=Id
        this.Nome=Nome
        this.Acesso=Acesso
        this.Senha=Senha
    }
}

module.exports = {
    Trabalho_Class,
    Profissional_Class,
    Agendamento_Class,
    Cliente_Class,
};