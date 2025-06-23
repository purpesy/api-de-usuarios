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

    async findById(id) {
        // Buscar agendamento por ID
        try {
            var result = await knex.select().table("tbl_agendamentos").where({ id_agendamento: id });
            if (result.length > 0) {
                return result[0]; // Retorna o primeiro agendamento encontrado
            } else {
                return null; // Retorna null se nenhum agendamento for encontrado
            }
        } catch (error) {
            console.log(error);
            return null; // Retorna null em caso de erro
        }
    }
}

module.exports = new Agendamento();