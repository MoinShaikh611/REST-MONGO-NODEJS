const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    productName: {
        type:String,
        required:true
    },
    productPrice: {
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('Product',productSchema);
// Next Step is to use this schema in your Product Routes