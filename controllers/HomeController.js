class HomeController{

    async index(req, res){ // é a função que será chamada quando a rota for acessada
        res.send("Hellow World! - Lucas Gabriel");
    }

}

module.exports = new HomeController();