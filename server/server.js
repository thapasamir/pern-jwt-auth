const express = require("express")
const cors = require("cors")

require("dotenv").config();

// server port and hosted dns
const hosted = 'http://127.0.0.1'
const port = process.env.PORT || 3000

const app = express()

app.use(express.json(),cors())

//routes 

//register 

app.use("/auth",require("./routes/JwtAuth"))
app.use("/dashboard",require("./routes/dashboard"))

app.listen(8000,()=>{
    console.log(`Server is up ctrl + click the link ${hosted}:${port} 🔥 `)
})
