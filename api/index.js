import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'
dotenv.config()

import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

const __dirname=path.resolve();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("DataBase connect successfully");
})
.catch((err)=>{
    console.log(err);
})

const app=express();
app.use(express.json());
app.use(cookieParser())

app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

app.listen(3000,()=>{
    console.log("Server listening on port 3000");
})

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})