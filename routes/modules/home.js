const express = require('express')
const router = express.Router()
const URL = require('../../models/url')
const shortened = require('../../models/shortened')

// GET homepage
router.get('/', (req, res) => {
  res.render('index')
})

// POST new url
router.post('/submit', (req, res) => {
  const { url } = req.body
  URL.findOne({ url })
    .then((url_check) => {
      if (url_check) {
        console.log('exist')
        res.redirect('/')
      } else {
        let url_end = shortened()
        URL.create({ url, url_shortened: `http://localhost:3000/${url_end}` })
        res.redirect(`/result/${url_end}`)
      }
    })
    .catch(error => console.log(error))
})

// export router module
module.exports = router