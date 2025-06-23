var bodyParser = require('body-parser') // receber dados via json
var express = require("express")
var swaggerUi = require('swagger-ui-express');
var swaggerSpecs = require('./swagger');
var app = express()
var router = require("./routes/routes")
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "API REST - Documentação",
    customfavIcon: "/assets/favicon.ico"
}));

app.use("/",router); // arquivo de rotas

app.listen(8686,() => {
    console.log("🚀 Servidor rodando na porta 8686")
    console.log("📚 Documentação disponível em: http://localhost:8686/api-docs")
});
