var jwt = require('jsonwebtoken');

var jwtSecret = "senha123kkk"

module.exports = (req, res, next) => {
    const authToken = req.headers['authorization'];
    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        const token = bearer[1];
        try {
            var decoded = jwt.verify(token, jwtSecret)
            if (decoded.cargo != 1) {
                res.status(403).json({ error: "Você não tem permissão para acessar esta rota" });
                return;
            }else{
                next();
                return;
            }
            
        } catch (error) {
            res.status(403).json({ error: "Token inválido" });
            return;
        }

    }else{
        res.status(403).json({ error: "Token não informado" });
        return;
    }
}