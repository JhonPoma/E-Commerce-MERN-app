
import express from "express";
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'


const app = express()
app.use(cors())

const PORT = 8888 || process.env.PORT

connectDB().then(()=>{
    
    app.listen(PORT, ()=>{
        console.log(`Server is running...`)
    })
})