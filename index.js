const express = require("express")
const mongoose = require("mongoose")
const server = express()
const userroutes = require("./route/Userroutes")
const postroutes = require("./route/Postroutes")
require("dotenv").config()

server.use(express.json())
server.use("/users",userroutes)
server.use("/posts",postroutes)



server.get("/",(req,res)=>{
    res.send("Welcome to home")
})



const connect = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to mongodb atlas")
    } catch (error) {
        console.log("error connecting to mongodb atlas")
    }

}






server.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
    connect()
})

