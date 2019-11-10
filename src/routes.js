const express = require('express')
const router = express.Router()
const cors = require('cors')

const auth = require("./middleware/auth.js");
const admin = require("./middleware/admin.js");

const user = require("./controllers/userController.js")
const item = require("./controllers/itemController.js")
//const order = require("./controllers/orderController.js")

router.all('*', cors());

router.post('/createUser', user.createUser); //Create one user
router.post('/login', user.login); //User login
router.post('/login/admin', user.isAdmin, user.login); //Admin login
router.post('/logout', auth, user.logout); //User logout
router.patch('/user/edit/:id', auth, user.updateUser); //Edit user information

router.post('/postItem', admin, item.createItem); //Post a new item.
router.delete('/deleteItem', admin, item.deleteItem); //delete a item with its name.
router.patch('/updateItemAdmin/:id', admin, item.updateItemAdmin) //Update item admin
router.patch('/updateItemUser/:id', auth, item.updateItemUser) //Update item user
router.get('/items', item.getAllItems)//Get all items
router.get('/itemsbygender', item.getItemsByGender) //Get items from a gender

router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist... But at least you have internet conecction!'
  })
})

module.exports = router
