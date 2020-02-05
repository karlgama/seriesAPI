const baseQuery = require('./baseQuery');

class Series {
    
    lista() {
        return baseQuery('select * from series')
    }

    insere(serie) {
        return baseQuery('insert into series set ?', serie)
    }
    
    atualiza(serie) {
        return baseQuery('update series set ? where id = ?', [serie,serie.id])           
    }
    
    buscaPorId(id) {
        return baseQuery('SELECT * FROM series where id = ?',id)  
    }

    delete(id) {
        return baseQuery('DELETE FROM series where id = ?',id)    
    }
}

module.exports =  Series