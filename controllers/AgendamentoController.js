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

    async create(req, res) {
        var { usuario, servico, data, observacao } = req.body;

        if (!usuario || !servico || !data) {
            return res.status(400).json({ error: "Dados inválidos para agendamento" });
        }

        await Agendamento.new(usuario, servico, data, observacao);
        res.status(200).json({ mensagem: "Agendamento criado com sucesso" });
    }
}

module.exports = new AgendamentoController();