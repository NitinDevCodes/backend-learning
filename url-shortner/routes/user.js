const express = require("express");
const {handleUserSingup} = require("../controllers/user");

const router = express.Router();

router.post("/", handleUserSingup);

modules.export = router;