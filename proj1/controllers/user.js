const User = require('../models/user')

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handlegetUserById(req, res){
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({error: "user not found"})
    return res.json(user)
}

async function handleUpdateUserById(req, res){
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
}

async function handleUpdateDeleteUserById(req, res){
    const deletedUser = await User.findByIdAndDelete(req.params.id)

    if (!deletedUser) {
        return res.status(404).json({ error: "User not found" })
    }
    return res.json({
        status: "Success",
        message: "User deleted successfully",
        deletedUser
    })
}

async function handleCreateNewUser(req, res){
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
    return res.status(201).json({ msg: "success" , id: result._id})
}

module.exports = {
    handleGetAllUsers,
    handlegetUserById,
    handleUpdateUserById,
    handleUpdateDeleteUserById,
    handleCreateNewUser
};