const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json');

module.exports = (req,res, next)=>{
    // return res.status(401).send({erro: 'Não autorizado'})
    const authHeader = req.headers.authorization
    const jwt = require ('jsonwebtoken')
    const authConfig = require('../config/auth')
    if(!authHeader)
        return res.status(401).send({erro: "token não encontrado"})

        const parts = authHeader.split('.')
    if(!parts.lenght === 2) {
        return res.status(401).send({erro: "Token mal formatado"})

    const [ bearer, token] = parts
    jwt.verify(token, authConfig.secret, (erro, user)=>{
        if(erro) return res.status(401).send({erro: "token inválido"})
        
       req.userId = user.id;
       return next()
    })
    }
}