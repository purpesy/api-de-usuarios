var Servico = require("../models/Servico");

class ServicoController {
    async index(req, res){
        var servicos = await Servico.findAll();
        if(!servicos || servicos.length === 0){
            return res.status(404).json({error: "Nenhum serviço encontrado"});
        } else {
            return res.status(200).json(servicos);
        }
    }

}

module.exports = new ServicoController();