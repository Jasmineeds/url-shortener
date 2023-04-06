const express = require('express')
const router = express.Router()
const URL = require('../../models/url')

// post new url
router.post('/submit', (req, res) => {
  const url = req.body.url
  return URL.create({ url })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// export router module
module.exports = router