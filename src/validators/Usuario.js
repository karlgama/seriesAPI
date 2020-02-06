const { check, body } = require('express-validator');
const UsuarioDAO = new (require('../models/Usuarios'))()


class UsuarioValidator {
    static validacoes() {
        return [
            check('nome').isLength({min:3, max:50})
            .withMessage('Deve ter de 3 a 50 caracters'),
            check('email').isEmail()
            .withMessage('Deve ser um e-mail válido'),
            check('senha').isLength({ min: 8, max: 100})
            .withMessage('A senha deve ser entre 8 e 15 caracteres'),
            body('email').custom(async email => {
                let usuario = await UsuarioDAO.buscarPorEmail(email)
                usuario = usuario[0]

                if(usuario)
                    return Promise.reject('E-mail já em está em uso')
               
            })
        ]
    }
}

module.exports = UsuarioValidator