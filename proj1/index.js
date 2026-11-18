const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require('fs')
const app = express()
const PORT = 8000

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html)
})
//REST API
app.get("/api/users", (req, res) => {
    return res.json(users)
})

app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
    return res.json(user)
})
.patch((req, res) => {
    console.log("Received body:", req.body)

    const id = Number(req.params.id)
    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex === -1) {
        return res.status(404).json({ status: "User not found" })
    }

    const updatedUser = { ...users[userIndex], ...req.body }
    users[userIndex] = updatedUser

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ status: "Error updating user" })
        }

        return res.json({
            status: "Success",
            updatedUser
        })
    })
})
.delete((req, res) => {
    const id = Number(req.params.id)
    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex === -1) {
        return res.status(404).json({ status: "User not found" })
    }

    users.splice(userIndex, 1)

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ status: "Error deleting user" })
        }

        return res.json({
            status: "Success",
            message: `User ${id} deleted successfully`
        })
    })
})
app.post('/api/users', (req, res) =>{
    const body = req.body
    users.push({...body, id: users.length + 1})
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({status: "success", id: users.length})
    })
})

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))