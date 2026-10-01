const cookieParser = require('cookie-parser');
const express = require('express');
const app = express()
app.use(cookieParser())
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { log } = require('node:console');

app.get("/", function(req, res){
    // res.cookie("name", "nitin")
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash("nikhil", salt, function(err, hash) {
    //         console.log(hash)
    //     });
    // });

    // bcrypt.compare("nitin", "$2b$10$YbqaX0WuF161Qc/OMjmYl.DwvR44RV3nQmA9h2t9GXllMOxTASHPC").then(function(result) {
    //     console.log(result)
    // });

    let token = jwt.sign({email: "nitin@gmail.com"}, "blabla")
    res.cookie("token", token)
    res.send("done")
    
})

app.get("/read", function(req, res){
    let data = jwt.verify(req.cookies.token, "blabla")
    console.log(data);
    
})
app.listen(3000)