const express = require("express");
const {handleGenerateNewURL, handleAnalytics} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewURL);//Create a shortened URL

router.get("/analytics/:shortId", handleAnalytics);//Get URL analytics

module.exports = router;