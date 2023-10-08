const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html")
    let url = req.url
    if (url == "/home") {
        res.write("<html>")
        res.write("<head><title>Response Page</title></head>")
        res.write("<body><h1>Home Page</h1></body>")
        res.write("</html>")
    }
    else if (url == "/about") {
        res.write("<html>")
        res.write("<head><title>Response Page</title></head>")
        res.write("<body><h1>About Page</h1></body>")
        res.write("</html>")
    }
    else if (url == "/node") {
        res.write("<html>")
        res.write("<head><title>Response Page</title></head>")
        res.write("<body><h1>Welcome to Node Js Project</h1></body>")
        res.write("</html>")
    }
    else{
        res.write("<html>")
        res.write("<head><title>Response Page</title></head>")
        res.write("<body><h1>Blank Page</h1></body>")
        res.write("</html>")
    }

    res.end()
});

server.listen(3000);