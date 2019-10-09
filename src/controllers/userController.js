const User = require('../models/userModel.js');

const createUser = function(req, res){
  const user = new User(req.body)
  user.save().then(function() {
    res.send(user)
  }).catch(function(error) {
      return res.status(400).send(error);
  });
}

const login = function(req, res) {
  User.findByCredentials(req.body.email, req.body.password).then(function(user){
    user.generateToken().then(function(token){
      return res.send({user, token});
    }).catch(function(error){
      return res.status(401).send({ error: error });
    })
  }).catch(function(error) {
    return res.status(401).send({ error: error });
  });
};

const isAdmin = function(req, res, next) {
  User.findByCredentials(req.body.email, req.body.password).then(function(user){
    if(user.admin){
      next();
    }
  }).catch(function(error) {
    return res.status(401).send({ error: error, msg: "is not admin" });
  });
};

const logout = function(req, res){
  req.user.tokens = req.user.tokens.filter(function(token){
    return token.token !== req.token;
  });
  req.user.save().then(function(){
    return res.send();
  }).catch(function(error){
    return res.status(500).send({error: error})
  });
}

module.exports = {
  createUser: createUser,
  login: login,
  logout: logout,
  isAdmin: isAdmin
};
