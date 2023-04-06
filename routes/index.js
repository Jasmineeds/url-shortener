const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const urls = require('./modules/urls')

router.use('/', home)

// export router module
module.exports = router