const express = require("express")
const { connectMongoDB } = require("./connection")

const {logReqRes} = require("./middlewares")

const userRouter = require("./routes/user")

const fs = require('fs')
const { type } = require("os")
const app = express()
const PORT = 8000

connectMongoDB("mongodb://127.0.0.1:27017/app-1").then(() => 
    console.log("MongoDB connected!")
)

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(logReqRes("log.txt"))

//Routes
app.use("/api/users", userRouter)

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))