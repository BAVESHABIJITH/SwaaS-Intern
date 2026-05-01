const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"1d"
    })
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:"8d"
    })
}

const verifyToken = (token,secret) => {
    return jwt.verify(token,secret)
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken
}