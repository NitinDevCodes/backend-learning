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
    // Suppose someone visits:http://localhost:8001/xY7kP2 ,Express extracts xY7kP2 and makes it available through req.params.shortId.
    const entry = await URL.findOneAndUpdate( //findOneAndUpdate() finds a document matching the condition and updates it.
        {shortId},
        {
            $push: { //$push adds a new element to an existing array.
                visitHistory: {
                    timestamp: Date.now(),
                },
            }
        }
    )
    res.redirect(entry.redirectURL); //The browser is redirected to the original URL stored in MongoDB.
})

app.listen(PORT, () => console.log(`server started at PORT: ${PORT}`));