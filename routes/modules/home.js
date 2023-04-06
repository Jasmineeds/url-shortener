const express = require('express')
const router = express.Router()
const URL = require('../../models/url')
const shortened = require('../../models/shortened')

// define homepage route
router.get('/', (req, res) => {
  res.render('index')
})

// post new url
router.post('/submit', (req, res) => {
  const { url } = req.body
  URL.findOne({ url })
    .then((url_check) => {
      if (url_check) {
        console.log('exist')
        res.redirect('/')
      } else {
        URL.create({ url, url_shortened: `http://localhost:3000/${shortened()}` })
        res.redirect('/')
      }
    })
    .catch(error => console.log(error))
})

// export router module
module.exports = router