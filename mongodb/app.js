const express = require('express')
const app = express()
const userModel = require('./usermodel')

app.get('/', (req, res) => {
    res.send("hey")
})
app.get('/create', async (req, res) => {
    let createduser = await userModel.create({
        name: "Nitin",
        email: "nitin@gmail.com",
        username: "nitin"
    })
    res.send(createduser)
})
app.get('/update', async (req, res) => {
    let updatedUser = await userModel.findOneAndUpdate(
        {username: "nitin"},
        {name: "nikhil"},
        {new: true}
    )
    res.send(updatedUser)
})
app.get('/read', async (req, res) => {
    let updatedUser = await userModel.find()
    res.send(updatedUser)
})
app.get('/delete', async (req, res) => {
    let users = await userModel.findOneAndDelete({username: "Nitin"})
    res.send(users)
})

app.listen(3000)