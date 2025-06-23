var knex = require("../database/connection.js");
class Agendamento {
  async findAll() {
    // Listar todos os agendamentos
    try {
      var result = knex("tbl_agendamento as a")
        .leftJoin("tbl_users as u", "a.id_user", "u.id_user")
        .leftJoin("tbl_servicos as s", "a.id_servico", "s.id_servico")
        .select(
          "a.id_agendamento",
          "a.obs_agendamento",
          "a.data_agendamento",
          "a.status_agendamento",
          "u.nome_user",
          "u.email_user",
          "s.nome_servico"
        );
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async findById(id) {
    // Buscar agendamento por ID
    try {
      var result =  await knex("tbl_agendamento as a")
        .leftJoin("tbl_users as u", "a.id_user", "u.id_user")
        .leftJoin("tbl_servicos as s", "a.id_servico", "s.id_servico")
        .select(
          "a.id_agendamento",
          "a.obs_agendamento",
          "a.data_agendamento",
          "a.status_agendamento",
          "u.nome_user",
          "u.email_user",
          "s.nome_servico"
        ).where({ id_agendamento: id });
      if (result.length > 0) {
        return result[0]; 
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null; // Retorna null em caso de erro
    }
  }

  async new(id_user, id_servico, data_agendamento, obs_agendamento) {
    try {
      await knex.insert({ id_user, id_servico, data_agendamento, obs_agendamento }).table("tbl_agendamento");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Agendamento();
