const { check, validationResult } = require('express-validator')

autenticacao = (app) => {
    app.post('/registrar',
        [
            check('nome').isLength({min:3, max:50})
        ],

        (req,res)=> {
        const erros = validationResult(req)

        if(!erros.isEmpty()) {
            res.status(400).send(erros)
            return
        }

        const usuario = req.body

        usuarioDAO = app.models.Usuarios
        
        usuarioDAO.insere(usuario)
            .then(usuario => res.status(201).send(usuario))
            .catch(erro => res.status(500).send(erro))
    
    })
}

module.exports = autenticacao