const fs = require("fs")

const requestHandler = (req, res) => {
    res.setHeader("Content-Type", "text/html")
    const url = req.url
    const method = req.method
    if (url === "/") {
        res.write("<html>")
        res.write("<head><title>Response Page</title></head>")
        res.write("<body>")
        fs.readFile('message.txt', 'utf8', (err, data) => {
            if (!err) {
                const messages = data.split('\n').filter(Boolean);
                res.write("<h2>Messages:</h2>");
                res.write("<ul>");
                messages.forEach((message) => {
                    res.write(`<li>${message}</li>`);
                });
                res.write("</ul>");
            }

            res.write("<h1>Send a message</h1>")
            res.write('<form action="/message" method="POST">')
            res.write('<input type="text" name="message"></input>')
            res.write('<button type="submit">Send</button>')
            // res.write('</input>')
            res.write("</body>")
            res.write("</html>")
            res.end()
        })
    }
    else if (url === "/about") {
        res.write("<html>")
        res.write("<head><title>Response Page</title></head>")
        res.write("<body><h1>About Page</h1></body>")
        res.write("</html>")
        res.end()
    }
    else if (url === "/message" && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            body.push(chunk)
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1]
            fs.appendFile('message.txt', message + '\n', (err) => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.end("Error writing to file");
                } else {
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    res.end();
                }
            });
        })
    }
    else if (url === "/node") {
        res.write("<html>")
        res.write("<head><title>Response Page</title></head>")
        res.write("<body><h1>Welcome to Node Js Project</h1></body>")
        res.write("</html>")
        res.end()
    }
    else {
        res.write("<html>")
        res.write("<head><title>Response Page</title></head>")
        res.write("<body><h1>a Blank Page</h1></body>")
        res.write("</html>")
        res.end()
    }
}

// module.exports = requestHandler when we want to export one thing

// If we want to export many things, export them as an object
module.exports = {
    handler: requestHandler,
    message: 'Some random text here'
}

// We can also export multiple things like this
// module.exports.handler = requestHandler
// module.exports.message = 'Some random text here'
