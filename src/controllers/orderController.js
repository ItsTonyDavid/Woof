const Order = require('../models/orderModel.js')

const createOrder = function(req, res){
    const order = new Order(req.body)
    order.save().then(function(){
        res.send(order)
    }).catch(function(error){
        return res.status(400).send(error);
    })
}

const getOrders = function(req, res){
    const user = req.body.user
    Order.find({ user: `${user}` }, function(err, orders){
        if(!orders){
            return res.status(404).send()
        }
        res.send(orders)
    })
}

const getAllOrders = function(req, res){
    Order.find({}, function(err, orders){
        if(!orders){
            return res.status(404).send()
        }
        res.send(orders)
    })
}

const updateOrders = function(req, res){
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['status']
    const isValidUpdate = updates.every( (update) => allowedUpdates.includes(update))
    if (!isValidUpdate){
        return res.status(400).send({
            error: 'Invalid update, only allowed udates: ' +  allowedUpdates
        })
    }
    Order.findByIdAndUpdate(_id, req.body).then(function(order){
        if(!order){
            return res.status(404).send()
        }
        return res.send(order)
    }).catch(function(error){
        res.status(500).send(error)
    })
}

module.exports = {
    createOrder: createOrder,
    getOrders: getOrders,
    getAllOrders: getAllOrders,
    updateOrders: updateOrders
}
