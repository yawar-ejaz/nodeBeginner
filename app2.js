const express = require('express')

const app = express()

app.use((req, res, next) => {
    console.log("In 1st middleware")
    next()
})
app.use((req, res, next) => {
    console.log("In 2nd middleware")
    res.send({name: "Yawar"})
})


// const serve = http.createServer(app);
// server.listen(3000);
app.listen(3000)