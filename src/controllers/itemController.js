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
  item = req.body.name
  Item.findOneAndRemove({ name: item }).then(function(itemres){
    res.send({item: "deleted"});
  }).catch(function(error){
    res.status(500).send(error)
  })
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

//findOneAndRemove({ _id: id }, ...)
