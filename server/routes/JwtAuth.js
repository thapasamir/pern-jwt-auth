const pool = require("../models")
const bycrypt = require("bcrypt");
const router = require("express").Router()
const JwtGen = require("../utils/JwtGen");
const validInfo = require("../middleware/validInfo");
const authMiddleware = require("../middleware/auth");

router.post("/register", validInfo, async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await pool.query('select * from users where user_email = $1', [email])
        if (user.rows.length !== 0) {
            res.status(401).send("User already exist :( ")
        }
        else {
            //hashing the password
            const saltRound = 10;
            const hashedpass = await bycrypt.hash(password, saltRound);

            //storing hashed password in database
            const newUser = await pool.query('INSERT INTO users(user_name,user_email,user_pass) VALUES($1,$2,$3) RETURNING *', [name, email, hashedpass]);


            //generationg token
            const token = JwtGen(newUser.rows[0].user_id)

            //saving token
            res.json({ token })
        }


    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server error")


    }
})

router.post("/login",validInfo,async (req, res) => {
    try {
        //Getting the requested email and password
        const { email, password } = req.body
        // searching if the requested email exist or not
        const UserExist = await pool.query('select * from users where user_email=$1', [email]);
        if (UserExist.rows.length === 0) {
            res.status(404).send("Email or password incorrect :(")

        }

        else {
            // validating if the user credential is valid or not :( Note: it  return promise
            const VaildatePass = await bycrypt.compare(password, UserExist.rows[0].user_pass)
            console.log(email, password)
            //Generating the jwt and returning it
            const token = JwtGen(UserExist.rows.user_id)
            if (VaildatePass === true){
                res.send({'token':token})
            }
            if (validInfo === false){
                res.send({'token':'unable to get the token :('})
            }

        }


    } catch (error) {
        res.send(error)
        console.log(error)

    }
})

router.get('/isvalid',authMiddleware,async(req,res)=>{
    try {
        res.json({"msg":"authenticated"})
    } catch (err) {
        console.log(err)
        res.send("Authentication required")
    }

})



module.exports = router;