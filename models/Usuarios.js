const conexao = require('../infra/conexao')

class Usuarios {
    
    insere(usuario) {
        return new Promise((resolve,reject)=> {
            const sql = 'INSERT INTO usuarios SET ?';
            console.log(usuario)
            conexao.query(sql, usuario, (erro, retorno)=> {
                if(erro)
                    reject('erro ao cadastrar:' + erro)
                else {
                    usuario = { id: retorno.insertId, ...usuario}
                    resolve(usuario) 
                } 
            })
        })
    }


    buscarPorEmail(email){
        return new Promise((resolve,reject) => {
            const sql = 'SELECT * FROM usuarios WHERE email = ?'

            conexao.query(sql, email,(erro,retorno) =>{
                if(erro) reject('erro ao consultar cadastro' + erro)
                else 
                    resolve(retorno[0])
            })
        })
    }
}
module.exports = new Usuarios()