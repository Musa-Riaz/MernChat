const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
    dbName:'Mernchat'
}).then(()=>console.log('connected to the database'))
.catch((err)=>console.log(err))

app.use('/api/v1/user', userRoutes);


app.listen(process.env.PORT, ()=>{
    console.log('Connected to the port');
});