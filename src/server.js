const express = require('express')
const app = express()

app.use(express.json())

let allowCrossDomain = (req,res, next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','*')
    next()
}

app.use(allowCrossDomain)

const auth = require('./routes/authRoutes')
const series = require('./routes/seriesRoutes')

app.use('/auth', auth)
app.use('/series', series)

module.exports = app