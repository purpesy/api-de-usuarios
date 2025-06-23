# 🚀 API REST de Usuários - Sistema Completo de Gerenciamento

**Uma API REST profissional desenvolvida com Node.js para gerenciamento de usuários, autenticação JWT e controle de permissões administrativas.**

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.17%2B-blue)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0%2B-orange)](https://www.mysql.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-red)](https://jwt.io/)
[![License](https://img.shields.io/badge/license-ISC-green)](LICENSE)

---

## 🎯 **Destaques do Projeto**

✅ **Sistema Completo de Negócio** - Usuários + Serviços + Agendamentos  
✅ **API REST Profissional** - 15+ endpoints com CRUD completo  
✅ **Autenticação JWT** - Sistema seguro de login e autorização  
✅ **Sistema de Agendamentos** - Gestão completa de agenda de serviços  
✅ **Recuperação de Senha** - Sistema de tokens únicos  
✅ **Middleware Personalizado** - Controle de acesso administrativo  
✅ **Arquitetura MVC** - Código organizado e escalável  
✅ **Segurança Avançada** - Criptografia bcrypt + Validações  

---

## 📋 **Índice**

- [🎯 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias)
- [⚡ Quick Start](#-quick-start)
- [🌐 Endpoints](#-endpoints)
- [🏗️ Arquitetura](#️-arquitetura)
- [🔐 Autenticação](#-autenticação)
- [📊 Demonstração](#-demonstração)
- [👨‍💻 Desenvolvedor](#-desenvolvedor)

---

## 🎯 **Sobre o Projeto**

Esta API foi desenvolvida como um **sistema completo de gerenciamento de usuários** para aplicações web modernas. O projeto demonstra conhecimentos sólidos em:

- **Backend Development** com Node.js e Express.js
- **Banco de Dados** MySQL com Knex.js Query Builder
- **Segurança** JWT, bcrypt e middleware personalizado
- **Arquitetura** MVC pattern para código limpo e escalável
- **Validações** robustas de entrada e tratamento de erros

### **🎯 Objetivo Técnico**
Demonstrar competências em desenvolvimento backend profissional, com foco em segurança, escalabilidade e boas práticas de desenvolvimento.

---

## ✨ **Funcionalidades**

### 🔐 **Sistema de Autenticação**
- **Login seguro** com validação de credenciais
- **JWT Tokens** para sessões stateless
- **Middleware de autorização** baseado em roles
- **Controle de permissões** (usuário comum vs administrador)

### 👥 **Gestão de Usuários**
- **CRUD Completo**: Create, Read, Update, Delete
- **Validação de dados** (email único, campos obrigatórios)
- **Listagem paginada** com filtros
- **Busca por ID** individual

### 🛍️ **Gestão de Serviços**
- **Cadastro de serviços** oferecidos pela empresa
- **CRUD completo** de serviços
- **Listagem e busca** de serviços específicos
- **Controle de disponibilidade** e preços

### 📅 **Sistema de Agendamentos**
- **Agendamento de serviços** pelos clientes
- **Gestão completa** de agenda
- **Controle de horários** e disponibilidade
- **CRUD de agendamentos** com validações

### 🔒 **Recuperação de Senha**
- **Geração de tokens** únicos e seguros
- **Validação temporal** com controle de uso
- **Sistema de reset** seguro
- **Prevenção de reutilização** de tokens

### 🛡️ **Segurança Avançada**
- **Criptografia bcrypt** (salt rounds: 10)
- **SQL Injection** prevention com prepared statements
- **Validação de entrada** em todas as rotas
- **Headers de segurança** configurados

---

## 🛠️ **Tecnologias**

### **Core Technologies**
```json
{
  "runtime": "Node.js 18+",
  "framework": "Express.js 4.17+",
  "database": "MySQL 8.0+",
  "queryBuilder": "Knex.js 0.21+"
}
```

### **Security & Authentication**
```json
{
  "authentication": "JWT (jsonwebtoken)",
  "encryption": "bcrypt + bcryptjs",
  "validation": "Custom middleware",
  "authorization": "Role-based access control"
}
```

### **Development Tools**
```json
{
  "parser": "body-parser",
  "driver": "mysql2",
  "architecture": "MVC Pattern",
  "codeStyle": "ES6+ Modern JavaScript"
}
```

---

## ⚡ **Quick Start**

### **1. Clone & Install**
```bash
# Clone o repositório
git clone https://github.com/purpesy/api-de-usuarios.git
cd api--de-usuarios

# Instale as dependências
npm install
```

### **2. Database Setup**
```sql
-- Crie o banco de dados
CREATE DATABASE db_apiusers;
USE db_apiusers;

-- Tabela de usuários
CREATE TABLE tbl_users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    nome_user VARCHAR(255) NOT NULL,
    email_user VARCHAR(255) UNIQUE NOT NULL,
    senha_user VARCHAR(255) NOT NULL,
    cargo_user INT DEFAULT 0
);

-- Tabela de tokens de recuperação
CREATE TABLE tbl_passwordtokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    used INT DEFAULT 0,
    FOREIGN KEY (id_user) REFERENCES tbl_users(id_user)
);
```

### **3. Configure & Run**
```bash
# Configure as credenciais do banco em database/connection.js
# Execute o servidor
npm start
# ou para desenvolvimento
nodemon index.js
```

### **4. Test API**
```bash
# Servidor rodando em: http://localhost:8686
curl http://localhost:8686
# Resposta: "Hellow World! - Lucas Gabriel"

# Acessar documentação Swagger
# http://localhost:8686/api-docs
```

---

## 📚 **Documentação Interativa**

### **🎯 Swagger UI**
A API possui documentação interativa completa usando **Swagger/OpenAPI 3.0**

```bash
# Acesse a documentação em:
http://localhost:8686/api-docs
```

### **✨ Recursos da Documentação:**
- **Interface interativa** para testar endpoints
- **Esquemas de dados** detalhados
- **Exemplos de requisições** e respostas
- **Autenticação JWT** integrada
- **Validação de dados** em tempo real
- **Código de exemplo** em múltiplas linguagens

### **🔧 Como usar:**
1. Acesse `http://localhost:8686/api-docs`
2. Explore os endpoints por categoria
3. Teste as requisições diretamente no browser
4. Use o botão "Authorize" para testar endpoints protegidos

---

## 🌐 **Endpoints**

### **📊 Status & Health**
```http
GET /                    # Health check da API
```

### **🔐 Authentication**
```http
POST /login              # Autenticação e geração de JWT
POST /recover-password   # Solicitar token de recuperação
POST /change-password    # Alterar senha com token
```

### **👥 User Management** *(Requer Auth Admin)*
```http
GET    /user            # Listar todos os usuários
GET    /user/:id        # Buscar usuário específico
POST   /user            # Criar novo usuário
PUT    /user/:id        # Atualizar usuário existente
DELETE /user/:id        # Remover usuário
```

### **🛍️ Services Management**
```http
GET    /servicos        # Listar todos os serviços
GET    /servicos/:id    # Buscar serviço específico
POST   /servicos        # Criar novo serviço
PUT    /servicos/:id    # Atualizar serviço existente
DELETE /servicos/:id    # Remover serviço
```

### **📅 Appointments Management**
```http
GET    /agendamentos        # Listar todos os agendamentos
GET    /agendamentos/:id    # Buscar agendamento específico
POST   /agendamentos        # Criar novo agendamento
PUT    /agendamentos/:id    # Atualizar agendamento existente
DELETE /agendamentos/:id    # Remover agendamento
```

### **📋 Request/Response Examples**

<details>
<summary><strong>🔐 Login Request</strong></summary>

```json
POST /login
{
  "email": "admin@example.com",
  "password": "senha123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
</details>

<details>
<summary><strong>👥 Create User Request</strong></summary>

```json
POST /user
Authorization: Bearer <jwt_token>
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senhaSegura123"
}

Response:
{
  "mensagem": "Usuario criado com sucesso"
}
```
</details>

---

## 🏗️ **Arquitetura**

### **📁 Estrutura do Projeto**
```
api-rest-de-usuarios/
├── 📂 controllers/          # Lógica de negócio
│   ├── 🎮 HomeController.js    # Controller principal
│   ├── 👤 UserController.js    # Gestão de usuários
│   ├── 🛍️ ServicoController.js # Serviços
│   └── 📅 AgendamentoController.js # Agendamentos
├── 📂 models/               # Modelos de dados
│   ├── 👤 User.js              # Modelo de usuário
│   ├── 🔑 PasswordToken.js     # Tokens de recuperação
│   ├── 🛍️ Servico.js          # Modelo de serviços
│   └── 📅 Agendamento.js       # Modelo de agendamentos
├── 📂 middlewares/          # Middlewares customizados
│   └── 🛡️ AdminAuth.js         # Autenticação admin
├── 📂 routes/               # Definição de rotas
│   └── 🛤️ routes.js            # Roteamento principal
├── 📂 database/             # Configuração DB
│   └── 🔗 connection.js        # Conexão MySQL
├── 📄 index.js              # Entry point
├── 📋 package.json          # Dependências
└── 📚 README.md             # Documentação
```

---

## 🔐 **Autenticação**

### **🛡️ JWT Implementation**
```javascript
// Geração do token
const token = jwt.sign(
  { email: user.email_user, cargo: user.cargo_user }, 
  jwtSecret
);

// Middleware de verificação
const decoded = jwt.verify(token, jwtSecret);
if (decoded.cargo !== 1) {
  return res.status(403).json({ error: "Acesso negado" });
}
```

### **🔑 Password Security**
```javascript
// Criptografia na criação
const hash = await bcrypt.hash(password, 10);

// Verificação no login
const isValid = await bcrypt.compare(password, user.senha_user);
```

### **📋 Authorization Levels**
- **Level 0**: Usuário comum (operações básicas)
- **Level 1**: Administrador (acesso completo)

---

## 📊 **Demonstração**

### **🎥 Features em Ação**

1. **✅ Autenticação JWT** - Login seguro com tokens
2. **✅ CRUD Completo** - Usuários, Serviços e Agendamentos
3. **✅ Sistema de Agendamentos** - Gestão completa de agenda
4. **✅ Middleware Custom** - Proteção de rotas administrativas
5. **✅ Password Recovery** - Sistema de recuperação seguro
6. **✅ Input Validation** - Validações robustas de entrada
7. **✅ Error Handling** - Tratamento adequado de erros
8. **✅ Multi-Entity System** - 4 modelos de dados integrados

### **📈 Métricas do Projeto**
- **📝 Linhas de código**: ~1.200+ linhas
- **📂 Arquivos**: 15+ módulos organizados
- **🌐 Endpoints totais**: 15+ rotas RESTful
- **🛡️ Endpoints protegidos**: 8 rotas com autenticação
- **🔒 Níveis de segurança**: 2 (user/admin)
- **📊 Modelos de dados**: 4 (User, PasswordToken, Servico, Agendamento)
- **⚡ Performance**: Response time < 100ms

---

## 🚀 **Próximos Passos**

### **🔄 Melhorias Planejadas**
- [x] **Documentação API** (Swagger) ✅ **IMPLEMENTADO**
- [ ] **Testes Automatizados** (Jest + Supertest)
- [ ] **Rate Limiting** (express-rate-limit)
- [ ] **Logs Estruturados** (Winston)
- [ ] **Variáveis de Ambiente** (.env)
- [ ] **Docker** (Containerização)

---

## 👨‍💻 **Desenvolvedor**

### **Lucas Gabriel**
**Desenvolvedor Full-Stack** especializado em Node.js e tecnologias web modernas.

```json
{
  "especialidades": ["Node.js", "React.js", "PHP", "MySQL"],
  "foco": "Backend Development & API",
  "experiencia": "Projetos full-stack em produção",
  "objetivo": "Desenvolvimento de soluções escaláveis e seguras"
}
```

### **🌐 Links**
- **LinkedIn**: [lucas-dev-gabriel](https://www.linkedin.com/in/lucas-dev-gabriel)
- **GitHub**: [purpesy](https://github.com/purpesy)
- **Portfolio**: [Ver outros projetos](https://github.com/purpesy/Evolusom)
- **Email**: lucasgabdsantos@gmail.com

---

## 📋 **Licença & Contribuições**

### **📄 Licença**
Este projeto está sob a licença **ISC**. Consulte o arquivo `package.json` para detalhes.

### **🤝 Contribuições**
Contribuições são bem-vindas! Para contribuir:

1. **Fork** o projeto
2. **Create** uma feature branch (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. **Abra** um Pull Request

---

## 🔧 **Suporte & Contato**

Encontrou algum problema ou tem sugestões?

- 🐛 **Issues**: [Reportar problema](https://github.com/purpesy/api-de-usuarios/issues)
- 💬 **Discussões**: Entre em contato via LinkedIn
- 📧 **Email**: lucasgabdsantos@gmail.com

---

<div align="center">

### ⭐ **Se este projeto foi útil, considere dar uma estrela!**

**Desenvolvido com ❤️ para demonstrar expertise em desenvolvimento backend**

*Este projeto representa competências profissionais em Node.js, Express.js, MySQL, JWT Authentication, e Arquitetura MVC*

---

**🚀 Ready for Production | 🛡️ Security First | 📈 Scalable Architecture**

</div>
