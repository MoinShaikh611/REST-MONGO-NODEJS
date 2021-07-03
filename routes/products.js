const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Product = require('../models/products');

router.get('/',(req,res,next) => {
    Product.find()
        .then((docs) => {
            if(docs.length <= 0){
                res.status(404).json({'Not Found Error':'No Entries Found'})
            }else{
                res.status(200).json({message:'Listing all the Products',docs})
            }
        })
        .catch((err) => {
            res.status(500).json({message:'No Entries Found',error:err})
        })

});

router.post('/',(req,res,next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        productName:req.body.productName,
        productPrice:req.body.productPrice
    })

    product.save()
        .then((result) => {console.log(result)})
        .catch((err) => {console.log(err)});

    res.status(201).json({
        message:'posting the product',
        createdBody:product
    });
});

router.get('/:productName',(req,res,next) => {
    const name = req.params.productName;
    Product.find({productName:name})
        .then(doc => { 
          if(doc.length <= 0){
            res.status(404).json({error:'No Valid Entry Found'})
          }else{
            res.status(200).json(doc)
          } 
        })
        .catch(err =>{ console.log(err); res.status(500).json({error:err}); })
});

router.get('/:productId',(req,res,next) => {
    const id = req.params.productId;
    Product.findById(id)
        .then(doc => { 
            console.log(doc);
            return doc ? res.status(200).json(doc) : res.status(404).json({error:'No Valid Entry Found'})
        })
        .catch(err =>{ console.log(err); res.status(500).json({error:err}); })
});


router.patch('/:productId',(req,res,next) => {
    const id = req.params.productId;
    const updateOps ={};
    for (const ops of req.body){
        updateOps[ops.propertyName] = ops.value
    }
    Product.updateOne({_id : id},{$set:updateOps})
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message:`Updated Product! ${id}`
            })
        .catch((err)=>{
            res.status(500).json({
                error:err
            })
        })
        })

});

router.delete('/:productId',(req,res,next) => {
    const id = req.params.productId;
    Product.remove({ _id:id })
    .then((result) => {
        res.status(200).json(result) 
    })
    .catch((err) => {
        res.status(500).json({error:err})
    })
    
});

module.exports = router;