const express = require('express')
const app = express()
const bodyparser = require('body-parser');
const  authRoutes = require('./api/routes/auth')
const DB = require('./db')

DB.init()
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use('/auth', authRoutes)

app.listen(8000, () => console.log('server is running'))