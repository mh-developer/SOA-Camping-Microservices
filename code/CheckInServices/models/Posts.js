const mongoose = require("mongoose")

const Schema =mongoose.Schema;

const PostSchema = new Schema({

    name: {
        type: String,
        require: true
    },
    no_people: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        require:false,
        default: Date.now
    }

})

module.exports = mongoose.model("Posts", PostSchema);