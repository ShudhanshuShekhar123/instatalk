const mongoose = require("mongoose")


const schemaPost = new mongoose.Schema({

    title: { type: String, required: true },
    content: { type: String, required: true },
    author:{type:String},
    // creator:{type:String}
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }


})

const Postmodal = mongoose.model("post", schemaPost);

module.exports = Postmodal