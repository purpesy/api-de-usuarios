var Agendamento = require('../models/Agendamento');
class AgendamentoController{
    async index(req, res) {
        var agendamentos = await Agendamento.findAll();
        if (!agendamentos || agendamentos.length === 0) {
            return res.status(404).json({ error: "Nenhum agendamento encontrado" });
        } else {
            return res.status(200).json(agendamentos);
        }
    }
}

module.exports = new AgendamentoController();