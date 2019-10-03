const mongoose = require('mongoose')

var itemSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  //imagen
  size:{
    type: String,
    required: true
  },
  itemType:{
    hoodie: Boolean,
    shirt: Boolean,
    cap: Boolean
  },
  quantity:{
    type: Number,
    required: true
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
