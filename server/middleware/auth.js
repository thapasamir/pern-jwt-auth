// const jwt = require("jsonwebtoken");
// require("dotenv").config()

// module.exports =  async (req,res,next)=>{
//     try {
//         const jwtToken = req.header("token");
//         if (!jwtToken){
//             res.status(403).json("Not authorized")
//         }
//         const verify = jwt.verify(jwtToken,process.env.SecretKey);
//         req.user = verify.user;
//         next();
        
//     } catch (error) {
//         res.send("Not authorized")
//         console.error("The error is from auth middleware",error.message)
        
//     }
// }


const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("token");

  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const verify = jwt.verify(token, process.env.SecretKey);
    
    console.log(verify.user)
    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};