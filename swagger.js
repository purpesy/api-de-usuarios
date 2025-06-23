const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST - Sistema Completo de Gerenciamento',
      version: '1.0.0',
      description: `
        **Sistema profissional desenvolvido com Node.js**
        
        Este projeto demonstra competências avançadas em:
        - 🔐 **Autenticação JWT** com middleware personalizado
        - 👥 **Gestão de Usuários** com controle de permissões
        - 🛍️ **Gestão de Serviços** com CRUD completo
        - 📅 **Sistema de Agendamentos** com validações
        - 🔒 **Recuperação de Senha** com tokens seguros
        - 🏗️ **Arquitetura MVC** organizada e escalável
        
        **Desenvolvido por:** Lucas Gabriel - Desenvolvedor Full-Stack
      `,
      contact: {
        name: 'Lucas Gabriel',
        email: 'lucasgabdsantos@gmail.com',
        url: 'https://linkedin.com/in/lucas-dev-gabriel'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: 'http://localhost:8686',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT obtido através do endpoint /login'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id_user: {
              type: 'integer',
              description: 'ID único do usuário',
              example: 1
            },
            nome_user: {
              type: 'string',
              description: 'Nome completo do usuário',
              example: 'João Silva'
            },
            email_user: {
              type: 'string',
              format: 'email',
              description: 'Email único do usuário',
              example: 'joao@example.com'
            },
            cargo_user: {
              type: 'integer',
              enum: [0, 1],
              description: 'Cargo do usuário (0: comum, 1: admin)',
              example: 0
            }
          }
        },
        UserCreate: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              description: 'Nome completo do usuário',
              example: 'Maria Santos'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email único do usuário',
              example: 'maria@example.com'
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'Senha do usuário (mínimo 6 caracteres)',
              example: 'senha123'
            },
            cargo: {
              type: 'integer',
              enum: [0, 1],
              description: 'Cargo do usuário (0: comum, 1: admin)',
              example: 0
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
              example: 'admin@example.com'
            },
            password: {
              type: 'string',
              description: 'Senha do usuário',
              example: 'admin123'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'Token JWT para autenticação',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'Email não encontrado'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            mensagem: {
              type: 'string',
              description: 'Mensagem de sucesso',
              example: 'Operação realizada com sucesso'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Health Check',
        description: '🏥 Verificação de status da API'
      },
      {
        name: 'Autenticação',
        description: '🔐 Sistema de login, logout e recuperação de senha'
      },
      {
        name: 'Usuários',
        description: '👥 Gestão completa de usuários (CRUD + Permissões)'
      },
      {
        name: 'Serviços',
        description: '🛍️ Gestão de serviços oferecidos pela empresa'
      },
      {
        name: 'Agendamentos',
        description: '📅 Sistema completo de agendamento de serviços'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs; 