/*
    Script responsavel por armazenar a classe com padronização das requisições ao banco
    assim evitando ingection

        Criação: Nicolas de Aguiar Silva (24/10/2024);
        Ultima_Atualização: ## (##/##/##);
*/
const ConexaoDataBase = require('../Connect_DataBase');
const db = new ConexaoDataBase();

const Classes=require("./Classes");
class UsuarioModels{
    async Criar_Usuario(Cliente_Class){
        try{
            const Query='INSERT INTO Cliente (NOME, ACESSO, SENHA) VALUES ($1, $2, $3) RETURNING *';
            const Params=[Cliente_Class.Nome, Cliente_Class.Acesso, Classes.Senha];
            
            db.Query(Query,Params);

        }catch(e){
            console.log(`CATCH | UsuarioModels.Criar_Usuario == ${e}`)
        }
    }
    async Obter_Usuario_por_id(Id){
        try{
            const Query="SELECT * FROM Cliente WHERE ID == $1";
            const Params=[Id];

            const Consulta=db.Query(Query,Params);

            return Consulta[0];

        }catch(e){
            console.log(`CATCH | UsuarioModels.Obter_Usuario_por_id == ${e}`)
        }
    }
}

module.exports= new UsuarioModels();