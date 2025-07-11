const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDatabase = require('./config/connectDatabase');
dotenv.config({path : path.join(__dirname, 'config', 'config.env')})

const products = require('./routes/product');
const orders = require('./routes/order');

connectDatabase();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use('/api/v1/',products);
app.use('/api/v1/',orders); 


app.listen(port,()=>{ 
    console.log(`Server Listening to port ${port} in ${process.env.NODE_ENV}`);
});