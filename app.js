const cookieParser = require('cookie-parser');
const express = require('express');
const app = express()
app.use(cookieParser())

app.get("/", function(req, res){
    res.cookie("name", "nitin")
    res.send("done")
})
app.listen(3000)

app.get("/read", function(req, res){
    console.log(req.cookies)
    res.send("read page")
})