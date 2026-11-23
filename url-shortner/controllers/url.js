const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewURL(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "URL is required!"});
    const shortID = shortid();//generates a unique short id
    
    await URL.create({ //URL.create() creates a new document in MongoDB collection.
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    })
    return res.json({ id: shortID })
}

async function handleAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length, //to calculate the total number of visits.
        analytics: result.visitHistory
    })
}

module.exports = {
    handleGenerateNewURL,
    handleAnalytics,
}