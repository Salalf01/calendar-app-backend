const {response} = require("express");
const jwt = require("jsonwebtoken");


const validateJWT = async (req, res = response, next) => {

const token = req.header("Authorization");

console.log(token);

if(!token) {
    return res.json(401).json({
        ok: false,
        msg: "Token doesn't exist",
    })
}

try{
    const payload =  jwt.verify(token, process.env.SECRET_JWT_SEED);

    console.log(payload);
}catch(e){
    return res.status(401).json({
        ok: false,
        msg: "Invalid Token"
    })

}
next();

}

module.exports = { validateJWT }