const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT
const { connection } = require("./database/db")
const {userRouter} = require("./routes/useroutes")
const {postRouter} = require("./routes/postroute")
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser())
app.get("/",(req,res)=>{
    res.send("home page")
    console.log("home page")

})
app.use("/users",userRouter)
app.use("/posts",postRouter)
dotenv.config()
app.listen(port,async()=>{
    try {
        await connection
        console.log(`express server is running on port ${port} and mongoDB is also connected`)

    } catch (error) {
        console.log({"msg":error})
    }
})