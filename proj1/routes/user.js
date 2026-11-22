const express = require("express")
const {handleGetAllUsers, handlegetUserById, handleUpdateUserById, handleUpdateDeleteUserById, handleCreateNewUser} = require('../controllers/user')

const router = express.Router()



//REST API
router.route("/")
    .get( handleGetAllUsers )
    .post(handleCreateNewUser)

router.route("/:id")
    .get(handlegetUserById)
    .patch(handleUpdateUserById)
    .delete(handleUpdateDeleteUserById)


module.exports = router