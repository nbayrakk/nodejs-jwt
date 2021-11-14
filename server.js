const express = require('express')
const dotenv = require('dotenv');
const routers = require('./routers/index')
dotenv.config({
    path:'./config/env/config.env'
}) 
const app = express()

const PORT = process.env.PORT;
 
app.use(express.json());
app.use('/api',routers);
app.get('/', function (req, res) {
  res.send('Hello Worl1');
})
app.listen(PORT,()=> {
    console.log(`Server run this port:${PORT} `);
})
app.listen(3000);