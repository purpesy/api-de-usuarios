const e = require("express");
var knex = require("../database/connection.js");
var bcrypt = require('bcryptjs'); // Importa o bcryptjs para criptografar senhas
// Classe User que representa o modelo de usuário

class User{

    async findAll(){
        try {
            var result = await knex.select(["id_user", "nome_user", "email_user", "cargo_user"]).table("tbl_users");
            return result; // Retorna todos os usuários encontrados
        } catch (error) {
            console.log(error);
            return []; // Retorna um array vazio em caso de erro
        }
    }

    async findById(id){
        try {
            var result = await knex.select(["id_user", "nome_user", "email_user", "cargo_user"]).table("tbl_users").where({id_user: id});
            if(result.length > 0){
                return result[0]; // Retorna o primeiro usuário encontrado
            } else {
                return null; // Retorna null se nenhum usuário for encontrado
            }
        } catch (error) {
            console.log(error);
            return null; // Retorna null em caso de erro
        }
    }

    async new(email_user,senha_user,nome_user){
        var hash = await bcrypt.hash(senha_user, 10); // Criptografa a senha com bcrypt
        try {
            await knex.insert({email_user,senha_user:hash,nome_user,cargo_user:0}).table("tbl_users");
        } catch (error) {
            console.log(error);
        }       
    }

    async findEmail(email){
        try {
            var result = await knex.select("*").from("tbl_users").where({email_user: email});
            if(result.length > 0){
                return true; // Retorna o primeiro usuário encontrado
            } else {
                return false; // Retorna false se nenhum usuário for encontrado
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = new User();
// O código acima define uma classe User que representa o modelo de usuário.