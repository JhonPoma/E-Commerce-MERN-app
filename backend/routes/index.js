
import express from 'express'    
import userSignUpController from '../controller/userSignUP.js'
import { userSingInController } from '../controller/userSignIn.js'
import userDetalles from '../controller/userDetalles.js'
import authToken from '../middleware/authToken.js'

const router = express.Router()

router.post("/signup", userSignUpController)

router.post("/signin", userSingInController)

// Validamos primero si el usuario ya esta autenticado con su
// token, si lo esta veremos los detalles del usuario 
router.get('/user-detalles',authToken, userDetalles)

export {
    router
}