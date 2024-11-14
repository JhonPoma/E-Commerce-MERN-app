
const userLogout = async (req, res)=>{

    try {
        res.clearCookie("token")

        res.json({
            message : "Cerrando sesion con exito",
            error : false,
            success : true,
            data : []
        })


    } catch (error) {
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }



}

export default userLogout