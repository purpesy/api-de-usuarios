var Servico = require("../models/Servico");

class ServicoController {
  async index(req, res) {
    var servicos = await Servico.findAll();
    if (!servicos || servicos.length === 0) {
      return res.status(404).json({ error: "Nenhum serviço encontrado" });
    } else {
      return res.status(200).json(servicos);
    }
  }

  async findServico(req, res) {
    var id = req.params.id;
    var servico = await Servico.findById(id);

    if (!servico) {
      return res.status(404).json({ error: "Serviço não encontrado" });
    } else {
      return res.status(200).json(servico);
    }
  }

  async create(req, res) {
    var { nome, preco, desc } = req.body;

    if (!nome || !preco) {
      return res.status(400).json({ error: "Nome ou preço inválidos" });
    }

    await Servico.new(nome, preco, desc);
    res.status(200).json({ mensagem: "Serviço criado com sucesso" });
  }

  async edit(req, res) {
    var id = req.params.id;
    var { nome, preco, desc } = req.body;

    var result = await Servico.updade(id, nome, preco, desc);

    if (result != undefined) {
      if (result.error) {
        return res.status(406).json({ error: result.error });
      } else {
        return res
          .status(200)
          .json({ mensagem: "Serviço editado com sucesso" });
      }
    } else {
      return res.status(406).json({ error: "Erro no servidor" });
    }
  }

  async delete(req, res) { // Método para deletar um usuário existente
      var id = req.params.id;
      var result = await Servico.delete(id);
  
      if (result != undefined) {
        if (result.error) {
          return res.status(406).json({ error: result.error });
        } else {
          return res
            .status(200)
            .json({ mensagem: "Serviço deletado com sucesso" });
        }
      } else {
        return res.status(406).json({ error: "Erro no servidor" });
      }
    }
}

module.exports = new ServicoController();
