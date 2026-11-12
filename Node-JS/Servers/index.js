const http = require("http")
const fs = require("fs")


const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} New req received\n`
    fs.appendFile("log.txt", log, (err, data) => {
        switch(req.url){
            case '/': res.end("HomePage")
            break
            case '/about': res.end("AboutPage")
            break
            default: res.end("404")
        }
    })
})

myServer.listen(9000, () => console.log("Started"))