const express = require("express")
// const users = require("./MOCK_DATA.json")
const mongoose = require("mongoose")
const fs = require('fs')
const { type } = require("os")
const app = express()
const PORT = 8000

//Connection
mongoose
    .connect('mongodb://127.0.0.1:27017/app-1')
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Mongo error: ", err))

//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
}, 
{timestamps: true}
)

const User = mongoose.model("user", userSchema)

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use((req, res, next) => {
    fs.appendFile('log.txt', `${Date.now()}:${req.ip} ${req.method}: ${req.path}\n`,
    (err,data) => {
        next();
    })
})
// app.use((req, res, next) => {
//     console.log("MiddleWare 1")
//     // return res.json({msg: "Middleware 1"})
//     req.myName = "NitinJha";
//     next();
// })
// app.use((req, res, next) => {
//     console.log("MiddleWare 2", req.myName)
//     // return res.end("Hi there")
//     next();
// })

app.get("/users", async(req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `
    res.send(html)
})
//REST API
app.get("/api/users", async(req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers)
})

app.route("/api/users/:id")
.get(async(req, res) => {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({error: "user not found"})
    return res.json(user)
})
.patch(async (req, res) => {
    console.log("Received body:", req.body)

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    if (!updatedUser) {
        return res.status(404).json({ error: "User not found" })
    }

    return res.json({
        status: "Success",
        updatedUser
    })
})
.delete(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id)

    if (!deletedUser) {
        return res.status(404).json({ error: "User not found" })
    }

    return res.json({
        status: "Success",
        message: "User deleted successfully",
        deletedUser
    })
})
app.post('/api/users', async(req, res) =>{
    const body = req.body
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(404).json("All fields are required");
    }

const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    })
    console.log("result", result)
    return res.status(201).json({ msg: "success" })
})

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))