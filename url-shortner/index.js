const express = require("express");
const {connectMongoDB} = require("./connection");
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const { timeStamp } = require("node:console");

const app = express();
const PORT = 8001;

connectMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log("MongoDB connected"))

app.use(express.json());  

app.use("/url", urlRoute);

app.get("/:shortId", async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {shortId},
        {
            $push: {
                visitHistory: {
                    timeStamp: Date.now(),
                },
            }
        }
    )
    res.redirect(entry.redirectURL);
})

app.listen(PORT, () => console.log(`server started at PORT: ${PORT}`));