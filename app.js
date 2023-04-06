const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
require('./config/mongoose')

const port = 3000

// set hbs
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// set routes
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, (req, res) => {
  console.log(`Listening on http://localhost:${port}`)
})