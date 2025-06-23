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
router.post("/user",AdminAuth, UserController.create); //esta chamando a função create do UserController
router.get("/user", AdminAuth, UserController.index); //esta chamando a função index do UserController
router.get("/user/:id",AdminAuth, UserController.findUser); //esta chamando a função findUser do UserController
router.put("/user/:id",AdminAuth, UserController.edit); //esta chamando a função edit do UserController
router.delete("/user/:id",AdminAuth, UserController.delete); //esta chamando a função delete do UserController
router.post("/recover-password", UserController.recoverPassword); //esta chamando a função recoverPassword do UserController
router.post("/change-password", UserController.changePassword); //esta chamando a função changePassword do UserController
router.post("/login", UserController.login); //esta chamando a função login do UserController
router.get("/servicos", ServicoController.index);

/**
 * @swagger
 * /servicos/{id}:
 *   get:
 *     summary: Buscar serviço por ID
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *     responses:
 *       200:
 *         description: Serviço encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servico'
 *       404:
 *         description: Serviço não encontrado
 */
router.get("/servicos/:id", ServicoController.findServico);

/**
 * @swagger
 * /servicos:
 *   post:
 *     summary: Criar novo serviço
 *     tags: [Serviços]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Servico'
 *           example:
 *             nome: "Consulta Médica"
 *             descricao: "Consulta médica geral"
 *             preco: 150.00
 *             disponivel: true
 *     responses:
 *       200:
 *         description: Serviço criado com sucesso
 */
router.post("/servicos", ServicoController.create);

/**
 * @swagger
 * /servicos/{id}:
 *   put:
 *     summary: Atualizar serviço
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Servico'
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
 */
router.put("/servicos/:id", ServicoController.edit);

/**
 * @swagger
 * /servicos/{id}:
 *   delete:
 *     summary: Deletar serviço
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do serviço
 *     responses:
 *       200:
 *         description: Serviço deletado com sucesso
 */
router.delete("/servicos/:id", ServicoController.delete);


module.exports = router;
