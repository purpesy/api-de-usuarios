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

    async findAgendamento(req, res){
        var id = req.params.id;
        var agendamento = await Agendamento.findById(id);
        if (agendamento != undefined) {
            return res.status(200).json(agendamento);
        } else {
            return res.status(404).json({ error: "Agendamento não encontrado" });
        }
    }
}

module.exports = new AgendamentoController();