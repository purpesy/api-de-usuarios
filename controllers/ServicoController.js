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

    async create(req,res){
        var { nome, preco, desc } = req.body;

        if(!nome || !preco ){
            return res.status(400).json({error: "Nome ou preço inválidos"});
        }

        await Servico.new(nome, preco, desc);
        res.status(200).json({mensagem: "Serviço criado com sucesso"});
    }

}

module.exports = new ServicoController();