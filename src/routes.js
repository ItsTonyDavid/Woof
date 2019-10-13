const express = require('express')
const router = express.Router()
const cors = require('cors')

const user = require("./controllers/userController.js")
//const order = require("./controllers/orderController.js")
//const item = require("./controllers/itemController.js")
const auth = require("./middleware/auth.js");
const admin = require("./middleware/admin.js");

router.all('*', cors());

router.post('/createUser', user.createUser); //Create one user
router.post('/login/', user.login); //User login
router.post('/login/admin', user.isAdmin, user.login); //Admin login
router.post('/logout', auth, user.logout); //User logout
router.post('/user/edit/:id', user.updateUser) //Edit user information

router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist... But at least you have internet conecction!'
  })
})

module.exports = router
