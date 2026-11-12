const fs = require("fs")

//Sync
// fs.writeFileSync("./test.txt", "Hey there!")

//Async
// fs.writeFile("./test.txt", "Hello world async", (err) => {})

// const result = fs.readFileSync("./test.txt", "utf-8")
// console.log(result)

fs.readFile("./test.txt", "utf-8", (err, result) => {
    if(err){
        console.log("Error: ", err)
    }
    else{
        console.log(result)
    }
})

fs.appendFileSync("./test.txt", `\nYes i am here\n`)

// fs.cpSync("./test.txt", "./copy.txt")

fs.unlinkSync("./copy.txt")