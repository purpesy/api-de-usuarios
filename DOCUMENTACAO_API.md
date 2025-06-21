# 📚 Documentação da API - Sistema de Usuários

Esta documentação fornece informações detalhadas sobre todos os endpoints disponíveis na API REST de Usuários.

## 🔗 Base URL
```
http://localhost:8686
```

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Tokens)** para autenticação. Para rotas protegidas, você deve incluir o token no header `Authorization`.

### Formato do Header de Autenticação
```
Authorization: Bearer <seu_jwt_token>
```

### Tipos de Permissão
- **Usuário Comum** (cargo = 0): Pode apenas fazer login e usar funções de recuperação de senha
- **Administrador** (cargo = 1): Tem acesso completo a todas as funcionalidades

---

## 📋 Endpoints

### 🏠 1. Página Inicial

#### `GET /`
Retorna mensagem de boas-vindas da API.

**Autenticação:** Não requerida

**Exemplo de Requisição:**
```http
GET /
Host: localhost:8686
```

**Exemplo de Resposta:**
```http
HTTP/1.1 200 OK
Content-Type: text/html

APP EXPRESS! - Guia do programador
```

---

### 🔐 2. Autenticação

#### `POST /login`
Realiza o login do usuário e retorna um token JWT.

**Autenticação:** Não requerida

**Parâmetros do Body:**
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| email | string | ✅ | Email do usuário |
| password | string | ✅ | Senha do usuário |

**Exemplo de Requisição:**
```http
POST /login
Host: localhost:8686
Content-Type: application/json

{
  "email": "admin@exemplo.com",
  "password": "minhasenha123"
}
```

**Exemplo de Resposta - Sucesso:**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Exemplo de Resposta - Erro:**
```http
HTTP/1.1 406 Not Acceptable
Content-Type: application/json

{
  "error": "Senha incorreta"
}
```

---

### 👥 3. Gerenciamento de Usuários

#### `GET /user`
Lista todos os usuários cadastrados no sistema.

**Autenticação:** ✅ Requerida (Administrador)

**Exemplo de Requisição:**
```http
GET /user
Host: localhost:8686
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Exemplo de Resposta - Sucesso:**
```http
HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id_user": 1,
    "nome_user": "João Silva",
    "email_user": "joao@exemplo.com",
    "cargo_user": 1
  }
]
```

#### `POST /user`
Cria um novo usuário no sistema.

**Autenticação:** ✅ Requerida (Administrador)

**Parâmetros do Body:**
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| name | string | ✅ | Nome completo do usuário |
| email | string | ✅ | Email único do usuário |
| password | string | ✅ | Senha do usuário |

**Exemplo de Requisição:**
```http
POST /user
Host: localhost:8686
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Carlos Silva",
  "email": "carlos@exemplo.com",
  "password": "senha123"
}
```

#### `PUT /user/:id`
Edita as informações de um usuário existente.

**Autenticação:** ✅ Requerida (Administrador)

#### `DELETE /user/:id`
Remove um usuário do sistema.

**Autenticação:** ✅ Requerida (Administrador)

---

### 🔒 4. Recuperação de Senha

#### `POST /recover-password`
Solicita um token para recuperação de senha.

**Autenticação:** Não requerida

#### `POST /change-password`
Altera a senha do usuário usando um token válido.

**Autenticação:** Não requerida

---

## 🧪 Testando a API com curl

```bash
# Login
curl -X POST http://localhost:8686/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@exemplo.com", "password": "senha123"}'

# Listar usuários
curl -X GET http://localhost:8686/user \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

**📧 Para suporte técnico, consulte o README.md** 