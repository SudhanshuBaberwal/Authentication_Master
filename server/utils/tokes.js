import jsonwebtoken from "jsonwebtoken";

const generatejsonwebtokenandsetCookie = (res , userId) => {
    const token = jsonwebtoken.sign({userId} , process.env.MY_SECRET , {
        expiresIn : "7d"
    })
    res.cookie("token", token , {
        httpOnly : true,
        secure: process.env.NODE_ENV == "production",
        sameSite : "strict",
        maxAge : 7 * 24 * 60 * 60 * 1000
    })
}
export default generatejsonwebtokenandsetCookie;