series = (app) => {
    app.get('/series',(req, res)=> {
    var seriesDAO = app.models.Series;  

    seriesDAO.lista()
      .then(resultado => {
        res.send(resultado)
      })
        .catch(erro => {
            console.log("erro" + erro)
            res.status(500).send(erro);
        })
    })
    app.post('/series', (req, res) => {
        const seriesDAO = app.models.Series;

        let serie = req.body;
        seriesDAO.insere(serie)
        .then(resultado => {
            const insertId = resultado.insertId;
            serie = { id:insertId,...serie }
            res.status(201).send(serie);
        })
        .catch(erro =>{
            console.log('erro ao inserir' + erro)
            res.status(500).send(erro)
        })
    }) 
    app.get('/series/:id', (req,res)=> {
        const id = req.params.id;
        
        const seriesDAO = app.models.Series;
        seriesDAO.buscaPorId(id)
            .then(serie =>{
                if(!serie) res.status(404).send({erro:'série não encontrada'})
                
                else{
                    res.send(serie);
                }
            })
            .catch(erro =>{
                console.log('erro ao buscar série')
                res.status(500).send({erro: 'erro ao buscar'})
            })
    })

    app.put('/series/:id',(req,res)=> {
        const id = req.params.id
        const serie = req.body
        serie.id = id

        seriesDAO = app.models.Series

        seriesDAO.atualiza(serie)
        .then(retorno =>{
            if(!retorno.affectedRows) {
                res.status(404).send({erro: 'Série não encontrada'})
                return
            }
            res.send(serie)
        })
        .catch(erro => res.status(500).send(erro))
    })

    app.delete('/series/:id',(req, res) =>{
        const id = req.params.id;
        
        const seriesDAO = app.models.Series;
        seriesDAO.delete(id) 
        .then(retorno =>{
            if(!retorno.affectedRows){
                res.status(404)
                return
            }
            res.status(204)    
        })
        .catch(erro => {
            res.status(500).send('erro ao deletar' + erro)
        })
    })
}



module.exports = series;