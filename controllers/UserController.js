var User = require("../models/User");
var PasswordToken = require("../models/PasswordToken");
var jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');

var jwtSecret = "senha123kkk"

// Importa o modelo User
class UserController {
  async index(req, res) { // Método para listar todos os usuários
    var users = await User.findAll();
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "Nenhum usuário encontrado" });
      // Se não encontrar usuários, retorna status 404 com mensagem de erro
    } else {
      return res.status(200).json(users);
      // Se encontrar usuários, retorna status 200 com a lista de usuários
    }
  }

  async findUser(req, res) { // Método para encontrar um usuário por ID
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

  async create(req, res) { // Método para criar um novo usuário
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

  async edit(req, res) { // Método para editar um usuário existente
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

  async delete(req, res) { // Método para deletar um usuário existente
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

  async recoverPassword(req, res) { // Método para recuperar a senha de um usuário
    var { email } = req.body;
    var result = await PasswordToken.create(email);

    if (result.status) {
      res.status(200);  
      res.send("" + result.token);
      // Se o token for criado com sucesso, retorna status 200 com mensagem de sucesso
    } else {
      return res.status(406).json({ error: result.error });
      // Se houver erro, retorna status 406 com mensagem de erro
    }
  }

  async changePassword(req, res) { // Método para alterar a senha de um usuário
    var token = req.body.token;
    var password = req.body.password;
    
    var isTokenValid = await PasswordToken.validade(token);
    if(isTokenValid.status){
        await User.changePassword(isTokenValid.token.id_user, password, isTokenValid.token.token);
        return res.status(200).json({ mensagem: "Senha alterada com sucesso" });
    }else{
        return res.status(406).json({ error: "Token inválido" });
    }
}

  async login(req,res){
    var { email, password } = req.body;
    var user = await User.findByEmail(email);
    if(user != undefined){
        var resultado = await bcrypt.compare(password, user.senha_user);
        if(resultado){
            var token = jwt.sign({ email: user.email_user, cargo: user.cargo_user }, jwtSecret);
            res.status(200);
            res.send({token:token});
        }else{
            return res.status(406).json({ error: "Senha incorreta" });
        }

    }else{
        return res.status(406).json({ error: "Usuário não encontrado" });
    }
  }
}

module.exports = new UserController();
// O código acima define um controlador de usuário com dois métodos: index e create.




// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1Y2FzMTIzQGdtYWlsLmNvbSIsImNhcmdvIjowLCJpYXQiOjE3NTA0NjUzODJ9.ZC4L4GE0-rVP91CT90XZZxp-U_vegSaajJLF1z7Lk6I