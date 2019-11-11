const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

if ( process.env.NODE_ENV === 'production') {
    var secret = process.env.secret
} else {
    const config = require('../config')
    var secret = config.secret
}

var itemSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    unique: true
  },
  price:{
    type: Number,
    required: true
  },
  img:{
    data: Buffer,
    contentType: String
  },
  sizes:[{
    size: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  itemType:{
    hoodie: Boolean,
    shirt: Boolean,
    longsleeves: Boolean,
    accessorie: Boolean
  },
  gender:{
    male: Boolean,
    female: Boolean
  },
  active:{
    type: Boolean,
    required: true
  }
});

itemSchema.plugin(uniqueValidator, {message: 'Ya hay un item con ese nombre'})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
