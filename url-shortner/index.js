const express = require("express");
const { connectMongoDB } = require("./connection");
const path = require("path");
const cookieParser = require("cookie-parser");
const {restrictToLoggedinUserOnly} = require("./middleware/auth")
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

connectMongoDB("mongodb://localhost:27017/short-url")
    .then(() => console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

// URL redirection
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );

    if (!entry) {
        return res.status(404).send("URL not found");
    }

    return res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
    console.log(`server started at PORT: ${PORT}`);
});