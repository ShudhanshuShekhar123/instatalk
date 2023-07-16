const mongoose = require("mongoose")


const Postschema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    city: { type: String, required: true },
    age: { type: Number, required: true }


})

const Post = mongoose.model("user", Postschema);

module.exports = Post