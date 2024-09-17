const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({credentials:true, origin: "http://localhost:5173"}));
app.use(cookieParser({}));

mongoose.connect(process.env.MONGO_URI, {
    dbName:'Mernchat'
}).then(()=>console.log('connected to the database'))
.catch((err)=>console.log(err))

app.use('/api/v1/user', userRoutes);

app.use(errorMiddleware);

app.listen(process.env.PORT, ()=>{
    console.log('Connected to the port');
});