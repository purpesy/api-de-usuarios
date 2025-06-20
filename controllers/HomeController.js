class HomeController{

    async index(req, res){ // é a função que será chamada quando a rota for acessada
        res.send("APP EXPRESS! - Guia do programador");
    }

}

module.exports = new HomeController();