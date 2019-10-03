const mongoose = require('mongoose')

var orderSchema = new mongoose.Schema({
  totalPrice:{
    type: Number,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  date:{
    type: Date
  },
  status:{
    esperando: Boolean,
    enviado: Boolean,
    recibido: Boolean
  },
  products:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }],
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Order = mongoose.model('Order', itemSchema);

module.exports = Order;
