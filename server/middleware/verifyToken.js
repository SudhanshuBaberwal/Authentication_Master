import jwt from "jsonwebtoken"

export const verifyToken = async (req , res , next) => {
    const token = req.cookies.token;
    if (!token){
        return res.status(400).json({
            success : false,
            message : "Unauthorized : No token Provided"
        })
    }
    try {
        const decode = jwt.verify(token , process.env.MY_SECRET);
        if (!decode){
            return res.status(401).json({success : false , message : "Unauthorized-invalid token"})
        }
        req.userId = decode.userId;
        next()
    } catch (error) {
        console.log("Error in verifyToken : " , error)
        return res.status(500).json({success : false , message : "Server Error"})
    }
}