const express = require('express')
const router = express.Router()
const URL = require('../models/url')
const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}/`

// js utils
const randomID = require('../utils/randomID')
const id = require('../utils/id')

// GET homepage
router.get('/', (req, res) => {
  res.render('index')
})

// POST original url
router.post('/submit', (req, res) => {
  // if user submit nothing
  if (!req.body.url) return res.redirect('/')
  const { url } = req.body
  URL.findOne({ url })
    .then((url_check) => {
      if (url_check) {
        // generate same shortened url if previously-input url detected
        res.redirect(`/result/${id(url_check.url_shortened)}`)
      } else {
        let url_end = randomID()
        URL.create({ url, url_shortened: `${HOST}/${url_end}` })
        res.redirect(`/result/${url_end}`)
      }
    })
    .catch(error => console.log(error))
})

// GET shortened url
router.get('/result/:id', (req, res) => {
  const id = req.params.id
  URL.findOne({ url_shortened: { $regex: id } }, 'url url_shortened')
    .lean()
    .then(url => res.render('result', { url }))
    .catch(error => console.log(error))
})

// GET url website
router.get('/:id', (req, res) => {
  const id = req.params.id
  URL.findOne({ url_shortened: { $regex: id } }, 'url url_shortened')
    .lean()
    .then(url => res.redirect(url.url))
    .catch(error => console.log(error))
})

// export router module
module.exports = router