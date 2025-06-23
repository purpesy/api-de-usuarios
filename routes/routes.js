var express = require("express");
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var ServicoController = require("../controllers/ServicoController");
var AgendamentoController = require("../controllers/AgendamentoController");
var AdminAuth = require("../middlewares/AdminAuth");

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check da API
 *     tags: [Health Check]
 *     responses:
 *       200:
 *         description: API funcionando corretamente
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Hello World! - Lucas Gabriel"
 */
router.get("/", HomeController.index);

// **************************
//      LOGIN/PASSWORD
// **************************

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autenticação de usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             email: "admin@example.com"
 *             password: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       406:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/login", UserController.login);

/**
 * @swagger
 * /recover-password:
 *   post:
 *     summary: Solicitar recuperação de senha
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *           example:
 *             email: "usuario@example.com"
 *     responses:
 *       200:
 *         description: Token de recuperação gerado
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               description: Token de recuperação
 *       406:
 *         description: Email não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/recover-password", UserController.recoverPassword);

/**
 * @swagger
 * /change-password:
 *   post:
 *     summary: Alterar senha com token
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de recuperação
 *               password:
 *                 type: string
 *                 description: Nova senha
 *           example:
 *             token: "abc123def456"
 *             password: "novaSenha123"
 *     responses:
 *       200:
 *         description: Senha alterada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       406:
 *         description: Token inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/change-password", UserController.changePassword);

// **************************
//          USERS
// **************************

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Listar todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Nenhum usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/user", UserController.index);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Buscar usuário por ID
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Acesso negado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/user/:id", AdminAuth, UserController.findUser);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Criar novo usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *           example:
 *             name: "João Silva"
 *             email: "joao@example.com"
 *             password: "senha123"
 *             cargo: 0
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       406:
 *         description: Email já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/user", AdminAuth, UserController.create);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Atualizar usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               cargo:
 *                 type: integer
 *                 enum: [0, 1]
 *           example:
 *             name: "João Silva Updated"
 *             email: "joao.updated@example.com"
 *             cargo: 1
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       406:
 *         description: Erro na atualização
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/user/:id", AdminAuth, UserController.edit);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Deletar usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       406:
 *         description: Erro na exclusão
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/user/:id", AdminAuth, UserController.delete);

// **************************
//          SERVICOS
// **************************

/**
 * @swagger
 * /servicos:
 *   get:
 *     summary: Listar todos os serviços
 *     tags: [Serviços]
 *     responses:
 *       200:
 *         description: Lista de serviços
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Servico'
 */
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

// **************************
//          AGENDAMENTO
// **************************

/**
 * @swagger
 * /agendamentos:
 *   get:
 *     summary: Listar todos os agendamentos
 *     tags: [Agendamentos]
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agendamento'
 */
router.get("/agendamentos", AgendamentoController.index);

/**
 * @swagger
 * /agendamentos/{id}:
 *   get:
 *     summary: Buscar agendamento por ID
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento
 *     responses:
 *       200:
 *         description: Agendamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agendamento'
 *       404:
 *         description: Agendamento não encontrado
 */
router.get("/agendamentos/:id", AgendamentoController.findAgendamento);

/**
 * @swagger
 * /agendamentos:
 *   post:
 *     summary: Criar novo agendamento
 *     tags: [Agendamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agendamento'
 *           example:
 *             usuario_id: 1
 *             servico_id: 1
 *             data_agendamento: "2024-07-15T14:30:00Z"
 *             status: "agendado"
 *     responses:
 *       200:
 *         description: Agendamento criado com sucesso
 */
router.post("/agendamentos", AgendamentoController.create);

/**
 * @swagger
 * /agendamentos/{id}:
 *   put:
 *     summary: Atualizar agendamento
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agendamento'
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
 */
router.put("/agendamentos/:id", AgendamentoController.edit);

/**
 * @swagger
 * /agendamentos/{id}:
 *   delete:
 *     summary: Deletar agendamento
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento
 *     responses:
 *       200:
 *         description: Agendamento deletado com sucesso
 */
router.delete("/agendamentos/:id", AgendamentoController.delete);

module.exports = router;
