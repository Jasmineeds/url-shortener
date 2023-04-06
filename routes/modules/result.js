const express = require('express')
const router = express.Router()
const URL = require('../../models/url')

// GET result
router.get('/:id', (req, res) => {
  const id = req.params.id
  URL.findOne({ url_shortened: { $regex: id } }, 'url url_shortened')
    .lean()
    .then(url => res.render('result', { url }))
    .catch(error => console.log(error))
})

// export router module
module.exports = router