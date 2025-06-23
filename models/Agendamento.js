var knex = require("../database/connection.js");
class Agendamento {
    async findAll() {
        // Listar todos os agendamentos
        try {
            var result = await knex.select(["*"]).table("tbl_agendamentos").orderBy("data_agendamento", "desc");
            return result; // Retorna todos os agendamentos encontrados
        } catch (error) {
            console.log(error);
            return []; // Retorna um array vazio em caso de erro
        }
    }
}

module.exports = new Agendamento();