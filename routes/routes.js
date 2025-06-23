var express = require("express");
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var ServicoController = require("../controllers/ServicoController");
var AgendamentoController = require("../controllers/AgendamentoController");
var AdminAuth = require("../middlewares/AdminAuth");

// define as rotas, sendo a principal a /
router.get("/", HomeController.index); //esta chamando a função index do HomeController
// **************************
//          USERS
// **************************
router.post("/user",AdminAuth, UserController.create); //esta chamando a função create do UserController
router.get("/user", AdminAuth, UserController.index); //esta chamando a função index do UserController
router.get("/user/:id",AdminAuth, UserController.findUser); //esta chamando a função findUser do UserController
router.put("/user/:id",AdminAuth, UserController.edit); //esta chamando a função edit do UserController
router.delete("/user/:id",AdminAuth, UserController.delete); //esta chamando a função delete do UserController
// **************************
//      LOGIN/PASSWORD
// **************************
router.post("/recover-password", UserController.recoverPassword); //esta chamando a função recoverPassword do UserController
router.post("/change-password", UserController.changePassword); //esta chamando a função changePassword do UserController
router.post("/login", UserController.login); //esta chamando a função login do UserController
// **************************
//          SERVICOS
// **************************
router.get("/servicos", ServicoController.index);
router.post("/servicos", ServicoController.create);
router.put("/servicos/:id", ServicoController.edit);
router.get("/servicos/:id", ServicoController.findServico);
router.delete("/servicos/:id", ServicoController.delete);
// **************************
//          AGENDAMENTO
// **************************


module.exports = router;
