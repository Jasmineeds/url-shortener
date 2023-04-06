const express = require('express')
const router = express.Router()

// define homepage route
router.get('/', (req, res) => {
  res.render('index')
})
// 匯出路由模組
module.exports = router