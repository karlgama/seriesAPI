const express = require('express')
const app = express()
const authMidd = require('./middleware/auth')

/*app é uma instância do express e use
é uma função de app para utilizar middlewares */
app.use(express.json())

let allowCrossDomain = (req,res, next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','*')
    res.header('Access-Control-Allow-Methods','*')
    next()
}

app.use(allowCrossDomain)

const auth = require('./routes/authRoutes')
const series = require('./routes/seriesRoutes')

app.use('/auth', auth)
app.use(authMidd)
app.use('/series', series)

module.exports = app