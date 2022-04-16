const express = require('express')
const app = express()
const bodyparser = require('body-parser');
const  authRoutes = require('./api/routes/auth')

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

const DB = require('./db')
DB.init()
app.use('/user', authRoutes)

app.listen(8000, () => console.log('server is running'))