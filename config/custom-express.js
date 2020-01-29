const express = require ('express');
const app = express();
const consign = require('consign');
const bodyParser = require('body-parser');
const customExpress = () => {
    //para requisições via json
    app.use(bodyParser.json())
    
    
    //injeção de dependencias com consign
    consign()
        .include ('controllers')
        .include('models')
        .into(app)

        return app
    }
module.exports = customExpress()
