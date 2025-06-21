var knex = require("../database/connection.js");
class Servico {
  async findAll() {
    // listar todos
    try {
      var result = await knex.select(["*"]).table("tbl_servicos");
      return result; // Retorna todos os serviços encontrados
    } catch (error) {
      console.log(error);
      return []; // Retorna um array vazio em caso de erro
    }
  }

  async findById(id) {
    // Buscar serviço por ID
    try {
      var result = await knex
        .select()
        .table("tbl_servicos")
        .where({ id_servico: id });
      if (result.length > 0) {
        return result[0]; // Retorna o primeiro serviço encontrado
      } else {
        return null; // Retorna null se nenhum serviço for encontrado
      }
    } catch (error) {
      console.log(error);
      return null; // Retorna null em caso de erro
    }
  }

  async new(nome_servico, preco_servico, desc_servico) {
    // Cria um novo serviço
    try {
      await knex
        .insert({ nome_servico, preco_servico, desc_servico })
        .table("tbl_servicos");
    } catch (error) {
      console.log(error);
    }
  }

  async updade(id, nome_servico, preco_servico, desc_servico) {
    try {
      var servico = await this.findById(id);
      if (servico != undefined) {
        var editServico = {};

        if (nome_servico != undefined) {
          var result = await this.findEmail(nome_servico);
          if (result == false) {
            editServico.nome_servico = nome_servico; // Adiciona o novo nome ao objeto de edição
          } else {
            return { error: "Nome já cadastrado" };
          }
        }
        if (preco_servico != undefined) {
          editServico.preco_servico = preco_servico; // Adiciona o novo preço ao objeto de edição
        }

        if (desc_servico != undefined) {
          editServico.desc_servico = desc_servico; // Adiciona a nova descrição ao objeto de edição
        }

        try {
          await knex.update(editServico).table("tbl_servicos").where({ id_servico: id });
          return { success: "Serviço atualizado com sucesso" }; // Retorna mensagem de sucesso
        } catch (error) {
          console.log(error);
          return { error: "Erro ao atualizar serviço" };
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id){
    var servico = await this.findById(id);
    if (servico != undefined) {
      try {
        await knex.delete().table("tbl_servicos").where({ id_servico: id });
        return { success: "Serviço deletado com sucesso" }; // Retorna mensagem de sucesso
      } catch (error) {
        console.log(error);
        return { error: "Erro ao deletar serviço" };
      }
    } else {
      return { error: "Serviço não encontrado" }; // Retorna mensagem de erro se o serviço não for encontrado
    }
  }
}

module.exports = new Servico(); // Exporta uma instância da classe Servico