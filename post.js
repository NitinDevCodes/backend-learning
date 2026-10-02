const mongoose = require('mongoose')
const { PassThrough } = require('node:stream')

mongoose.connect("mongodb://127.0.0.1:27017/miniproject")

const postSchema = mongoose.Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date:{
        type: Date,
        default: Date.now()
    },
    content: String,
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]
})

module.exports = mongoose.model('post', postSchema)