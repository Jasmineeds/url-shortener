const db = require('../../config/mongoose')
const URL = require('../url')

db.once('open', () => {
  URL.create({ url: `http://123` })
  console.log('done')
})