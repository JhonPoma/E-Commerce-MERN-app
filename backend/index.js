
import express from "express";
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import {router} from './routes/index.js'

import cookieParser from "cookie-parser";

const app = express()

/* Agregamos los parametros origin y credentiasl para 
seguridad y compatibilidad entre nuestro frontend y backend.
origin para permitir únicamente solicitudes desde el dominio de nuestro frontend.
credentials para que el navegador incluya automáticamente cookies en cada solicitud*/
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api',router)

const PORT = 8888 || process.env.PORT

connectDB().then(()=>{
    
    app.listen(PORT, ()=>{
        console.log(`Server is running...`)
    })
})