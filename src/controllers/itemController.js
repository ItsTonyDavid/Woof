const Item = require('../models/itemModel.js');

const createItem = function(req, res){
  const item = new Item(req.body)
  item.save().then(function() {
    res.send(item)
  }).catch(function(error) {
      return res.status(400).send(error);
  });
}

const deleteItem = function(req, res){

}

const updatePrice = function(req, res){

}

const updateQuantity = function(req, res){

}

const updateActive = function(req, res){

}

module.exports = {
  createItem: createItem,
  deleteItem: deleteItem
};
