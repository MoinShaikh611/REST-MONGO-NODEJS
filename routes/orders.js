const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) => {
    res.status(200).json({
        message:'listing all the orders'
    });
});

router.post('/',(req,res,next) => {
    const order = {
        productId:req.body.productId , quantity:req.body.quantity
    }
    res.status(201).json({
        message:'posting all the orders',
        order:order
    });
});

router.get('/:orderId',(req,res,next) => {
    id = req.params.orderId;
    if(id === 'special'){
        res.status(200).json({message:'You discoverd Special Order id',id:id})
    }
    else{
        res.status(200).json({message:'You discovered Normal OrderedId',id:id});
    }
});

router.patch('/:orderId',(req,res,next) => {
    id = req.params.orderId;
    res.status(200).json({message:`Updated OrderId ${id}`});
});

router.delete('/:orderId',(req,res,next) => {
    id = req.params.orderId;
    res.status(200).json({message:`Delete OrderId ${id}`});
});



module.exports = router;