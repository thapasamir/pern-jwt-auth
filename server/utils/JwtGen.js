const jwt = require("jsonwebtoken");
require("dotenv").config()

const JwtGen = (user_id)=>{
    const payload = {
        user : user_id
    }
    return jwt.sign(payload,process.env.SecretKey,{expiresIn:"1hr"})
}

module.exports = JwtGen;