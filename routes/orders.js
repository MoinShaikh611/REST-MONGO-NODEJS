const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Importing the Oder Model
const Order = require('../models/orders');

router.get('/',(req,res,next) => {
    Order.find()
    .select('_id ordered_product quantity')
    .then((data) => {
        res.status(200).json({
            count:data.length,
            orders:data.map((d) => {
                return {
                _id:d._id,
                ordered_product:d.ordered_product,
                quantity:d.quantity, 
                request:{
                    method:"GET",
                    url:'http://localhost:3000/orders/'+d._id
                }
            }
            })
        })
    })
    .catch((err) => {
        res.status(500).json(err)
    })
});

router.post('/',(req,res,next) => {
    const order = new Order({
        _id:mongoose.Types.ObjectId(),
        ordered_product:req.body.ordered_product,
        quantity:req.body.quantity
    });
    order.save()
    .then((result) => {
        console.log(result);
        res.status(201).json({
            message:'Order Stored Successfully!',
            createdOrder:{
                _id:result._id,
                ordered_product:result.ordered_product,
                quantity:result.quantity
            },
            request:{
                method:"POST",
                url:'http://localhost:3000/orders/'+result._id
            }
        });
    })
    .catch((err) => {
        res.status(400).json({error:err.message})
    });
});

router.get('/:orderId',(req,res,next) => {
    id = req.params.orderId;
    Order.findById(id)
    .then((order) => {
        if(!order){
            return res.status(404).json({
                message:'Order Not Found'
            });
        }
        res.status(200).json({order:order})
    }) 
    .catch((err) => {
        res.status(500).json({error:err.message})
    })
});


router.delete('/:orderId',(req,res,next) => {
    id = req.params.orderId;
    Order.deleteOne({_id:id})
    .then((order) => {
        if(!order._id){
            return res.status(404).json({
                message:'Order Not Found'
            });
        }
        res.status(200).json({message:'Order deleted id : '+id})
    }) 
    .catch((err) => {
        res.status(500).json({error:err.message})
    })
});



module.exports = router;