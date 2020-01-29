const conexao =  require('../infra/conexao');

class Series {
    
    lista() {
        return new Promise((resolve, reject)=> {
            const sql = 'select * from series'
            conexao.query(sql, (erro, retorno)=> {
                if(erro)
                    reject('Erro ao consultar: ' + erro)

                else {
                    console.log('Foi!')
                    resolve(retorno)
                }
            })
        })
    }

    insere(serie) {
        return new Promise((resolve,reject)=> {
            const sql = 'insert into series set ?';
    
            conexao.query(sql, serie, (erro, retorno)=> {
                if(erro)
                    reject('erro ao inserir:' + erro)
                else 
                    resolve(retorno);   
            })
        })
    }

    buscaPorId(id) {
        return new Promise((resolve,reject)=>{
            const sql ='SELECT * FROM series where id = ?';

            conexao.query(sql,id, (erro, retorno) => {
                if(erro) reject('erro ao buscar: ' + erro )
                else {
                    resolve(retorno[0]);
                }
            })
        })
       
    }
    delete(id) {
        return new Promise((resolve, reject)=>{
            const sql = 'DELETE FROM series where id = ?';

            conexao.query(sql, id, (erro, retorno)=> {
                (erro) ? reject('erro ao deletar' + erro):resolve(retorno);
                
            })
        })
    }
    atualiza(serie) {
        return new Promise((resolve,reject)=> {
            const sql = 'update series set ? where id = ?';
    
            conexao.query(sql, [serie,serie.id], (erro, retorno)=> {
                if(erro)
                    reject('erro ao atualizar:' + erro)
                else 
                    resolve(retorno);   
            })
        })
    }
}

module.exports = new Series();