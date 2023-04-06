const express = require('express')
const router = express.Router()
const URL = require('../../models/url')
const shortened = require('../../models/shortened')
const host = 'http://localhost:3000'

// GET homepage
router.get('/', (req, res) => {
  res.render('index')
})

// POST new url
router.post('/submit', (req, res) => {
  // unfinished: 若使用者沒有輸入內容，就按下了送出鈕，需要防止表單送出並提示使用者
  const { url } = req.body
  URL.findOne({ url })
    .then((url_check) => {
      if (url_check) {
        console.log('exist')
        res.redirect('/')
        // unfinished: 輸入相同網址時，產生一樣的縮址
      } else {
        let url_end = shortened()
        URL.create({ url, url_shortened: `${host}/${url_end}` })
        res.redirect(`/result/${url_end}`)
      }
    })
    .catch(error => console.log(error))
})

// GET existed url
router.get('/:id', (req, res) => {
  const id = req.params.id
  URL.findOne({ url_shortened: { $regex: id } }, 'url url_shortened')
    .lean()
    .then(url => res.redirect(url.url))
})

// export router module
module.exports = router