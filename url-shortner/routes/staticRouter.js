const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
    const allUrls = await URL.find({});

    return res.render("home", {
        urls: allUrls,
        id: req.query.id,
    });
});

module.exports = router;