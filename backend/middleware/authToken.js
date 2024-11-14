
import jwt, { decode } from "jsonwebtoken"


const authToken = async(req, res, next)=>{

    try {
        const token = req.cookies?.token //|| req.header
        console.log("tokenenenen : ",token)
        if(!token){
            return res.json({
                message : "usuario no inicia sesion",
                error : true,
                success : false
            })
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err,decoded)=>{
            console.log(err)
            console.log("decoded-", decoded)
            
            if(err){
                console.log("error de autenticacion",err)
            }

            req.userId = decoded?._id
            next() // Con esto pasamos al sgt "userDetalles" -> router.get('/user-detalles',authToken, userDetalles)
        } )

        console.log("token xd = ",token)

    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            data : [],
            error : true,
            success: false
        })
    }
}


export default authToken;