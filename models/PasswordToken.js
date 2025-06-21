var knex = require("../database/connection.js");
var User = require("./User.js");

class PasswordToken {
  async create(email) {
    // Método para criar um token de recuperação de senha
    var user = await User.findByEmail(email);
    if (user != undefined) {
      try {
        var token = Date.now();
        await knex
          .insert({
            id_user: user.id_user,
            used: 0,
            token: token, // para ser melhor deveria ser um token UUID
          })
          .table("tbl_passwordtokens");

        return { status: true, token: token };
      } catch (error) {
        console.log(error);
        return { status: false, error: error };
      }
    } else {
      return { status: false, error: "Usuário não encontrado" };
    }
  }

  async validade(token) {
    // Métodot para validar um token de recuperação de senha
    try {
      var result = await knex
        .select()
        .table("tbl_passwordtokens")
        .where({ token: token });
      if (result.length > 0) {
        var tk = result[0];
        if (tk.used) {
          return { status: false }; // Token válido, mas não usado
        } else {
          return { status: true, token: tk }; // Token válido e já usado
        }
      }
    } catch {
      console.log(error);
      return { status: false };
    }
  }

  async setUsed(token) {
    // Método para marcar um token como usado
    try {
      await knex.update({ used: 1 }).table("tbl_passwordtokens").where({ token: token });
      return { status: true };
    } catch (error) {
      console.log(error);
      return { status: false, error: error };
    }
  }
}

module.exports = new PasswordToken();
