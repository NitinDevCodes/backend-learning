const express = require('express')
const app = express()
const path = require('path')
const userModel = require('./models/user')

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render("index")
})
app.get('/read', async (req, res) => {
    let users = await userModel.find()
    res.render("read", { users: users })
})
app.get('/edit/:id', async (req, res) => {
    let { id } = req.params
    let user = await userModel.findById(id)
    res.render("edit", { user: user })
})
app.post('/update/:id', async (req, res) => {
    let {image, name, email} = req.body
    let { id } = req.params
    await userModel.findByIdAndUpdate({_id: id}, { image, name, email }, { new: true })
    res.redirect('/read')
})
app.get('/delete/:id', async (req, res) => {
    let { id } = req.params
    await userModel.findByIdAndDelete({_id: id})
    res.redirect('/read')
})
app.post('/create', async (req, res) => {
    let{name, email, image} = req.body
    let createdUser = await userModel.create({
        name: name,
        email: email,
        image: image
    })
    res.redirect('/read')
})
app.listen(3000)