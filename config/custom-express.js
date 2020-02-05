const express = require ('express');
const app = express();
const consign = require('consign');
const bodyParser = require('body-parser');
const customExpress = () => {
    //para requisições via json
    app.use(bodyParser.json())
    
    app.use((req,res, next)=>{
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
    })
    
    //injeção de dependencias com consign
    consign()
        .include ('controllers')
        .include('models')
        .into(app)

        return app
    }
module.exports = customExpress()
