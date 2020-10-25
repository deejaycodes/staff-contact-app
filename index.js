const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('./db/mongoose')
const router = require('./router/worker')
//i used express as my framework
const port = process.env.port || 3000;
app.use(bodyParser.json())
app.use('/staff',router)

 app.listen(port,()=> {
     console.log('server connected');
     
 });
 module.exports=app

