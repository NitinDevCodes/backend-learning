const express = require('express')
const app = express()
const userModel = require("./models/user")
const postModel = require("./models/post")

app.get("/", function(req, res){
    res.send("hey")
})

app.get("/create", async function(req, res){
    let user = await userModel.create({
        username: "Nitin",
        age: 25,
        email: "nitin@gmail.com"
    })
    res.send(user)
})

app.get("/post/create", async function(req, res){
    let post  = await postModel.create({
        postdata: "hi there",
        user: "6ac00bea20b1be360ee79fbe",
    })

    let user = await userModel.findOne({_id: "6ac00bea20b1be360ee79fbe"})
    user.posts.push(post._id)
    await user.save()

    res.send({post, user})
})


app.listen(3000)