const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Product = require('../models/products');

router.get('/',(req,res,next) => {
    Product.find()
        .select('productName productPrice _id')
        .then((docs) => {
            const response = {
                count:docs.length,

                // we can also send some meta information in products which would help the client side 
                products:docs.map((data) => {
                    return {
                        productName:data.productName,
                        productPrice:data.productPrice,
                        _id:data._id,
                        request:{
                            method:"GET",
                            url:"http://localhost:3000/products/"+data._id
                        }
                    }
                })
            };
        res.status(200).json({message:'Listing all the Products',response})
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
        .then((result) => 
        res.status(201).json({
            message:'Product Created Successfully!',
            createdBody:{
                productName:result.productName,
                productPrice:result.productPrice,
                _id:result._id,
                request:{
                    method:'POST',
                    url:"http://localhost:3000/products/"+result._id
                }
            }
        }))
        .catch((err) => {console.log(err)});

  
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