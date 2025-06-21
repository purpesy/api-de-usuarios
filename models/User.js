var knex = require("../database/connection.js");
var bcrypt = require('bcryptjs'); // Importa o bcryptjs para criptografar senhas
const PasswordToken = require("./PasswordToken.js");
// Classe User que representa o modelo de usuário

class User{

    async findAll(){ // listar todos
        try {
            var result = await knex.select(["id_user", "nome_user", "email_user", "cargo_user"]).table("tbl_users");
            return result; // Retorna todos os usuários encontrados
        } catch (error) {
            console.log(error);
            return []; // Retorna um array vazio em caso de erro
        }
    }

    async findById(id){ // Buscar usuário por ID
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

    async findByEmail(email){ // Buscar usuário por email
        try {
            var result = await knex.select(["id_user", "nome_user", "email_user", "senha_user", "cargo_user"]).table("tbl_users").where({email_user: email});
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

    async new(email_user,senha_user,nome_user){ // Cria um novo usuário
        var hash = await bcrypt.hash(senha_user, 10); // Criptografa a senha com bcrypt
        try {
            await knex.insert({email_user,senha_user:hash,nome_user,cargo_user:0}).table("tbl_users");
        } catch (error) {
            console.log(error);
        }       
    }

    async findEmail(email){ // Verifica se o email já está cadastrado
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

    async update(id, email_user, nome_user, cargo_user){ // Atualiza os dados de um usuário
        var user = await this.findById(id);
        if(user != undefined){
            var editUser = {}; 

            if(email_user != undefined){
                var result = await this.findEmail(email_user);
                if(result == false){
                    editUser.email_user = email_user; // Adiciona o novo email ao objeto de edição
                }else{
                    return {error: "Email já cadastrado"};
                }
            }
            if(nome_user != undefined){
                editUser.nome_user = nome_user; // Adiciona o novo nome ao objeto de edição
            }

            if(cargo_user != undefined){
                editUser.cargo_user = cargo_user; // Adiciona o novo cargo ao objeto de edição
            }

            try {
                await knex.update(editUser).table("tbl_users").where({id_user: id});
                return {success: "Usuário atualizado com sucesso"}; // Retorna mensagem de sucesso
            } catch (error) {
                console.log(error);
                return {error: "Erro ao atualizar usuário"};
            }

        }
    }

    async delete(id){ // Deleta um usuário pelo ID
        var user = await this.findById(id);
        if(user != undefined){
            try {
                await knex.delete().table("tbl_users").where({id_user: id});
                return {success: "Usuário deletado com sucesso"}; // Retorna mensagem de sucesso
            } catch (error) {
                console.log(error);
                return {error: "Erro ao deletar usuário"};
            }
        } else {
            return {error: "Usuário não encontrado"}; // Retorna mensagem de erro se o usuário não for encontrado
        }
    }

    async changePassword(id, newPassword, token){ // Altera a senha de um usuário
        var hash = await bcrypt.hash(newPassword, 10);
        await knex.update({senha_user: hash}).table("tbl_users").where({id_user: id});
        await PasswordToken.setUsed(token);
    }
}

module.exports = new User();
// O código acima define uma classe User que representa o modelo de usuário.