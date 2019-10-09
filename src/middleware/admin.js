const jwt = require('jsonwebtoken')
const User = require('../models/userModel.js')

if ( process.env.NODE_ENV === 'production') {
    var secret = process.env.secret
} else {
    const config = require('../config')
    var secret = config.secret
}

const admin = function(req, res, next){
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, secret)
        User.findOne({ _id: decoded._id, 'tokens.token': token}).then(function(user){
            if(!user){
                throw new Error()
            }
            if(user.admin){
              req.token = token
              req.user = user
              next();
            }
            else{
              throw new Error()
            }
        }).catch(function(error){
            console.log(req);
            res.status(401).send({ error: 'Required admin authentication.'})
        })
    } catch(e){
      console.log(req);
        res.status(401).send({ error: 'Required admin authentication.'})
    }
}

module.exports = admin
