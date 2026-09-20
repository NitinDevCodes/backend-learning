// const { log } = require('console');
// const fs = require('fs');


// fs.writeFile("hey.txt", "Hello  World!", function(err){
//     if(err) console.log(err);
//     else console.log("error, it's done bro");
// })

// fs.appendFile("hey.txt", " Hi buddy", function(err){
//     if(err) console.log(err);
//     else console.log("error, it's done bro");
// })

// fs.rename("hey.txt", "hello.txt", function(err){
//     if(err) console.log(err);
//     else console.log("error, it's done bro");
// })

// fs.copyFile("hello.txt", "./copy/copy.txt", function(err){
//     if(err) console.log(err);
//     else console.log("error, it's done bro");
// })

// fs.unlink("hello.txt", function(err){
//     if(err) console.log(err);
//     else console.log("error, it's done bro");
// })

// fs.rm("./copy", {recursive: true}, function(err){
//     if(err) console.log(err)
//     else console.log("error, it's done bro")
// })

// fs.readFile("./index.html", "utf8", function(err, data){
//     if(err) console.log(err);
//     else console.log(data);
// })


// const http = require('http')


// const server = http.createServer(function(req, res){
//     res.end("hello world")
// })
// server.listen(3000)

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(function(req, res, next){
    console.log('middleware chala');
    next()
})
app.use(function(req, res, next){
    console.log('middleware chala eka ur bar');
    next()
})

app.get("/", function(req, res){
    res.send("Champion")
    next()
})
app.get("/profile", function(req, res){
    res.send("profile hai ye")
    next()
})
app.get("/about", function(req, res, next){
    return next(new Error("Something went wrong"))
})
app.use((err, req, res, next)=>{
    console.log(err.stack);
    res.status(500).send('Something broke')
})
app.listen(3000)