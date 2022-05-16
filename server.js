const express = require('express')
const app = express()
const cors = require("cors")
app.use(cors())
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const authRoutes = require('./api/routes/auth')
const cartRoutes = require('./api/routes/carts')
const productsRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const checkoutRoutes = require('./api/routes/checkout')
dotenv.config()
const DB = require('./db')

DB.init()
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/auth', authRoutes)
app.use('/products', productsRoutes)
app.use('/cart', cartRoutes)
app.use('/order', orderRoutes)
app.use('/checkout', checkoutRoutes)
app.get('/test', function(req, res){
    res.status(200).json({message: "testissng!!!!"})
})

app.listen(process.env.PORT || 8000, () => console.log('server is running'))