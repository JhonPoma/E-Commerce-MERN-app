
import { userModel } from "../models/userModel.js"

const userDetalles = async (req, res)=>{

    try {
        
        console.log("usairio ID : ", req.userId)
        const user = await userModel.findById(req.userId)

        res.status(200).json({
            data : user,
            error : false,
            success : true,
            message : "Detalles del Usuario"
        })
        console.log("usuario", user)
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export default userDetalles;