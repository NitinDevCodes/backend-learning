// const cookieParser = require('cookie-parser');
const express = require('express');
const app = express()
// app.use(cookieParser())
const bcrypt = require('bcrypt')

app.get("/", function(req, res){
    // res.cookie("name", "nitin")
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash("nikhil", salt, function(err, hash) {
    //         console.log(hash)
    //     });
    // });

    bcrypt.compare("nitin", "$2b$10$YbqaX0WuF161Qc/OMjmYl.DwvR44RV3nQmA9h2t9GXllMOxTASHPC").then(function(result) {
        console.log(result)
    });
})
app.listen(3000)