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
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    },
    size: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
