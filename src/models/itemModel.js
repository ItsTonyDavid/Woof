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
  size:{
    type: String,
    required: true
  },
  itemType:{
    hoodie: Boolean,
    shirt: Boolean,
    cap: Boolean
  },
  sex:{
    male: Boolean,
    female: Boolean
  }
  quantity:{
    type: Number,
    required: true
  },
  active:{
    type: Boolean,
    required: true
  }
});

itemSchema.plugin(uniqueValidator, {message: 'Ya hay un item con ese nombre'})

itemSchema.statics.findByCredentials = function(name){
    return new Promise(function(resolve, reject){
      console.log("ALV AQUI ENTREEE \n", Item.findOne({name}));
        Item.findOne({name}).then(function(item){
            if(!item){
              return reject('Item does not exist')
            }
            else {
              return resolve(item)
            }
        })
    })
}

itemSchema.statics.findByType = function(type){
    return new Promise(function(resolve, reject){
        Item.findOne({type}).then(function(item){
            if(!item){
              return reject('Item does not exist')
            }
            else {
              return resolve(item)
            }
        })
    })
}

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
