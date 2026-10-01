const cookieParser = require('cookie-parser');
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken');
// const { log } = require('node:console');
const express = require('express');
const app = express()
const path = require('path')
const userModel = require("./models/user")
const bycrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())



app.get("/", (req, res) => {
    // res.cookie("name", "nitin")
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash("nikhil", salt, function(err, hash) {
    //         console.log(hash)
    //     });
    // });

    // bcrypt.compare("nitin", "$2b$10$YbqaX0WuF161Qc/OMjmYl.DwvR44RV3nQmA9h2t9GXllMOxTASHPC").then(function(result) {
    //     console.log(result)
    // });

    // let token = jwt.sign({email: "nitin@gmail.com"}, "blabla")
    // res.cookie("token", token)
    // res.send("done")
    
    res.render("index")
})

app.post("/create", (req, res) => {
    let {username, email, password, age} = req.body

    bycrypt.genSalt(10, (err, salt) =>{
        bycrypt.hash(password, salt, async (err, hash) =>{

            let createdUser = await userModel.create({
                username,
                email,
                password: hash,
                age
            })

            let token = jwt.sign({email}, "lfjvnesfvn")
            res.cookie("token", token)
            res.send(createdUser)
        })
    })

    
    
})

app.get("/login", function(req, res){
    res.render('login')
})

app.post("/login", async function(req, res){
    let user = await userModel.findOne({email: req.body.email})
    if(!user) return res.send("Something went wrong")

    bycrypt.compare(req.body.password, user.password, function(err, result){
        if(result){
            let token = jwt.sign({email: user.email}, "lfjvnesfvn")
            res.cookie("token", token)
            res.send("yes you can login")
        }
        else res.send("Something went wrong")
    })
})

app.get("/logout", function(req, res){
    res.cookie("token", "")
    res.redirect("/")
})
app.listen(3000)