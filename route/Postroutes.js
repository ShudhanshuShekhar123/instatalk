const express = require("express")
const server = express.Router();
const Postmodal = require("../Postmodal")
const jwt = require("jsonwebtoken")

server.post("/add", async (req, res) => {
    // console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1]

    try {
        const matchtoken = jwt.verify(token, "masai")
        console.log(matchtoken)

        if (!matchtoken) {
            res.status(400).send({ "msg": "User not authenticated" })
        } else {
            let addpost = await Postmodal.create({...req.body,author:matchtoken.username, creator:matchtoken.user_id})
            addpost = await addpost.populate('creator')
            console.log(addpost)
            res.status(200).send({ "msg": "Post added" })
        }


    } catch (error) {
        res.status(400).send({ "error": "server error" })
    }



})


server.get("/get", async (req, res) => {
    // console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1]

    try {
        const matchtoken = jwt.verify(token, "masai")
        console.log(matchtoken)

        if (!matchtoken) {
            res.status(400).send({ "msg": "User not authenticated" })
        } else {

            if (!req.query.title) {
                let getpost = await Postmodal.find({})
                res.status(200).send(getpost)
            }
            else if(req.query.title){
                let particularpost = await Postmodal.find(req.query)
                res.status(200).send(particularpost)
            }

        }


    } catch (error) {
        res.status(400).send({ "error": "server error" })
    }



})








server.get("/search", async (req, res) => {
    // console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1]

    try {
        const matchtoken = jwt.verify(token, "masai")
        console.log(matchtoken)

        if (!matchtoken) {
            res.status(400).send({ "msg": "User not authenticated" })
        } else {

            if (!req.query.searchquery) {
                let getpost = await Postmodal.find({})
                res.status(200).send(getpost)
            }
            else if(req.query.searchquery){
                const {searchquery} = req.query
                const title = new RegExp(searchquery,"i")

                let particularpost = await Postmodal.find({title})
                res.status(200).send(particularpost)
            }

        }


    } catch (error) {
        res.status(400).send({ "error": "server error" })
    }



})









server.patch("/update/:id", async (req, res) => {
    // console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1]

    try {
        const matchtoken = jwt.verify(token, "masai")
        console.log(matchtoken.user_id)

        if (!matchtoken) {
            res.status(400).send({ "msg": "User not authenticated" })
        } else {

            let post = await Postmodal.findById({ _id: req.params.id})
            // console.log(post,"here")
            // console.log(matchtoken.user_id)
            // console.log(post.)

            if(post.creator.toString() == matchtoken.user_id){
                let updatepost = await Postmodal.findByIdAndUpdate({ _id: req.params.id},req.body, {new:true})
                res.status(200).send(updatepost)
            }
              
            }

        


    } catch (error) {
        res.status(400).send({ "error": "server error" })
    }



})



server.delete("/delete/:id", async (req, res) => {
    // console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1]

    try {
        const matchtoken = jwt.verify(token, "masai")
        console.log(matchtoken)

        if (!matchtoken) {
            res.status(400).send({ "msg": "User not authenticated" })
        } else {

                let deletedpost = await Postmodal.findByIdAndDelete({ _id: req.params.id})
                res.status(200).send( {"message":"post deleted"})
            }

        


    } catch (error) {
        res.status(400).send({ "error": "server error" })
    }



})













module.exports = server;