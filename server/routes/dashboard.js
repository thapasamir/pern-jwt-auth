const router = require("express").Router();
const pool = require("../models");
const authorization = require("../middleware/auth");

router.get("/",authorization,async (req,res)=>{
    try {
        res.json(req.user)
    } catch (err) {
        console.error(err)
        res.send(err)
        
    }
})


module.exports = router;


