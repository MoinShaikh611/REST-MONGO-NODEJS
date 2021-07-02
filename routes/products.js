const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) => {
    res.status(200).json({
        message:'listing all the products'
    });
});

router.post('/',(req,res,next) => {
    const product = {
        name:req.body.name , price:req.body.price
    }
    res.status(201).json({
        message:'posting all the products',
        createdBody:product
    });
});


router.get('/:productId',(req,res,next) => {
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message:'You discovered the special Id!',
            id:id
        })
    }else{
        res.status(200).json({
            message:'You Passed an Normal Id!',
            id:id
        })
    }
});


router.patch('/:productId',(req,res,next) => {
    const id = req.params.productId;
    res.status(200).json({
        message:`Updated Product! ${id}`
    })
});

router.delete('/:productId',(req,res,next) => {
    const id = req.params.productId;
    res.status(200).json({
        message:`Deleted Product! ${id}`
    })
});

module.exports = router;