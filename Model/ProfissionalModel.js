/*
    Script responsavel por armazenar a classe com padronização das requisições ao banco
    assim evitando ingection

        Criação: Nicolas de Aguiar Silva (24/10/2024);
        Ultima_Atualização: ## (##/##/##);
*/
const ConexaoDataBase = require('../Connect_DataBase');
const db = new ConexaoDataBase();

const Classes=require("./Classes");
class ProfissionalModels{
    async Criar_Profissional(Cliente_Class){
        try{
            const Query='INSERT INTO Profissional (NOME, ACESSO, SENHA) VALUES ($1, $2, $3) RETURNING *';
            const Params=[Cliente_Class.Nome, Cliente_Class.Acesso, Classes.Senha];
            
            db.Query(Query,Params);

        }catch(e){
            console.log(`CATCH | ProfissionalModels.Criar_Profissional == ${e}`)
        }
    }
    async Obter_Profissional_por_id(Id){
        try{
            const Query="SELECT * FROM Profissional WHERE ID == $1";
            const Params=[Id];

            const Consulta=db.Query(Query,Params);
            
            return Consulta[0];

        }catch(e){
            console.log(`CATCH | ProfissionalModels.Obter_Profissional_por_id == ${e}`)
        }
    }
}

module.exports= new ProfissionalModels();