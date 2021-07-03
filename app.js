const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const productRoute = require('./routes/products');
const orderRoute = require('./routes/orders');


require('dotenv').config()
// for showing the request and response console
app.use(morgan('tiny'));

// extended true allows us to pass rich data in it
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// For Calling Routes for different apis
app.use('/products',productRoute)
app.use('/orders',orderRoute)

// Error Handling:
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((err,req,res,next) =>{
    res.status(err.status || 500);
    res.json({error:{
        message:err.message
    }})
});

// CORS:
app.use((req,res,next) => {
    // allowing origin to specific port like this https://www.google.com and for all we use star "*"
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type, Accept ,Authorization');
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,PATCH,POST,GET,DELETE');
        return res.status(200).json({})
    }

})

// Database:
connection_uri = process.env.DB_URI
mongoose.connect(connection_uri,{useNewUrlParser: true,useUnifiedTopology:true },() =>{
    console.log('MongoDB Atlas Connected!');
})

module.exports = app;