const express = require("express")
const server = express.Router();
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")


const Post = require("../Usermodal")





server.get("/home",(req,res)=>{
    res.send("Welcome to my backend api")
})


server.post("/register", async (req, res) => {

    try {
        const { pass } = req.body;

        const newpassword = await bcrypt.hash(pass, 10);

        let finduser = await Post.findOne({ email: req.body.email });

        if (finduser?.email !== req.body.email) {
            let addeduser = await Post.create({ ...req.body, pass: newpassword });
            res.status(200).send({ "msg": "The new user has been registered", "registeredUser": addeduser })
        } else {
            res.status(404).send("user already registered")
        }

    }
    catch (error) {
        res.status(400).send({ "error": "server error" })
        console.log(error)
    }

})




server.post("/login", async (req, res) => {

    try {
        const { name, pass } = req.body;

        const user = await Post.findOne({ name })

        if (!user) {
            res.send("You need to Signup first")
        }

        const verify = await bcrypt.compare(pass, user.pass)

        if (verify) {

            const token = jwt.sign({user_id: user._id, username: user.name},"masai",{expiresIn:"300s"})
            res.status(200).send({ "msg": "Login successful!", "token": token })
        } else {
            res.status(400).send({ "msg": "Incorrect password" })
        }
     

    }
    catch (error) {
        res.status(400).send({ "error": "server error" })
        console.log(error)
    }

})





module.exports = server;
