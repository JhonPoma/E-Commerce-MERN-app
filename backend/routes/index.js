
import express from 'express'    
import userSignUpController from '../controller/userSignUP.js'
import { userSingInController } from '../controller/userSignIn.js'

const router = express.Router()

router.post("/signup", userSignUpController)

router.post("/signin", userSingInController)

export {
    router
}