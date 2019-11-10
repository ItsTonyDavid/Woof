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

const updateItemAdmin = function(req, res){
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ["price","sizes","active"]
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
  if (!isValidUpdate){
    return res.status(400).send({
      error: 'Invalid update, only allowed updates: ' + allowedUpdates
    })
  }
  Item.findByIdAndUpdate(_id, req.body).then(function(user){
    if(!user){
      return res.status(404).send()
    }
    return res.send(item)
  }).catch(function(error){
    res.status(500).send(error)
  })
}

const updateItemUser = function(req, res){
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ["sizes"]
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
  if (!isValidUpdate){
    return res.status(400).send({
      error: 'Invalid update, only allowed updates: ' + allowedUpdates
    })
  }
  Item.findByIdAndUpdate(_id, req.body).then(function(user){
    if(!user){
      return res.status(404).send()
    }
    return res.send(item)
  }).catch(function(error){
    res.status(500).send(error)
  })
}

const getAllItems = function(req, res){
  Item.find({}, function(err, items){
    if(!items){
      return res.status(404).send()
    }
    var itemMap = {}

    items.forEach(function(item){
      itemMap[item._id] = item;
    })
    return res.send(itemMap)
  })
}

const getItemsByGender = function(req, res){
  const gndr = Object.keys(req.body.gender)
  if (gndr == "male"){
    Item.find({ gender: { male: true }}, function(err, items){
      if(!items){
        return res.status(404).send()
      }
      res.send(items)
    })
  } 
  else if (gndr == "female"){
    Item.find({ gender: { female: true }}, function(err, items){
      if(!items){
        return res.status(404).send()
      }
      res.send(items)
    })
  }
}

module.exports = {
  createItem: createItem,
  deleteItem: deleteItem,
  updateItemAdmin: updateItemAdmin,
  updateItemUser: updateItemUser,
  getAllItems: getAllItems,
  getItemsByGender: getItemsByGender
};
