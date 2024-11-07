
import express from 'express'    
import userSignUpController from '../controller/userSignUP.js'

const router = express.Router()

router.post("/signup", userSignUpController)



export {
    router
}