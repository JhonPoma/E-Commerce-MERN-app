

const userDetalles = async (req, res)=>{

    try {
        res.send("holaaaaaaa")
        
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export default userDetalles;