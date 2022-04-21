const express = require('express')
const app = express()
const bodyparser = require('body-parser');
const authRoutes = require('./api/routes/auth')
const cartRoutes = require('./api/routes/auth')
const productsRoutes = require('./api/routes/products')
const DB = require('./db')

DB.init()
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use('/auth', authRoutes)
app.use('/products', productsRoutes)
app.use('/cart', cartRoutes)

app.listen(8000, () => console.log('server is running'))