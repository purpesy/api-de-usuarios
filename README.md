# 🚀 API REST de Usuários

Uma API REST completa para gerenciamento de usuários com autenticação JWT, recuperação de senha e controle de permissões administrativas.

![Node.js](https://img.shields.io/badge/Node.js-14%2B-brightgreen)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Como Executar](#como-executar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Endpoints da API](#endpoints-da-api)
- [Middleware de Autenticação](#middleware-de-autenticação)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Sobre o Projeto

Esta API REST foi desenvolvida para gerenciar usuários com funcionalidades completas de CRUD, sistema de autenticação baseado em JWT (JSON Web Tokens), recuperação de senha e controle de permissões administrativas. O projeto utiliza Node.js com Express.js e MySQL como banco de dados.

## ✨ Funcionalidades

### 🔐 Autenticação e Autorização
- **Login de usuários** com validação de credenciais
- **Autenticação JWT** para proteger rotas
- **Middleware de autorização** para administradores
- **Controle de permissões** baseado em cargo (0: usuário comum, 1: administrador)

### 👥 Gerenciamento de Usuários
- **Listar todos os usuários** (somente administradores)
- **Buscar usuário específico** por ID (somente administradores)
- **Criar novos usuários** (somente administradores)
- **Editar informações** de usuários existentes (somente administradores)
- **Excluir usuários** (somente administradores)

### 🔒 Recuperação de Senha
- **Geração de tokens** para recuperação de senha
- **Validação de tokens** com controle de uso único
- **Alteração de senha** usando token válido

### 🛡️ Segurança
- **Criptografia de senhas** com bcrypt
- **Validação de email** duplicado
- **Tokens JWT** seguros
- **Middleware de autenticação** robusto

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL** - Banco de dados relacional
- **Knex.js** - Query builder para SQL

### Segurança e Autenticação
- **JWT (jsonwebtoken)** - Autenticação baseada em tokens
- **bcrypt** - Criptografia de senhas
- **bcryptjs** - Implementação JavaScript do bcrypt

### Outras Dependências
- **body-parser** - Parser para requisições HTTP
- **mysql2** - Driver MySQL para Node.js

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**
- **MySQL** (versão 5.7 ou superior)
- **Git**

## 🚀 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/purpesy/api-de-usuarios.git
cd api-de-usuarios
```

2. **Instale as dependências**
```bash
npm install
```

## 🗄️ Configuração do Banco de Dados

1. **Crie o banco de dados MySQL**
```sql
CREATE DATABASE db_apiusers;
USE db_apiusers;
```

2. **Crie a tabela de usuários**
```sql
CREATE TABLE tbl_users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    nome_user VARCHAR(255) NOT NULL,
    email_user VARCHAR(255) UNIQUE NOT NULL,
    senha_user VARCHAR(255) NOT NULL,
    cargo_user INT DEFAULT 0
);
```

3. **Crie a tabela de tokens de recuperação**
```sql
CREATE TABLE tbl_passwordtokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    used INT DEFAULT 0,
    FOREIGN KEY (id_user) REFERENCES tbl_users(id_user)
);
```

4. **Configure a conexão** (arquivo `database/connection.js`)
```javascript
// Ajuste as credenciais conforme necessário
host: 'localhost',
user: 'root',
password: 'sua_senha',
database: 'db_apiusers'
```

## ▶️ Como Executar

1. **Inicie o servidor**
```bash
nodemon index.js
# ou
node index.js
```

2. **Verifique se está funcionando**
- O servidor estará rodando na porta `8686`
- Acesse: `http://localhost:8686`
- Você deve ver: "Hellow World! - Lucas Gabriel"

## 📁 Estrutura do Projeto

```
api-rest-de-usuarios/
├── controllers/           # Controladores da aplicação
│   ├── HomeController.js  # Controlador da página inicial
│   └── UserController.js  # Controlador de usuários
├── database/             # Configurações do banco de dados
│   └── connection.js     # Conexão com MySQL
├── middlewares/          # Middlewares da aplicação
│   └── AdminAuth.js      # Middleware de autenticação admin
├── models/              # Modelos de dados
│   ├── PasswordToken.js # Modelo para tokens de recuperação
│   └── User.js          # Modelo de usuários
├── routes/              # Definição das rotas
│   └── routes.js        # Arquivo principal de rotas
├── index.js             # Arquivo principal da aplicação
├── package.json         # Dependências e scripts
└── README.md           # Documentação do projeto
```

## 🌐 Endpoints da API

### 🏠 Rota Principal
- `GET /` - Página inicial da API

### 🔐 Autenticação
- `POST /login` - Fazer login e obter token JWT

### 👥 Usuários (Requer autenticação de administrador)
- `GET /user` - Listar todos os usuários
- `GET /user/:id` - Buscar usuário por ID
- `POST /user` - Criar novo usuário
- `PUT /user/:id` - Editar usuário
- `DELETE /user/:id` - Excluir usuário

### 🔒 Recuperação de Senha (Acesso público)
- `POST /recover-password` - Solicitar token de recuperação
- `POST /change-password` - Alterar senha com token

## 🛡️ Middleware de Autenticação

O middleware `AdminAuth.js` protege as rotas administrativas:

- **Verifica** a presença do token JWT no header Authorization
- **Valida** a assinatura do token
- **Confirma** se o usuário tem permissões de administrador (cargo = 1)
- **Bloqueia** o acesso para usuários não autorizados

### Formato do Header
```
Authorization: Bearer <seu_jwt_token>
```

## 🔧 Configurações de Segurança

- **JWT Secret**: Configurado em `controllers/UserController.js` e `middlewares/AdminAuth.js`
- **Criptografia**: Senhas são hasheadas com bcrypt (salt rounds: 10)
- **Validações**: Email único, campos obrigatórios, tokens de uso único

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `package.json` para mais detalhes.

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas, sinta-se à vontade para abrir uma issue no repositório.

---
