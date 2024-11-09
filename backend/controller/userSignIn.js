import { userModel } from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSingInController = async(req,res)=>{
    try {
        const{ email, password} = req.body
        if(!email){
            throw new Error("Porfavor proporciona un email")
        }
        if(!password){
            throw new Error("Porfavor proporciona un password")
        }

        // Comprobamos si nuestro usuario esta en la BBDD
        const usuario = await userModel.findOne({email})
        if(!usuario){
            throw new Error("Usuario no encontrado")
        }
        //corroboramos que el password exista en la bbdd
        const checkPassword = await bcrypt.compare(password, usuario.password)
        console.log("checkeando", checkPassword)

        if(checkPassword){
            
            const tokenData = {
                _id : usuario._id,
                email : usuario.email,
            }
            const token = await jwt.sign( tokenData ,process.env.TOKEN_SECRET_KEY ,{expiresIn:60*60})
            const tokenOption = {
                httpOnly : true,
                secure : true
            }
            res.cookie("token", token, tokenOption).json({
                message: "Login exitoso...",
                data : token,
                success : true,
                error : false
            })
        }else{
            throw new Error("Porfavor chequea tu password")
        }

    } catch (error) {
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }



}

export {
    userSingInController
}
//Como es un solo metodo , pude exportarlo por default
// export default userSingInController