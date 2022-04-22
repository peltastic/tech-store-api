const express = require('express')
const app = express()
const cors = require("cors")
const bodyparser = require('body-parser');
const authRoutes = require('./api/routes/auth')
const cartRoutes = require('./api/routes/carts')
const productsRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const checkoutRoutes = require('./api/routes/checkout')
const DB = require('./db')
app.use(cors({
    origin: "http://localhost:3000"
}))

DB.init()
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use('/auth', authRoutes)
app.use('/products', productsRoutes)
app.use('/cart', cartRoutes)
app.use('/order', orderRoutes)
app.use('/checkout', checkoutRoutes)

app.listen(8000, () => console.log('server is running'))