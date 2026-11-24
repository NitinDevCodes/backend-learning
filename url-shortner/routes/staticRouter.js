const express = require("express");

const router = express.Router();

router.get("/", async(req, res) => { 
    const allUrls = await URL.fin({});
    return res.render("home", {
        urls: allUrls,
    });
})

module.exports = router;
