var User = require("../models/User");
// Importa o modelo User
class UserController {
  async index(req, res) {
    var users = await User.findAll();
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "Nenhum usuário encontrado" });
      // Se não encontrar usuários, retorna status 404 com mensagem de erro
    } else {
      return res.status(200).json(users);
      // Se encontrar usuários, retorna status 200 com a lista de usuários
    }
  }

  async findUser(req, res) {
    var id = req.params.id;
    var user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
      // Se não encontrar o usuário, retorna status 404 com mensagem de erro
    } else {
      return res.status(200).json(user);
      // Se encontrar o usuário, retorna status 200 com os dados do usuário
    }
  }

  async create(req, res) {
    var { name, email, password } = req.body;
    // está recebendo os dados do body da requisição

    if (!email || !password || !name) {
      // verifica se o email está vazio
      return res
        .status(400)
        .json({ error: "Email, senha ou nome estão invalidos" });
      return;
      // envia status 400 com mensagem de erro
    }

    var emailExists = await User.findEmail(email);

    if (emailExists) {
      // chama o método findEmail do modelo User para verificar se o email já existe
      return res.status(406).json({ error: "Email já cadastrado" });
      // envia status 406 com mensagem de erro
    }

    await User.new(email, password, name);
    // chama o método new do modelo User para criar um novo usuário, e salva o resultado na variável result
    // verifica se o resultado é verdadeiro
    res.status(200).json({ mensagem: "Usuario criado com sucesso" });
  }

  async edit(req, res) {
    var id = req.params.id;
    var { email, name, cargo } = req.body;

    var result = await User.update(id, email, name, cargo);

    if (result != undefined) {
      if (result.error) {
        return res.status(406).json({ error: result.error });
      } else {
        return res
          .status(200)
          .json({ mensagem: "Usuário editado com sucesso" });
      }
    } else {
      return res.status(406).json({ error: "Erro no servidor" });
    }
  }

  async delete(req, res) {
    var id = req.params.id;
    var result = await User.delete(id);

    if (result != undefined) {
      if (result.error) {
        return res.status(406).json({ error: result.error });
      } else {
        return res
          .status(200)
          .json({ mensagem: "Usuário deletado com sucesso" });
      }
    } else {
      return res.status(406).json({ error: "Erro no servidor" });
    }
  }
}

module.exports = new UserController();
// O código acima define um controlador de usuário com dois métodos: index e create.
