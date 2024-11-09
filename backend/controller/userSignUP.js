
import {userModel} from '../models/userModel.js'

/*  De la documentacion de Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';     */

import bcrypt, { hashSync } from 'bcrypt'

const userSignUpController = async(req,res)=>{
    try {
        const{email, password, name} = req.body

        if(!email){
            throw new Error("Porfavor proporciona un email")
        }
        if(!password){
            throw new Error("Porfavor proporciona un password")
        }
        if(!name){
            throw new Error("Porfavor proporciona un name")
        }

        const saltRounds = bcrypt.genSaltSync(10)   
        const hashPassword = await bcrypt.hashSync(password,saltRounds)
        if(!hashPassword){
            throw new Error('Algo anda mal...')
        }

        const payload = {
            ...req.body,
            role : 'GENERAL',
            password : hashPassword
        }

        const userData = userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "Usuario creado exitosamente...!!"
        })


    } catch (error) {
        res.json({
            message : "Correo ya existe :'v" || error,
            error : true,
            success : false
        })
    }
}


export default userSignUpController