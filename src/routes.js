const express = require('express')
const router = express.Router()
const cors = require('cors')

router.all('*', cors());

router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist... But at least you have internet conecction!'
  })
})

module.exports = router
